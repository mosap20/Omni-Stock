import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LigneCommande {
  id: number;
  produit: { nom: string };
  quantite: number;
  prixUnitaire: number;
}

interface Fournisseur {
  id: number;
  nom_entreprise: string;
}

interface Bon {
  id: number;
  fournisseur: Fournisseur;
  date_commande: string;
  lignes: LigneCommande[];
}

interface BonsPageProps {
  bons: Bon[];
}

export default function BonsIndex({ bons }: BonsPageProps) {
  // Calcul du total d'un bon
  const getTotal = (bon: Bon) =>
    bon.lignes.reduce((sum, l) => sum + l.quantite * l.prixUnitaire, 0);

  return (
    <>
      <Head title="Bons de commande" />
      <AppLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Bons de commande</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Gérez vos bons de commande fournisseurs</p>
            </div>
            <Link
              href="/bons/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Ajouter un bon
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2 border text-gray-100">N°</th>
                  <th className="px-4 py-2 border text-indigo-400">Fournisseur</th>
                  <th className="px-4 py-2 border text-blue-600">Date</th>
                  <th className="px-4 py-2 border text-green-500">Total</th>
                  <th className="px-4 py-2 border text-gray-400">Produits</th>
                  <th className="px-4 py-2 border text-align">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bons.map((bon) => (
                  <tr key={bon.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 border">{bon.id}</td>
                    <td className="px-4 py-2 border">{bon.fournisseur ? bon.fournisseur.nom_entreprise : '-'}</td>
                    <td className="px-4 py-2 border">{bon.date_commande}</td>
                    <td className="px-4 py-2 border">{getTotal(bon).toFixed(2)} MAD</td>
                    <td className="px-4 py-2 border">
                      {bon.lignes && bon.lignes.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {bon.lignes.map(ligne => (
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
                      <Link href={`/bons/${bon.id}/edit`} className="text-blue-500 hover:underline">
                        <Pencil size={16} />
                      </Link>
                      <Link href={`/bons/${bon.id}`} method="delete" as="button" className="text-red-600">
                        <Trash2 size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
