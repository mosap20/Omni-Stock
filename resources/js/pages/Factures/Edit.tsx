import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface Client {
  id: number;
  nom: string;
  prenom: string;
}

interface Produit {
  id: number;
  nom: string;
  prixVente: number;
}

interface LigneFacture {
  id?: number;
  produit_id: string;
  quantite: number;
  prixUnitaire: string | number;
  produit?: Produit;
}

interface Facture {
  id: number;
  client: Client;
  client_id: number;
  date_facture: string;
  lignes: LigneFacture[];
}

interface Props {
  facture: Facture;
  clients: Client[];
  produits: Produit[];
}

export default function EditFacture({ facture, clients, produits }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    client_id: facture.client_id || (facture.client ? facture.client.id : ''),
    date_facture: facture.date_facture || '',
    lignes: facture.lignes.map(ligne => ({
      produit_id: ligne.produit_id ? String(ligne.produit_id) : (ligne.produit ? String(ligne.produit.id) : ''),
      quantite: ligne.quantite,
      prixUnitaire: ligne.prixUnitaire,
    })) || [ { produit_id: '', quantite: 1, prixUnitaire: '' } ],
  });

  const handleLigneChange = (index: number, field: string, value: any) => {
    const newLignes = [...data.lignes];
    newLignes[index] = { ...newLignes[index], [field]: value };
    setData('lignes', newLignes);
  };

  const addLigne = () => {
    setData('lignes', [...data.lignes, { produit_id: '', quantite: 1, prixUnitaire: '' }]);
  };

  const removeLigne = (index: number) => {
    const newLignes = data.lignes.filter((_, i) => i !== index);
    setData('lignes', newLignes);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/factures/${facture.id}`, {
      onSuccess: () => router.visit('/factures'),
    });
  };

  return (
    <>
      <Head title="Modifier la facture" />
      <AppLayout>
        <div className="p-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Modifier la facture</CardTitle>
            </CardHeader>
            <form onSubmit={submit} autoComplete="on">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="client_id">Client</Label>
                    <Select
                      value={String(data.client_id)}
                      onValueChange={value => setData('client_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={String(client.id)}>
                            {client.nom} {client.prenom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>}
                  </div>
                  <div>
                    <Label htmlFor="date_facture">Date de la facture</Label>
                    <Input
                      id="date_facture"
                      type="date"
                      value={data.date_facture}
                      onChange={e => setData('date_facture', e.target.value)}
                    />
                    {errors.date_facture && <p className="text-red-500 text-sm mt-1">{errors.date_facture}</p>}
                  </div>
                </div>
                <div>
                  <Label>Lignes de facture</Label>
                  {data.lignes.map((ligne, index) => (
                    <div key={index} className="flex gap-2 items-end mb-2">
                      <Select
                        value={ligne.produit_id}
                        onValueChange={value => handleLigneChange(index, 'produit_id', value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Produit" />
                        </SelectTrigger>
                        <SelectContent>
                          {produits.map(produit => (
                            <SelectItem key={produit.id} value={String(produit.id)}>
                              {produit.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        min={1}
                        className="w-24"
                        value={ligne.quantite}
                        onChange={e => handleLigneChange(index, 'quantite', Number(e.target.value))}
                        placeholder="Quantité"
                      />
                      <Input
                        type="number"
                        min={0}
                        className="w-32"
                        value={String(ligne.prixUnitaire)}
                        onChange={e => handleLigneChange(index, 'prixUnitaire', e.target.value)}
                        placeholder="Prix unitaire"
                      />
                      <Button type="button" variant="destructive" onClick={() => removeLigne(index)} disabled={data.lignes.length === 1}>
                        Supprimer
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addLigne} className="mt-2">
                    + Ajouter une ligne
                  </Button>
                  {errors.lignes && <p className="text-red-500 text-sm mt-1">{errors.lignes}</p>}
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.visit('/factures')}>
                  Retour
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Mise à jour...' : 'Mettre à jour'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </AppLayout>
    </>
  );
}
