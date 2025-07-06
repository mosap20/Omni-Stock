<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Produit;
use App\Models\FactureClient;
use App\Models\BonCommande;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistiques globales
        $clientsCount = Client::count();
        $produitsCount = Produit::sum('quantite');
        $facturesRecentes = FactureClient::with('client')->latest('date_facture')->take(5)->get();
        $bonsRecents = BonCommande::with('fournisseur')->latest('date_commande')->take(5)->get();

        // Revenus et dépenses par mois (année en cours)
        $revenusParMois = [];
        $depensesParMois = [];
        for ($m = 1; $m <= 12; $m++) {
            $revenus = FactureClient::whereYear('date_facture', now()->year)
                ->whereMonth('date_facture', $m)
                ->with('lignes')
                ->get()
                ->flatMap->lignes
                ->sum(fn($l) => $l->quantite * $l->prixUnitaire);
            $depenses = BonCommande::whereYear('date_commande', now()->year)
                ->whereMonth('date_commande', $m)
                ->with('lignes')
                ->get()
                ->flatMap->lignes
                ->sum(fn($l) => $l->quantite * $l->prixUnitaire);
            $revenusParMois[] = $revenus;
            $depensesParMois[] = $depenses;
        }

        // Mouvement du stock : entrées (bons de commande), sorties (factures)
        $entreesParMois = [];
        $sortiesParMois = [];
        for ($m = 1; $m <= 12; $m++) {
            // Entrées : somme des quantités des lignes de bons de commande du mois
            $entrees = \App\Models\LigneCommande::whereHas('bonCommande', function($q) use ($m) {
                $q->whereYear('date_commande', now()->year)->whereMonth('date_commande', $m);
            })->sum('quantite');
            // Sorties : somme des quantités des lignes de factures du mois
            $sorties = \App\Models\LigneFacture::whereHas('facture', function($q) use ($m) {
                $q->whereYear('date_facture', now()->year)->whereMonth('date_facture', $m);
            })->sum('quantite');
            $entreesParMois[] = $entrees;
            $sortiesParMois[] = $sorties;
        }

        // Calculer le montant pour chaque facture récente
        $facturesRecentes = $facturesRecentes->map(function ($facture) {
            $facture->montant = $facture->lignes ? $facture->lignes->sum(function ($l) {
                return $l->quantite * $l->prixUnitaire;
            }) : 0;
            return $facture;
        });
        // Calculer le montant pour chaque bon de commande récent
        $bonsRecents = $bonsRecents->map(function ($bon) {
            $bon->montant = $bon->lignes ? $bon->lignes->sum(function ($l) {
                return $l->quantite * $l->prixUnitaire;
            }) : 0;
            return $bon;
        });

        return Inertia::render('dashboard', [
            'stats' => [
                'clients' => $clientsCount,
                'produits' => $produitsCount,
            ],
            'revenusParMois' => $revenusParMois,
            'depensesParMois' => $depensesParMois,
            'entreesParMois' => $entreesParMois,
            'sortiesParMois' => $sortiesParMois,
            'facturesRecentes' => $facturesRecentes,
            'bonsRecents' => $bonsRecents,
        ]);
    }
}
