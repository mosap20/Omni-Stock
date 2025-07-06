<?php

namespace App\Enums;

enum CategorieClient: string
{
    case Particulier = 'particulier';
    case Professionnel = 'professionnel';
    case Entreprise = 'entreprise';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
