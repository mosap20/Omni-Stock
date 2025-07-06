<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\CategorieClient; 


class client extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'adresse',
        'categorie',
    ];
    protected $casts = [
    'categorie' => CategorieClient::class,
    ];

    public function factures()
    {
        return $this->hasMany(FactureClient::class);
    }
}
