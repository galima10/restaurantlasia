<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];
?>

<div
  class="react-flagshipproductsection"
  data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'></div>
