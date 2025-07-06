<?php

namespace App\Enums;

enum CategorieProduit: string
{
    case Gros_electromenager = 'gros_electromenager';
    case Petit_electromenager = 'petit_electromenager';
    case Appareils_multimedias = 'appareils_multimedias';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
