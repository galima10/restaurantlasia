<?php

/**
 * Header template file
 * This file contains the header structure of the theme including:
 * - HTML doctype and head section
 * - Opening body tag
 * - Loading the site meta information
 * - Loading all the styles added in queue with wp_head()
 * - Add the site title and main navigation menu
 */
?>

<!DOCTYPE html>
<html <?php /* Outputs the language attributes for the HTML tag */ language_attributes(); ?>>

<head>
    <meta charset="<?php /* Outputs the site's character encoding */ bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php /* Hook for scripts, styles, and meta elements */ wp_head(); ?>
    <title><?php the_title(); ?></title>
</head>

<body <?php /* Adds classes to the body tag */ body_class(); ?>>
    <?php /* Hook for inserting content after body tag - WordPress 5.2+ */ wp_body_open(); ?>
    <header id="site-header">
        <?php

        // Récupère les éléments du menu principal
        $locations = get_nav_menu_locations(); // récupère tous les emplacements de menu
        $menu_id = $locations['primary'] ?? 0;
        $menu_items = $menu_id ? wp_get_nav_menu_items($menu_id) : [];

        // Récupère l’ID de la page mise en avant
        $featured_page_id = get_option('featured_page_id'); // ID de la page mise en avant


        // Construit le tableau des liens pour la navbar
        $links = [];

        if ($menu_items) {
            foreach ($menu_items as $index => $item) {
                $type = ($item->object_id == $featured_page_id) ? 'primary' : 'menu';

                $links["link{$index}"] = [
                    "link" => $item->url,
                    "text" => $item->title,
                    "type" => $type,
                ];
            }
        }

        // Récupère le logo personnalisé et l’URL du favicon
        $logo_html = get_custom_logo();
        $logo_url = '';

        if ($logo_html) {
            $doc = new DOMDocument();
            libxml_use_internal_errors(true); // ignore les warnings HTML5
            $doc->loadHTML($logo_html);
            $img = $doc->getElementsByTagName('img')->item(0);
            if ($img) {
                $logo_url = $img->getAttribute('src');
            }
        }

        // Prépare les données pour le lien vers la page d'accueil
        $homeLink = [
            "link" => esc_url(home_url('/')),
            "srcLogo" => $logo_url,
            "srcFavicon" => get_site_icon_url(),
        ];
        ?>

        <!-- React Navbar -->
        <div class="react-navbar" data-datas='<?php echo htmlspecialchars(wp_json_encode(["links" => $links, "homeLink" => $homeLink]), ENT_QUOTES, 'UTF-8'); ?>'></div>

    </header>