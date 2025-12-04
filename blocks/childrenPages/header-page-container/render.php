<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];

// Injecte le titre de la page WordPress dans datas
$datas['title'] = get_the_title();
?>

<div
    class="react-headerpagecontainer"
    data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>
