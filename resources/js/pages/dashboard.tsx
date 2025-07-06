import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { User, Package, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface FactureLigne {
    quantite: number;
    prixUnitaire: number;
}

interface FactureClient {
    id: number;
    date_facture: string;
    client: { id: number; nom: string; prenom: string };
    lignes: FactureLigne[];
    montant?: number;
}

interface BonLigne {
    quantite: number;
    prixUnitaire: number;
}

interface BonCommande {
    id: number;
    date_commande: string;
    fournisseur: { id: number; nom: string; nom_entreprise?: string };
    lignes: BonLigne[];
    montant?: number;
}

export default function Dashboard() {
    const { stats, revenusParMois, depensesParMois, entreesParMois, sortiesParMois, facturesRecentes, bonsRecents } = usePage<{
        stats: {
            clients: number;
            produits: number;
        };
        revenusParMois: number[];
        depensesParMois: number[];
        entreesParMois: number[];
        sortiesParMois: number[];
        facturesRecentes: FactureClient[];
        bonsRecents: BonCommande[];
    }>().props;

    const totalRevenus = revenusParMois.reduce((a, b) => a + b, 0);
    const totalDepenses = depensesParMois.reduce((a, b) => a + b, 0);
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

    const [moisSelectionne, setMoisSelectionne] = useState(new Date().getMonth());

    // Couleurs dynamiques pour revenus/dépenses (année)
    const revenusPlus = totalRevenus > totalDepenses;
    const depensesPlus = totalDepenses > totalRevenus;

    // Préparation des données pour les graphiques
    const ventesMensuellesData = mois.map((m, i) => ({
        mois: m,
        ventes: revenusParMois[i] || 0,
    }));

    // Mouvement du stock (6 derniers mois, données réelles)
    const now = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
        const idx = ((now.getMonth() - 5 + i + 12) % 12);
        return {
            mois: mois[idx],
            entrees: entreesParMois[idx] || 0,
            sorties: sortiesParMois[idx] || 0,
        };
    });

    return (
        <>
            <Head title="Dashboard" />
            <AppLayout>
                <div className="p-6 space-y-6">
                    {/* Cartes statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-green-400" />
                                <span className="text-xs text-white uppercase font-bold">Clients</span>
                            </div>
                            <span className="text-2xl text-green-400 font-bold mt-2">{stats.clients}</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5 text-blue-400" />
                                <span className="text-xs text-white uppercase font-bold">Produits en stock</span>
                            </div>
                            <span className={`text-2xl font-bold mt-2 ${stats.produits >= 200 ? 'text-green-400' : 'text-red-400'}`}>{stats.produits}</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
                            <div className="flex items-center gap-2">
                                <ArrowUpCircle className="w-5 h-5 text-green-400" />
                                <span className="text-xs text-white uppercase font-bold">Revenus (année)</span>
                            </div>
                            <span className={`text-2xl font-bold mt-2 ${revenusPlus ? 'text-green-400' : depensesPlus ? 'text-white' : 'text-green-400'}`}>{totalRevenus.toLocaleString()} MAD</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center">
                            <div className="flex items-center gap-2">
                                <ArrowDownCircle className="w-5 h-5 text-red-400" />
                                <span className="text-xs text-white uppercase font-bold">Dépenses (année)</span>
                            </div>
                            <span className={`text-2xl font-bold mt-2 ${depensesPlus ? 'text-red-400' : 'text-red-400'}`}>{totalDepenses.toLocaleString()} MAD</span>
                        </div>
                    </div>

                    {/* Tableau récapitulatif mensuel (un seul mois affiché avec select) */}
                    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className=" font-bold text-lg text-gray-400">Revenus & Dépenses</h2>
                            <select
                                className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
                                value={moisSelectionne}
                                onChange={e => setMoisSelectionne(Number(e.target.value))}
                            >
                                {mois.map((m, i) => (
                                    <option key={i} value={i}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-gray-500">
                                    <th className="text-left">Mois</th>
                                    <th className="text-left">Revenus</th>
                                    <th className="text-left">Dépenses</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b last:border-0">
                                    <td>{mois[moisSelectionne]}</td>
                                    <td className={revenusParMois[moisSelectionne] > depensesParMois[moisSelectionne] ? 'text-green-400 font-bold' : 'text-white'}>
                                        {revenusParMois[moisSelectionne].toLocaleString()} MAD
                                    </td>
                                    <td className={depensesParMois[moisSelectionne] > revenusParMois[moisSelectionne] ? 'text-red-400 font-bold' : 'text-red-400'}>
                                        {depensesParMois[moisSelectionne].toLocaleString()} MAD
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Actions rapides */}
                    <div className="flex flex-wrap gap-2">
                        <Button asChild variant="default"><Link href="/clients/create">+ Ajouter un client</Link></Button>
                        <Button asChild variant="default"><Link href="/produits/create">+ Ajouter un produit</Link></Button>
                        <Button asChild variant="default"><Link href="/factures/create">+ Créer une facture</Link></Button>
                        <Button asChild variant="default"><Link href="/bons/create">+ Créer un bon de commande</Link></Button>
                    </div>

                    {/* Tableaux dynamiques côte à côte */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Commandes récentes */}
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Commandes récentes</h2>
                                <Link href="/factures" className="text-blue-600 text-sm">Voir tout</Link>
                            </div>
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500">
                                        <th className="text-left">N° FACTURE</th>
                                        <th className="text-left">CLIENT</th>
                                        <th className="text-left">DATE</th>
                                        <th className="text-left">MONTANT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facturesRecentes.map((f) => {
                                        return (
                                            <tr key={f.id} className="border-b last:border-0">
                                                <td className="py-1 font-bold">{f.id}</td>
                                                <td>{f.client ? `${f.client.nom} ${f.client.prenom}` : ''}</td>
                                                <td>{f.date_facture}</td>
                                                <td>{(f.montant ?? 0).toLocaleString()} MAD</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Bons de commande récents */}
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Bons de commande récents</h2>
                                <Link href="/bons" className="text-blue-600 text-sm">Voir tout</Link>
                            </div>
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500">
                                        <th className="text-left">N° BON</th>
                                        <th className="text-left">FOURNISSEUR</th>
                                        <th className="text-left">DATE</th>
                                        <th className="text-left">MONTANT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bonsRecents.map((b) => {
                                        return (
                                            <tr key={b.id} className="border-b last:border-0">
                                                <td className="py-1 font-bold">{b.id}</td>
                                                <td>{b.fournisseur ? (b.fournisseur.nom_entreprise ?? b.fournisseur.nom) : ''}</td>
                                                <td>{b.date_commande}</td>
                                                <td>{(b.montant ?? 0).toLocaleString()} MAD</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Graphiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Ventes mensuelles */}
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Ventes mensuelles</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={260}>
                                <BarChart data={ventesMensuellesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mois" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="ventes" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Mouvement du stock */}
                        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-bold text-lg">Mouvement du stock</h2>
                            </div>
                            <ResponsiveContainer width="100%" height={260}>
                                <LineChart data={last6Months}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mois" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="entrees" stroke="#3b82f6" name="Entrées" />
                                    <Line type="monotone" dataKey="sorties" stroke="#f59e42" name="Sorties" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
