<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LigneFacture extends Model
{
    protected $fillable = ['facture_client_id', 'produit_id', 'quantite', 'prixUnitaire'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function facture()
    {
        return $this->belongsTo(FactureClient::class, 'facture_client_id');
    }
}
