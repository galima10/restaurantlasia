<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];

// Récupération des produits phares depuis les options WordPress dans Gestion de contenu dans Produits mis en avant
$featured_ids = get_option('featured_products_ids', []);


$featured_products = [];

if (!empty($featured_ids)) {

    $products = get_posts([
        'post_type'      => 'product',
        'post__in'       => $featured_ids,
        'orderby'        => 'post__in', // respecter l'ordre choisi dans l'admin
        'posts_per_page' => 3,
    ]);

    foreach ($products as $product) {
        $featured_products[] = [
            "name"  => get_the_title($product->ID),
            "link"  => get_permalink($product->ID),
            "src"   => get_the_post_thumbnail_url($product->ID, "medium") ?: "",
        ];
    }
}

$datas["flagshipDishes"] = $featured_products;

?>

<div
  class="react-flagshipproductsmodulesection"
  data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>
