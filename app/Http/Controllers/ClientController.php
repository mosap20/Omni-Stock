<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class ClientController extends Controller
{
    

    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', [
            'clients' => Client::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Clients/Create');
    }
    public function show($id)
{
    // Pour l'instant, tu peux juste rediriger vers l'index
    return redirect()->route('clients.index');
}


    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'telephone' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
            'categorie' => 'required|string',
        ]);

        Client::create($request->all());

        return redirect()->route('clients.index')->with('success', 'Client ajouté avec succès.');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client
        ]);
    }

    public function update(Request $request, Client $client)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'telephone' => 'required',
            'adresse' => 'required',
            'categorie' => 'required'
        ]);

        $client->update($request->all());

        return redirect()->route('clients.index');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index');
    }
}
