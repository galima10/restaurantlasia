<?php

/* 
 * Inclut tous les fichiers PHP dans le dossier inc et ses sous-dossiers.
 * Cela permet de mieux organiser le code en séparant les fonctionnalités
 * dans différents fichiers tout en les chargeant automatiquement.
 * Ajoute des fonctionnalités modulaires au thème WordPress.
 */

// Boucles pour inclure tous les fichiers PHP dans le dossier inc
foreach (glob(__DIR__ . '/inc/*.php') as $filename) {
    require_once $filename;
}

// Boucles pour inclure tous les fichiers PHP dans les sous-dossiers de inc
foreach (glob(__DIR__ . '/inc/*/*.php') as $filename) {
    require_once $filename;
}
