<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\FactureClientController;
use App\Http\Controllers\BonCommandeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // Clients
    Route::resource('clients', ClientController::class);
    Route::post('/clients', [ClientController::class, 'store'])->name('clients.store');

    // Fournisseurs
    Route::resource('fournisseurs', FournisseurController::class);

    // Produits
    Route::post('/produits/{produit}/increment-quantite', [ProduitController::class, 'incrementQuantite'])->name('produits.incrementQuantite');
    Route::post('/produits/{produit}/decrement-quantite', [ProduitController::class, 'decrementQuantite'])->name('produits.decrementQuantite');
    Route::resource('produits', ProduitController::class);
    Route::post('/produits', [ProduitController::class, 'store'])->name('produits.store');
    

    // Factures
    Route::resource('factures', FactureClientController::class);

    // Bons
    Route::resource('bons', BonCommandeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
