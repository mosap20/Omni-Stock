import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Produit {
    id: number;
    nom: string;
    reference: string;
    prixAchat: string | number;
    prixVente: string | number;
    quantite: number;
    description: string;
    categorie: string;
}

interface Props extends PageProps {
    produit: Produit;
}

export default function EditProduit({ produit }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: produit.nom || '',
        reference: produit.reference || '',
        prixAchat: produit.prixAchat || '',
        prixVente: produit.prixVente || '',
        quantite: produit.quantite || 0,
        description: produit.description || '',
        categorie: produit.categorie || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/produits/${produit.id}`, {
            onSuccess: () => router.visit('/produits'),
        });
    };

    return (
        <>
            <Head title="Modifier le produit" />
            <AppLayout>
                <div className="p-6 max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier le produit</CardTitle>
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
                                            placeholder="Nom du produit"
                                        />
                                        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="reference">Référence</Label>
                                        <Input
                                            id="reference"
                                            value={data.reference}
                                            onChange={e => setData('reference', e.target.value)}
                                            placeholder="Référence du produit"
                                            readOnly
                                        />
                                        {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="prixAchat">Prix d'achat (MAD)</Label>
                                        <Input
                                            id="prixAchat"
                                            type="number"
                                            value={data.prixAchat}
                                            onChange={e => setData('prixAchat', e.target.value)}
                                            placeholder="Prix d'achat du produit"
                                        />
                                        {errors.prixAchat && <p className="text-red-500 text-sm mt-1">{errors.prixAchat}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="prixVente">Prix de vente (MAD)</Label>
                                        <Input
                                            id="prixVente"
                                            type="number"
                                            value={data.prixVente}
                                            onChange={e => setData('prixVente', e.target.value)}
                                            placeholder="Prix de vente du produit"
                                        />
                                        {errors.prixVente && <p className="text-red-500 text-sm mt-1">{errors.prixVente}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="quantite">Quantité</Label>
                                        <Input
                                            id="quantite"
                                            type="number"
                                            value={data.quantite}
                                            onChange={e => setData('quantite', Number(e.target.value))}
                                            placeholder="Quantité en stock"
                                        />
                                        {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite}</p>}
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
                                                <SelectItem value="gros_electromenager">Gros électroménager</SelectItem>
                                                <SelectItem value="petit_electromenager">Petit électroménager</SelectItem>
                                                <SelectItem value="appareils_multimedias">Appareils multimédias</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.categorie && <p className="text-red-500 text-sm mt-1">{errors.categorie}</p>}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Description du produit"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end">
                                <Button type="button" variant="outline" onClick={() => router.visit('/produits')}>
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
