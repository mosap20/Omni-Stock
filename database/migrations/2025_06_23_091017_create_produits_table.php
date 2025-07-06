<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\CategorieProduit;

return new class extends Migration {
    public function up(): void {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('reference')->unique();
            $table->float('prixAchat');
            $table->float('prixVente');
            $table->integer('quantite');
            $table->text('description')->nullable();
            $table->enum('categorie', array_column(CategorieProduit::cases(), 'value'));
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('produits');
    }
};

