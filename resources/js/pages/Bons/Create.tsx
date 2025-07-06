import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

interface Fournisseur {
  id: number;
  nom_entreprise: string;
}

interface Produit {
  id: number;
  nom: string;
  prixAchat: number;
}

interface Props {
  fournisseurs: Fournisseur[];
  produits: Produit[];
}

export default function CreateBon({ fournisseurs, produits }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    fournisseur_id: '',
    date_commande: '',
    lignes: [
      { produit_id: '', quantite: 1, prixUnitaire: '' },
    ],
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
    post('/bons', {
      onSuccess: () => router.visit('/bons'),
    });
  };

  return (
    <>
      <Head title="Créer un bon de commande" />
      <AppLayout>
        <div className="p-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Créer un bon de commande</CardTitle>
            </CardHeader>
            <form onSubmit={submit} autoComplete="on">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="fournisseur_id">Fournisseur</Label>
                    <Select
                      value={data.fournisseur_id}
                      onValueChange={value => setData('fournisseur_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un fournisseur" />
                      </SelectTrigger>
                      <SelectContent>
                        {fournisseurs.map(fournisseur => (
                          <SelectItem key={fournisseur.id} value={String(fournisseur.id)}>
                            {fournisseur.nom_entreprise}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.fournisseur_id && <p className="text-red-500 text-sm mt-1">{errors.fournisseur_id}</p>}
                  </div>
                  <div>
                    <Label htmlFor="date_commande">Date du bon</Label>
                    <Input
                      id="date_commande"
                      type="date"
                      value={data.date_commande}
                      onChange={e => setData('date_commande', e.target.value)}
                    />
                    {errors.date_commande && <p className="text-red-500 text-sm mt-1">{errors.date_commande}</p>}
                  </div>
                </div>
                <div>
                  <Label>Lignes du bon</Label>
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
                        value={ligne.prixUnitaire}
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
                <Button type="button" variant="outline" onClick={() => router.visit('/bons')}>
                  Retour
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </AppLayout>
    </>
  );
}
