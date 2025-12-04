<?php

/**
 * Footer template file
 * This file contains the footer structure of the theme including:
 * - Footer content
 * - Closing body and HTML tags
 * - WordPress footer scripts that run all the necessary scripts called with some hooks.
 */
?>
<footer id="site-footer">
    <!-- <div class="site-info">
            <p>&copy; <?php /* Outputs current year */ echo date('Y'); ?> <?php /* Outputs site name */ bloginfo('name'); ?></p>
        </div> -->
    <?php
    $datas = $attributes['datas'] ?? [];

    // Récupère le logo personnalisé et l’URL du favicon
    $logo_html = get_custom_logo();
    $logo_url = '';
    if ($logo_html) {
        $doc = new DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML($logo_html);
        $img = $doc->getElementsByTagName('img')->item(0);
        if ($img) {
            $logo_url = $img->getAttribute('src');
        }
    }
    $datas['logo'] = [
        'src' => $logo_url,
        'alt' => get_bloginfo('name')
    ];

    // Récupère les emplacements de menu
    $locations = get_nav_menu_locations();
    $menu_id = $locations['primary'] ?? 0;

    // Récupère les infos de la page mise en avant
    $featured_page_id = get_option('featured_page_id');
    $featured_page_link = $featured_page_id ? get_permalink($featured_page_id) : null;
    $featured_page_title = $featured_page_id ? get_the_title($featured_page_id) : null;

    // Initialise les données pour les liens de navigation et le bouton CTA
    $datas['navLinks'] = [];
    $button_cta_text = $featured_page_title; // Par défaut, utilise le titre de la page mise en avant

    // Si un menu est assigné à l'emplacement "primary", récupère les éléments du menu
    if ($menu_id) {
        $menu_items = wp_get_nav_menu_items($menu_id);
        if ($menu_items) {
            foreach ($menu_items as $index => $item) {
                // Ajoute chaque élément du menu dans navLinks
                $datas['navLinks']["link{$index}"] = [
                    'link' => $item->url, // URL du lien
                    'text' => $item->title, // Titre défini dans le menu
                ];

                // Si l'élément correspond à la page mise en avant, utilise son titre pour le bouton CTA
                if ($item->object_id == $featured_page_id) {
                    $button_cta_text = $item->title;
                }
            }
        }
    }

    // Remplit les données pour le bouton CTA
    $datas['buttonCTA'] = [
        'link' => $featured_page_link,
        'text' => $button_cta_text,
    ];

    $block_name = 'theme/product-list';


    $page_ids = wp_list_pluck(get_pages([
        'post_status' => 'publish',
        'number'      => 50,
        'fields'      => 'ids',
    ]), 'ID');

    $first_product_list_page = null;

    foreach ($page_ids as $id) {
        $blocks = parse_blocks(get_post_field('post_content', $id));
        foreach ($blocks as $block) {
            if ($block['blockName'] === $block_name) {
                $first_product_list_page = $id;
                break 2; // sortie des deux boucles dès qu'on trouve
            }
        }
    }

    // Récupère le titre de la première page contenant un bloc "theme/product-list"
    $datas['productsTitlePage'] = $first_product_list_page
        ? get_the_title($first_product_list_page)
        : null;

    // Récupère le lien de la première page contenant un bloc "theme/product-list"
    $products_page_link = $first_product_list_page
        ? get_permalink($first_product_list_page)
        : null;

    // Récupère les catégories de produits pour les liens dans le footer
    $categories = get_terms([
        'taxonomy' => 'product_category',
        'hide_empty' => true,
    ]);

    // Prépare les liens des catégories de produits pour le footer
    $datas['productSectionLinks'] = [];

    foreach ($categories as $index => $cat) {
        $datas['productSectionLinks']["cat{$index}"] = [
            'link' => $products_page_link,
            'text' => $cat->name,
        ];
    }

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
        'instagram'   => [
            'link'    => get_option('instagram_link', ''), // Récupère le lien Instagram
            'account' => get_option('instagram_account', ''), // Récupère le nom du compte Instagram
        ],
    ];

    // Vérification que closedDays est bien un tableau
    if (!is_array($globalInfo['closedDays'])) {
        $globalInfo['closedDays'] = [];
    }

    // Merge les infos globales dans la props datas
    $datas['globalInfo'] = $globalInfo;
    ?>

    <!-- React Footer -->
    <div class="react-footer" data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>
</footer>

<?php /* Hook for scripts - Required for WordPress to load footer scripts add in functions.php */
wp_footer();
?>
</body>

</html>