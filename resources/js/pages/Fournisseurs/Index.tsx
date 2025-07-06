import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Fournisseur {
  id: number;
  nom_entreprise: string;
  telephone: number;
  adresse: string;
}

interface FournisseursPageProps extends PageProps {
  fournisseurs: Fournisseur[];
}

export default function FournisseursIndex({ fournisseurs }: FournisseursPageProps) {
  return (
    <>
      <Head title="Fournisseurs" />
      <AppLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Fournisseurs</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Gérez votre base de fournisseurs</p>
            </div>
            <Link
              href="/fournisseurs/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Ajouter un fournisseur
            </Link>
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher un fournisseur..."
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2 border text-gray-100">Nom de l'entreprise</th>
                  <th className="px-4 py-2 border text-green-400">Telephone</th>
                  <th className="px-4 py-2 border text-blue-600">Adresse</th>
                  <th className="px-4 py-2 border text-align">Actions</th>
            
                </tr>
              </thead>
              <tbody>
                {fournisseurs.map((fournisseur) => (
                  <tr key={fournisseur.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-2 border">{fournisseur.nom_entreprise}</td>
                    <td className="px-4 py-2 border">{fournisseur.telephone}</td>
                    <td className="px-4 py-2 border">{fournisseur.adresse}</td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/fournisseurs/${fournisseur.id}/edit`} className="text-blue-500 hover:underline">
                          <Pencil size={16} />
                        </Link>
                        <Link href={`/fournisseurs/${fournisseur.id}`} method="delete" as="button" className="text-red-600">
                          <Trash2 size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <span>Affichage de 1 à {fournisseurs.length} sur {fournisseurs.length} fournisseurs</span>
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
