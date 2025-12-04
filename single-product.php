<?php

/**
 * Single Post template file
 * This template is used for displaying individual post content.
 * It includes:
 * - Post featured image
 * - Post title
 * - Post meta (date, author, categories, tags)
 * - Post content
 */
get_header(); // Load header.php logic in our file 
?>
<?php while (have_posts()) : the_post(); ?>
    <main id="main-content" class="single-post">
        <?php
        $datas = $attributes['datas'] ?? [];

        // Récupère le titre du produit
        $datas['title'] = get_the_title();

        // Récupère les catégories du produit
        $categories = get_the_terms(get_the_ID(), 'product_category');

        if ($categories && !is_wp_error($categories)) {
            // Récupérer uniquement les noms des catégories
            $cat_names = wp_list_pluck($categories, 'name');

            // Transformer le tableau en string séparé par des virgules
            $categories_string = implode(', ', $cat_names);
        }

        $datas['category'] = $categories_string ?? '';

        // Récupère l'image mise en avant du produit
        $imageHighlighted = [
            'src' => get_the_post_thumbnail_url(get_the_ID(), 'large') ?: '',
            'alt' => get_post_meta(get_post_thumbnail_id(get_the_ID()), '_wp_attachment_image_alt', true) ?: '',
        ];

        $datas['imageHighlighted'] = $imageHighlighted;
        $datas['backgroundImage'] = $imageHighlighted['src'];

        // Récupère la description et le prix du produit
        $datas['description'] = wp_strip_all_tags(get_the_content());
        $price = get_field('price', get_the_ID());
        $datas['price'] = $price ? number_format((float)$price, 2, '.', '') : null;

        // Récupère les images supplémentaires du produit
        $product_images = [];

        // Boucle sur les 8 champs
        for ($i = 1; $i <= 8; $i++) {
            // Récupère le champ ACF du produit courant
            $image = get_field('image_produit_' . $i, get_the_ID());

            if ($image) { // Si le champ n'est pas vide
                $product_images[] = [
                    'src' => $image['url'] ?? '',   // URL de l'image
                    'alt' => $image['alt'] ?? '',   // Texte alternatif
                ];
            }
        }

        $datas['images'] = $product_images;

        // Récupère les liens vers les produits précédent et suivant dans la même catégorie
        $prev_product = get_previous_post(true, '', 'product_category'); // même catégorie
        // ne rien faire si null

        $next_product = get_next_post(true, '', 'product_category'); // même catégorie
        // ne rien faire si null

        $datas['previousProductLink'] = $prev_product ? get_permalink($prev_product->ID) : "";
        $datas['nextProductLink'] = $next_product ? get_permalink($next_product->ID) : "";

        // Récupère le lien vers la page contenant le bloc "theme/product-list"
        $block_name = 'theme/product-list';
        $pages_ids = wp_list_pluck(get_pages([
            'post_status' => 'publish',
            'number'      => 50,
            'fields'      => 'ids',
        ]), 'ID');

        $first_product_list_page = null;

        foreach ($pages_ids as $id) {
            $blocks = parse_blocks(get_post_field('post_content', $id));
            foreach ($blocks as $block) {
                if ($block['blockName'] === 'theme/product-list') {
                    $first_product_list_page = $id;
                    break 2;
                }
            }
        }

        // Récupère le lien de la première page contenant un bloc "theme/product-list"
        $products_page_link = $first_product_list_page ? get_permalink($first_product_list_page) : null;

        // Stocker le lien dans une variable
        $datas['productsListLink'] = $products_page_link;
        ?>

        <!-- Affichage des sections React -->
        <div class="react-headersection" data-datas='<?php echo wp_json_encode($datas, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'></div>
        <div class="react-productimagessection" data-datas='<?php echo wp_json_encode($datas, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'></div>
        <div class="react-descriptionsection" data-datas='<?php echo wp_json_encode($datas, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'></div>
        <div class="react-navigationsection" data-datas='<?php echo wp_json_encode($datas, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>'></div>
    </main>
<?php endwhile; ?>
<?php get_footer(); // Load footer.php logic in our file 
?>