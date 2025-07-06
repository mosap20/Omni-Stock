import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import React from 'react';

interface Produit {
  id: number;
  nom: string;
  prixAchat: number;
  prixVente: number;
  quantite: number;
  description: string;
  categorie: string;
}

interface ProduitsPageProps extends PageProps {
  produits: Produit[];
}

export default function ProduitsIndex({ produits }: ProduitsPageProps) {
  // Regrouper les produits par catégorie
  const produitsParCategorie = produits.reduce((acc: Record<string, Produit[]>, produit) => {
    if (!acc[produit.categorie]) {
      acc[produit.categorie] = [];
    }
    acc[produit.categorie].push(produit);
    return acc;
  }, {});

  return (
    <>
      <Head title="Produits" />
      <AppLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Produits</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Gérez votre base de produits</p>
            </div>
            <Link
              href="/produits/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Ajouter un produit
            </Link>
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2 border text-gray-100">Nom</th>
                  <th className="px-4 py-2 border text-indigo-400">Prix d'achat</th>
                  <th className="px-4 py-2 border text-blue-600">Prix de vente</th>
                  <th className="px-4 py-2 border text-green-500">Stock</th>
                  <th className="px-4 py-2 border text-purple-400">Catégorie</th>
                  <th className="px-4 py-2 border text-gray-400">Description</th>
                  <th className="px-4 py-2 border text-align">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(produitsParCategorie).map(([categorie, produits]) => (
                  <React.Fragment key={categorie}>
                    {/* En-tête de catégorie */}
                    <tr>
                      <td colSpan={7} className="bg-indigo-50 dark:bg-gray-900 font-bold text-indigo-700 dark:text-indigo-300 px-4 py-2 border-b text-lg">
                        {categorie}
                      </td>
                    </tr>
                    {produits.map((produit) => (
                      <tr key={produit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 border">{produit.nom}</td>
                        <td className="px-4 py-2 border">{produit.prixAchat} MAD</td>
                        <td className="px-4 py-2 border">{produit.prixVente} MAD</td>
                        <td className="px-4 py-2 border flex items-align gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => router.post(`/produits/${produit.id}/decrement-quantite`)}
                            disabled={produit.quantite <= 0}
                            title="Diminuer le stock"
                            type="button"
                          >
                            <Minus size={16} />
                          </Button>
                          <span>{produit.quantite}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => router.post(`/produits/${produit.id}/increment-quantite`)}
                            title="Augmenter le stock"
                            type="button"
                          >
                            <Plus size={16} />
                          </Button>
                        </td>
                        <td className="px-4 py-2 border">{produit.categorie}</td>
                        <td className="px-4 py-2 border">{produit.description}</td>
                        <td className="flex justify-center px-4 py-2 border text-center space-x-2">
                          <Link href={`/produits/${produit.id}/edit`} className="text-blue-500 hover:underline">
                            <Pencil size={16} />
                          </Link>
                          <Link href={`/produits/${produit.id}`} method="delete" as="button" className="text-red-600">
                            <Trash2 size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <span>Affichage de 1 à {produits.length} sur {produits.length} produits</span>
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
