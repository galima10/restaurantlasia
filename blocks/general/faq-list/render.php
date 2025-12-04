<?php
// Récupération des attributs du bloc (via l'éditeur Gutenberg)
$datas = $attributes['datas'] ?? [];

// Récupère les questions depuis le CPT 'faq'
$questions = get_posts([
  'post_type'      => 'faq',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
]);

// Transforme les questions pour le composant React
$faqQuestions = array_map(function ($q) {
  return [
    'id'     => $q->ID,
    'title'  => get_the_title($q),
    'answer' => wp_strip_all_tags(apply_filters('the_content', $q->post_content)),
  ];
}, $questions);

// Fusionne dans $datas
$datas = array_merge($datas, [
  'questions' => $faqQuestions,
]);
?>

<div
  class="react-faqsection"
  data-datas='<?php echo esc_attr(wp_json_encode($datas)); ?>'>
</div>