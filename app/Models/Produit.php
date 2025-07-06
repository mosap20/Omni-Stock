<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\CategorieProduit;

class Produit extends Model
{
    protected $fillable = [
        'nom', 'reference', 'prixAchat', 'prixVente', 'quantite', 'description', 'categorie'
    ];

    protected $casts = [
        'categorie' => CategorieProduit::class,
    ];

    public function lignesFacture()
    {
        return $this->hasMany(LigneFacture::class);
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class);
    }
}
