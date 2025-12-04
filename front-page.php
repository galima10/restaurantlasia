<?php

/**
 * Front Page template file
 * This template is used for displaying the home page when you set a static front page
 * in WordPress Settings > Reading.
 * 
 */

get_header(); // Load header.php logic in our file 
?>
<div class="page-content">
    <!-- Affichage du contenu de la page d'accueil -->
    <?php the_content(); ?>
</div>

<?php get_footer(); // Load footer.php logic in our file 
?>