# Omni-Stock

Application de gestion de stock et de suivi commercial. Depuis l’espace connecté, on peut gérer les produits et leurs quantités, les clients et fournisseurs, les factures client et les bons de commande. Un tableau de bord donne accès aux principaux écrans de gestion.

Le backend utilise Laravel 12 et le frontend utilise React, TypeScript et Inertia.

## Installation locale

Installez PHP 8.2 ou supérieur avec PDO SQLite, Composer, ainsi que Node.js 22 et npm. Depuis le dossier de l’application Laravel, exécutez les commandes suivantes. Si un fichier `.env` existe déjà, conservez-le et vérifiez que `DB_CONNECTION=sqlite`.

```sh
composer install
php -r "file_exists('.env') || copy('.env.example', '.env');"
php artisan key:generate
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate
npm ci
```

Dans un terminal, lancez `php artisan serve`. Dans un second terminal, lancez `npm run dev`. Ouvrez ensuite l’adresse indiquée par Artisan, généralement `http://127.0.0.1:8000`.

Pour compiler les ressources, utilisez `npm run build`. Après compilation, lancez les tests PHP avec `php artisan test`.

`npm run types` vérifie les types TypeScript et `npm run format:check` vérifie le formatage. Les routes métier sont dans [routes/web.php](routes/web.php) et les pages dans [resources/js/](resources/js/).
