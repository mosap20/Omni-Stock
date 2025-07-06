import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';

export default function CreateProduit({ auth, flash }: PageProps & { flash?: { success?: string } }) {
  const { data, setData, post, processing, errors } = useForm({
    nom_entreprise: '',
    telephone: '',
    adresse: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Soumission des données :", data); // Pour déboguer
    post('/fournisseurs', {
      onSuccess: () => router.visit('/fournisseurs'),
      onError: (errors) => {
        console.log("Erreurs de validation :", errors);
      },
    });
  };
  

  return (
    <>
      <Head title="Ajouter un fournisseur" />
      <AppLayout>
        <div className="p-6 max-w-2xl mx-auto">
          {flash?.success && (
            <div className="mb-4">
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
                {flash.success}
              </div>
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Ajouter un fournisseur</CardTitle>
            </CardHeader>
            <form onSubmit={submit} autoComplete="on">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nom_entreprise">Nom de l'entreprise</Label>
                    <Input
                      id="nom_entreprise"
                      value={data.nom_entreprise}
                      onChange={e => setData('nom_entreprise', e.target.value)}
                      placeholder="Nom de l'entreprise"
                    />
                    {errors.nom_entreprise && <p className="text-red-500 text-sm mt-1">{errors.nom_entreprise}</p>}
                  </div>
                  <div>
                    <Label htmlFor="telephone">Telephone</Label>
                    <Input
                      id="telephone"
                      value={data.telephone}
                      onChange={e => setData('telephone', e.target.value)}
                        placeholder="Telephone du fournisseur"
                    />
                    {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input
                      id="adresse"
                      value={data.adresse}
                      onChange={e => setData('adresse', e.target.value)}
                      placeholder="Adresse du fournisseur"
                    />
                    {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="button" variant="outline" onClick={() => router.visit('/fournisseurs')}>
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
