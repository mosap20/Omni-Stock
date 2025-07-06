<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class FournisseurController extends Controller
{
    

    public function index()
    {
        return Inertia::render('Fournisseurs/Index', [
            'fournisseurs' => Fournisseur::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Fournisseurs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom_entreprise' => 'required',
            'telephone' => 'required',
            'adresse' => 'required'
        ]);

        Fournisseur::create($request->all());

        return redirect()->route('fournisseurs.index');
    }

    public function edit(Fournisseur $fournisseur)
    {
        return Inertia::render('Fournisseurs/Edit', [
            'fournisseur' => $fournisseur
        ]);
    }

    public function update(Request $request, Fournisseur $fournisseur)
    {
        $request->validate([
            'nom_entreprise' => 'required',
            'telephone' => 'required',
            'adresse' => 'required'
        ]);

        $fournisseur->update($request->all());

        return redirect()->route('fournisseurs.index');
    }

    public function destroy(Fournisseur $fournisseur)
    {
        $fournisseur->delete();

        return redirect()->route('fournisseurs.index');
    }
}
