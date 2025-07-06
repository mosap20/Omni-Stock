<?php

namespace App\Http\Controllers;

use App\Models\FactureClient;
use App\Models\Client;
use App\Models\Produit;
use App\Models\LigneFacture;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class FactureClientController extends Controller
{
    

    public function index()
    {
        return Inertia::render('Factures/Index', [
            'factures' => FactureClient::with('client', 'lignes.produit')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Factures/Create', [
            'clients' => Client::all(),
            'produits' => Produit::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'date_facture' => 'required|date',
            'lignes' => 'required|array|min:1',
        ]);

        $facture = FactureClient::create([
            'client_id' => $request->client_id,
            'date_facture' => $request->date_facture,
        ]);

        foreach ($request->lignes as $ligne) {
            LigneFacture::create([
                'facture_client_id' => $facture->id,
                'produit_id' => $ligne['produit_id'],
                'quantite' => $ligne['quantite'],
                'prixUnitaire' => $ligne['prixUnitaire'],
            ]);
            // Diminuer la quantité du produit
            $produit = Produit::find($ligne['produit_id']);
            if ($produit) {
                $produit->quantite = max(0, $produit->quantite - $ligne['quantite']);
                $produit->save();
            }
        }

        return redirect()->route('factures.index');
    }

    public function show(FactureClient $facture)
    {
        return Inertia::render('Factures/Show', [
            'facture' => $facture->load('client', 'lignes.produit')
        ]);
    }

    public function destroy(FactureClient $facture)
    {
        $facture->delete();
        return redirect()->route('factures.index');
    }

    public function edit(FactureClient $facture)
    {
        return Inertia::render('Factures/Edit', [
            'facture' => $facture->load('client', 'lignes.produit'),
            'clients' => Client::all(),
            'produits' => Produit::all(),
        ]);
    }

    public function update(Request $request, FactureClient $facture)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'date_facture' => 'required|date',
            'lignes' => 'required|array|min:1',
        ]);

        // Récupérer les anciennes lignes pour ajuster le stock
        $anciennesLignes = $facture->lignes()->get();
        // Rendre le stock des produits comme avant (avant modification)
        foreach ($anciennesLignes as $ancienne) {
            $produit = Produit::find($ancienne->produit_id);
            if ($produit) {
                $produit->quantite += $ancienne->quantite;
                $produit->save();
            }
        }

        // Mettre à jour la facture
        $facture->update([
            'client_id' => $request->client_id,
            'date_facture' => $request->date_facture,
        ]);

        // Supprimer les anciennes lignes
        $facture->lignes()->delete();

        // Créer les nouvelles lignes et ajuster le stock
        foreach ($request->lignes as $ligne) {
            \App\Models\LigneFacture::create([
                'facture_client_id' => $facture->id,
                'produit_id' => $ligne['produit_id'],
                'quantite' => $ligne['quantite'],
                'prixUnitaire' => $ligne['prixUnitaire'],
            ]);
            $produit = Produit::find($ligne['produit_id']);
            if ($produit) {
                $produit->quantite = max(0, $produit->quantite - $ligne['quantite']);
                $produit->save();
            }
        }

        return redirect()->route('factures.index');
    }
}
