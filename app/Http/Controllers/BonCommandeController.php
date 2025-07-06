<?php

namespace App\Http\Controllers;

use App\Models\BonCommande;
use App\Models\Fournisseur;
use App\Models\Produit;
use App\Models\LigneCommande;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class BonCommandeController extends Controller
{
    

    public function index()
    {
        return Inertia::render('Bons/Index', [
            'bons' => BonCommande::with('fournisseur', 'lignes.produit')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Bons/Create', [
            'fournisseurs' => Fournisseur::all(),
            'produits' => Produit::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fournisseur_id' => 'required|exists:fournisseurs,id',
            'date_commande' => 'required|date',
            'lignes' => 'required|array|min:1',
        ]);

        $commande = BonCommande::create([
            'fournisseur_id' => $request->fournisseur_id,
            'date_commande' => $request->date_commande,
        ]);

        foreach ($request->lignes as $ligne) {
            LigneCommande::create([
                'bon_commande_id' => $commande->id,
                'produit_id' => $ligne['produit_id'],
                'quantite' => $ligne['quantite'],
                'prixUnitaire' => $ligne['prixUnitaire'],
            ]);
            // Augmenter la quantité du produit
            $produit = Produit::find($ligne['produit_id']);
            if ($produit) {
                $produit->quantite += $ligne['quantite'];
                $produit->save();
            }
        }

        return redirect()->route('bons.index');
    }

    public function show(BonCommande $commande)
    {
        return Inertia::render('Bons/Index', [
            'commande' => $commande->load('fournisseur', 'lignes.produit')
        ]);
    }

    public function destroy(BonCommande $commande)
    {
        $commande->delete();
        return redirect()->route('bons.index');
    }
}
