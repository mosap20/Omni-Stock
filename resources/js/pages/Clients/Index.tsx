import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import React from 'react';

interface Client {
  id: number;
  nom: string;
  prenom: number;
  email: number;
  telephone: number;
  adresse: string;
  categorie: string;
}

interface ClientsPageProps extends PageProps {
  clients: Client[];
}

export default function ClientsIndex({ clients }: ClientsPageProps) {
  // Regrouper les clients par catégorie
  const clientsParCategorie: Record<string, Client[]> = clients.reduce((acc, client) => {
    if (!acc[client.categorie]) {
      acc[client.categorie] = [];
    }
    acc[client.categorie].push(client);
    return acc;
  }, {} as Record<string, Client[]>);

  return (
    <>
      <Head title="Clients" />
      <AppLayout>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Gestion des Clients</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Gérez votre base de clients</p>
            </div>
            <Link
              href="/clients/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Ajouter un client
            </Link>
          </div>

          {/* Search bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2 border text-gray-100">Nom</th>
                  <th className="px-4 py-2 border text-indigo-400">Prenom</th>
                  <th className="px-4 py-2 border text-blue-600">Email</th>
                  <th className="px-4 py-2 border text-green-500">Telephone</th>
                  <th className="px-4 py-2 border text-green-500">Adresse</th>
                  <th className="px-4 py-2 border text-purple-400">Catégorie</th>
                  <th className="px-4 py-2 border text-align">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(clientsParCategorie).map(([categorie, clients]) => (
                  <React.Fragment key={categorie}>
                    {/* En-tête de catégorie */}
                    <tr>
                      <td colSpan={7} className="bg-indigo-50 dark:bg-gray-900 font-bold text-indigo-700 dark:text-indigo-300 px-4 py-2 border-b text-lg">
                        {categorie}
                      </td>
                    </tr>
                    {clients.map((client: Client) => (
                      <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 border">{client.nom}</td>
                        <td className="px-4 py-2 border">{client.prenom}</td>
                        <td className="px-4 py-2 border">{client.email}</td>
                        <td className="px-4 py-2 border">{client.telephone}</td>
                        <td className="px-4 py-2 border">{client.adresse}</td>
                        <td className="px-4 py-2 border">{client.categorie}</td>
                        <td className="flex justify-center px-4 py-2 border text-center space-x-2">
                          <Link href={`/clients/${client.id}/edit`} className="text-blue-500 hover:underline">
                            <Pencil size={16} />
                          </Link>
                          <Link href={`/clients/${client.id}`} method="delete" as="button" className="text-red-600">
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
            <span>Affichage de 1 à {clients.length} sur {clients.length} clients</span>
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
