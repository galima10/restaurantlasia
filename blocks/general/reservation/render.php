<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];

// Récupération des informations globales depuis les options WordPress dans Réglages > Infos globales
$globalInfo = [
    'openingHours' => [
        'noon' => [
            'start' => sprintf(
                '%02d:%02d',
                get_option('midi_start_h', 0),
                get_option('midi_start_m', 0)
            ),
            'end' => sprintf(
                '%02d:%02d',
                get_option('midi_end_h', 0),
                get_option('midi_end_m', 0)
            ),
        ],
        'evening' => [
            'start' => sprintf(
                '%02d:%02d',
                get_option('soir_start_h', 0),
                get_option('soir_start_m', 0)
            ),
            'end' => sprintf(
                '%02d:%02d',
                get_option('soir_end_h', 0),
                get_option('soir_end_m', 0)
            ),
        ],
    ],
    'closedDays'  => get_option('closed_days', []), // tableau de noms de jours
    'phoneNumber' => get_option('phone', ''),
    'address'     => get_option('address', ''),
];

// Vérification que closedDays est bien un tableau
if (!is_array($globalInfo['closedDays'])) {
    $globalInfo['closedDays'] = [];
}

// Merge les infos globales dans la props datas
$datas['globalInfo'] = $globalInfo;
?>

<div
    class="react-reservationsection"
    data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>