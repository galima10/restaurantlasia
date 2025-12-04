<?php
$categories_data = [];

// Récupérer toutes les catégories de produits via la taxonomie 'product_category'
$categories = get_terms([
  'taxonomy' => 'product_category',
  'hide_empty' => true,
  'orderby' => 'term_id', // Tri par ID (ordre de création)
  'order' => 'ASC',       // Ordre croissant (du plus ancien au plus récent)
]);

foreach ($categories as $category) {

  // Récupérer les produits dans cette catégorie
  $products = get_posts([
    'post_type' => 'product',
    'tax_query' => [[
      'taxonomy' => 'product_category',
      'field'    => 'term_id',
      'terms'    => $category->term_id,
    ]],
    'posts_per_page' => -1,
  ]);

  $category_products = [];

  foreach ($products as $product) {

    $thumbnail_id = get_post_thumbnail_id($product->ID);

    $category_products[] = [
      'name' => get_the_title($product->ID),
      'link' => get_permalink($product->ID),
      'image' => [
        'src' => get_the_post_thumbnail_url($product->ID, 'large') ?: '',
        'alt'  => get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) ?: '',
      ]
    ];
  }

  // Ajouter la catégorie si elle a des produits
  if (!empty($category_products)) {
    $categories_data[] = [
      'categoryName' => $category->name,
      'products'     => $category_products,
    ];
  }
}

$datas = [
  'products' => $categories_data
];

?>

<div
  class="react-productssection"
  data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>
