<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model
{
    protected $fillable = ['nom_entreprise', 'telephone', 'adresse'];

    public function bons()
    {
        return $this->hasMany(BonCommande::class);
    }
}
