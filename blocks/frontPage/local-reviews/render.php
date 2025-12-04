<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];

// Récupération des 3 derniers avis depuis le CPT "review"
$reviews_posts = get_posts([
    'post_type'      => 'review',     // change si tu as un autre slug
    'posts_per_page' => 3,           // ou un nombre si tu veux limiter (ex: 10)
    'orderby'        => 'date',
    'order'          => 'DESC',
    'post_status'    => 'publish',
]);

// Transforme les posts en objet utilisable par React
$reviews = array_map(function ($r) {
    return [
        'name' => get_the_title($r),
        // format de date lisible : change le format si tu veux ex: 'd/m/Y'
        'date' => strftime('%d %b %Y', strtotime($r->post_date)),
        // applique les filtres de contenu pour conserver le HTML et shortcodes
        'text' => wp_strip_all_tags(apply_filters('the_content', $r->post_content)),
    ];
}, $reviews_posts);

// Fusionne dans $datas (les questions/avis du CPT remplacent/complètent ceux du bloc)
$datas['reviews'] = $reviews;

// Encode JSON en échappant quotes/apostrophes pour un attribut HTML sûr
$json_flags = JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES;
?>
<div
    class="react-localreviewssection"
    data-datas='<?php echo esc_attr(wp_json_encode($datas, $json_flags)); ?>'></div>