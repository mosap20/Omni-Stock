<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    protected $fillable = ['bon_commande_id', 'produit_id', 'quantite', 'prixUnitaire'];

    public function bonCommande()
    {
        return $this->belongsTo(BonCommande::class, 'bon_commande_id');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}
