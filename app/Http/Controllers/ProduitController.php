<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    public function index()
    {
        $produits = Produit::all();
        return Inertia::render('Produits/Index', [
            'produits' => $produits,
        ]);
    }

    public function create()
    {
        return Inertia::render('Produits/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'reference' => 'required|string|unique:produits,reference',
            'prixAchat' => 'required|numeric',
            'prixVente' => 'required|numeric',
            'quantite' => 'required|integer',
            'description' => 'nullable|string',
            'categorie' => 'required|string',
        ]);

        Produit::create($request->all());

        return redirect()->route('produits.index')->with('success', 'Produit ajouté avec succès.');
    }

    public function edit(Produit $produit)
    {
        return Inertia::render('Produits/Edit', [
            'produit' => $produit,
        ]);
    }

    public function update(Request $request, Produit $produit)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'reference' => 'required|string|unique:produits,reference',
            'prixAchat' => 'required|numeric',
            'prixVente' => 'required|numeric',
            'quantite' => 'required|integer',
            'categorie' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $produit->update($request->all());

        return redirect()->route('produits.index')->with('success', 'Produit modifié avec succès.');
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();
        return redirect()->route('produits.index')->with('success', 'Produit supprimé avec succès.');
    }

    public function incrementQuantite(Request $request, Produit $produit)
    {
        $produit->increment('quantite');
        return redirect()->back()->with('success', 'Stock augmenté.');
    }

    public function decrementQuantite(Request $request, Produit $produit)
    {
        if ($produit->quantite > 0) {
            $produit->decrement('quantite');
            return redirect()->back()->with('success', 'Stock diminué.');
        }
        return redirect()->back()->with('error', 'Le stock ne peut pas être négatif.');
    }

    public function getProduitsByCategorie(Request $request)
    {
        $produits = Produit::where('categorie', $request->categorie)->get();
        return response()->json($produits);
    }
    
}
