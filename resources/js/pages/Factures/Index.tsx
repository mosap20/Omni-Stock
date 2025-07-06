import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LigneFacture {
    id: number;
    produit: { nom: string };
    quantite: number;
    prixUnitaire: number;
}

interface Client {
    id: number;
    nom: string;
    prenom: string;
}

interface Facture {
    id: number;
    client: Client;
    date_facture: string;
    lignes: LigneFacture[];
    categorie: string;
}

interface FacturesPageProps extends PageProps {
    factures: Facture[];
}

export default function FacturesIndex({ factures }: FacturesPageProps) {
    // Calcul du total d'une facture
    const getTotal = (facture: Facture) =>
        facture.lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0);

    return (
        <>
            <Head title="Factures" />
            <AppLayout>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold">Gestion des Factures</h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Gérez vos factures clients</p>
                        </div>
                        <Link
                            href="/factures/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            + Ajouter une facture
                        </Link>
                    </div>

                    {/* Search bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher une facture..."
                            className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow text-sm">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                                    <th className="px-4 py-2 border text-gray-100">N°</th>
                                    <th className="px-4 py-2 border text-indigo-400">Client</th>
                                    <th className="px-4 py-2 border text-blue-600">Date</th>
                                    <th className="px-4 py-2 border text-green-500">Total</th>
                                    <th className="px-4 py-2 border text-gray-400">Produits</th>
                                    <th className="px-4 py-2 border text-align">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {factures.map((facture) => (
                                    <tr key={facture.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2 border">{facture.id}</td>
                                        <td className="px-4 py-2 border">{facture.client ? `${facture.client.nom} ${facture.client.prenom}` : '-'}</td>
                                        <td className="px-4 py-2 border">{facture.date_facture}</td>
                                        <td className="px-4 py-2 border">{getTotal(facture).toFixed(2)} MAD</td>
                                        <td className="px-4 py-2 border">
                                            {facture.lignes && facture.lignes.length > 0 ? (
                                                <ul className="list-disc pl-4">
                                                    {facture.lignes.map(ligne => (
                                                        <li key={ligne.id}>
                                                            {ligne.produit?.nom} x {ligne.quantite} @ {ligne.prixUnitaire} MAD
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-400">Aucun produit</span>
                                            )}
                                        </td>
                                        <td className="flex justify-center px-4 py-2 border text-center space-x-2">
                                            <Link href={`/factures/${facture.id}/edit`} className="text-blue-500 hover:underline">
                                                <Pencil size={16} />
                                            </Link>
                                            <Link href={`/factures/${facture.id}`} method="delete" as="button" className="text-red-600">
                                                <Trash2 size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <span>Affichage de 1 à {factures.length} sur {factures.length} factures</span>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">1</button>
                            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">2</button>
                            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">›</button>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
