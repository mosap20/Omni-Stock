<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ligne_factures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('facture_client_id')->constrained('facture_clients')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
            $table->integer('quantite');
            $table->float('prixUnitaire');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('ligne_factures');
    }
};

