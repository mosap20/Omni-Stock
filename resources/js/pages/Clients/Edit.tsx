import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Client {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    categorie: string;
}

interface Props extends PageProps {
    client: Client;
}

export default function EditClient({ client }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: client.nom || '',
        prenom: client.prenom || '',
        email: client.email || '',
        telephone: client.telephone || '',
        adresse: client.adresse || '',
        categorie: client.categorie || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/clients/${client.id}`, {
            onSuccess: () => router.visit('/clients'),
        });
    };

    return (
        <>
            <Head title="Modifier le client" />
            <AppLayout>
                <div className="p-6 max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier le client</CardTitle>
                        </CardHeader>
                        <form onSubmit={submit} autoComplete="on">
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="nom">Nom</Label>
                                        <Input
                                            id="nom"
                                            value={data.nom}
                                            onChange={e => setData('nom', e.target.value)}
                                            placeholder="Nom du client"
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="prenom">Prenom</Label>
                                        <Input
                                            id="prenom"
                                            value={data.prenom}
                                            onChange={e => setData('prenom', e.target.value)}
                                            placeholder="Prenom du Client"
                                            readOnly
                                        />
                                        {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="Email du client"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="telephone">Telephone</Label>
                                        <Input
                                            id="telephone"
                                            value={data.telephone}
                                            onChange={e => setData('telephone', e.target.value)}
                                            placeholder="Telephone du client"
                                        />
                                        {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="adresse">Adresse</Label>
                                        <Input
                                            id="adresse"
                                            value={data.adresse}
                                            onChange={e => setData('adresse', e.target.value)}
                                            placeholder="Adresse du client"
                                        />
                                        {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
                                    </div>
                                </div>
                                <div>
                                        <Label htmlFor="categorie">Catégorie</Label>
                                        <Select
                                            value={data.categorie}
                                            onValueChange={value => setData('categorie', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="particulier">particulier</SelectItem>
                                                <SelectItem value="professionnel">professionnel</SelectItem>
                                                <SelectItem value="entreprise">entreprise</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.categorie && <p className="text-red-500 text-sm mt-1">{errors.categorie}</p>}
                                    </div>
                            </CardContent>
                            <CardFooter className="justify-end">
                                <Button type="button" variant="outline" onClick={() => router.visit('/clients')}>
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
