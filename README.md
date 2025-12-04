# Thème Wordpress sur mesure

## Structure des fichiers

```
/
├── blocks/
│   ├── childrenPages/
│   │   ├── complex-four-images/
│   │   │   ├── block.json
│   │   │   ├── edit.jsx
│   │   │   └── render.php
│   │   ├── complex-message-form/
│   │   ├── complex-triple-images/
│   │   ├── cta-block/
│   │   ├── flagship-product/
│   │   ├── header-page-container/
│   │   ├── intro-disposition-1/
│   │   ├── intro-disposition-2/
│   │   ├── local-reviews-list/
│   │   ├── product-list/
│   │   ├── simple-text/
│   │   └── simple-text-button/
│   ├── frontPage/
│   │   ├── front-page-hero/
│   │   ├── gallery-grid/
│   │   ├── google-reviews/
│   │   └── local-reviews/
│   └── general/
│       ├── faq-list/
│       ├── flagship-products-module/
│       ├── reservation/
│       ├── simple-image-text/
│       └── two-images-text/
├── blocks-editor/
│   ├── src/
│   │   └── index.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── dist/
│   ├── editor/
│   │   └── index.js
│   └── front-app/
│       ├── index.css
│       ├── index.js
│       └── index.umd.js
├── inc/
│   ├── cpt/
│   │   ├── content-menu.php
│   │   ├── faqlist.php
│   │   ├── global-infos.php
│   │   ├── messages.php
│   │   ├── products.php
│   │   ├── reservations.php
│   │   └── reviews.php
│   ├── assets.php
│   ├── categories-blocks.php
│   ├── register-blocks.php
│   ├── remove-cpt-articles.php
│   ├── setup.php
│   └── templates.php
├── react-app/
│   ├── dist/
│   │   └── tsconfig.tsbuildinfo
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   │   ├── DancingScript/
│   │   │   │   ├── Parisienne/
│   │   │   │   └── Yaldevi/
│   │   │   └── images/
│   │   │       └── fallback.webp
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── hooks/
│   │   ├── styles/
│   │   │   ├── partials/
│   │   │   │   ├── _functions.scss
│   │   │   │   ├── _mixins.scss
│   │   │   │   ├── _placeholders.scss
│   │   │   │   └── _variables.scss
│   │   │   ├── _reset.scss
│   │   │   ├── _theme.scss
│   │   │   ├── _utils.scss
│   │   │   └── main.scss
│   │   ├── global.d.ts
│   │   ├── main.tsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.js
├── footer.php
├── front-page.php
├── functions.php
├── header.php
├── index.php
├── page.php
├── screenshot.png
├── single-product.php
└── style.css
```

## Description des fichiers

### Fichiers principaux
- `style.css` - Main stylesheet and theme information
- `screenshot.png` - Theme preview image
- `index.php` - Fallback page for the template
- `header.php` - Site header
- `footer.php` - Site footer
- `functions.php` - Theme functions and configurations

### Templates spécifiques
- `front-page.php` - Custom homepage
- `page.php` - Standard pages template
- `single-product.php` - Product template

### Dossiers
- `blocks/` - Blocs Gutenberg custom
- `blocks-editor/` - Gestion de l'interface Gutenberg
- `react-app/` - Gestion de l'affichage des pages avec des composants React
- `dist/` - Bundles du front et de l'interface Gutenberg