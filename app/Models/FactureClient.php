<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FactureClient extends Model
{
    protected $fillable = ['date_facture', 'client_id'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function lignes()
    {
        return $this->hasMany(LigneFacture::class);
    }
}
