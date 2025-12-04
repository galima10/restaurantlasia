<?php

/**
 * Page template file
 * This template is used for individual page.
 * If front-page.php is present, this template will not be used for the home page.
 */
get_header(); // Load header.php logic in our file 
?>
<?php while (have_posts()) : the_post(); ?>
    <main id="main-content" class="single-post">
        <!-- Affichage du contenu des pages enfants -->
        <?php the_content(); ?>
    </main>
<?php endwhile; ?>
<?php get_footer(); // Load footer.php logic in our file 
?>