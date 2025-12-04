import { registerBlockType } from "@wordpress/blocks";

// Import des composants d'édition pour chaque bloc
import EditComplexFourImages from "../../blocks/childrenPages/complex-four-images/edit.jsx";
import EditComplexMessageForm from "../../blocks/childrenPages/complex-message-form/edit.jsx";
import EditComplexTripleImages from "../../blocks/childrenPages/complex-triple-images/edit.jsx";
import EditCTABlock from "../../blocks/childrenPages/cta-block/edit.jsx";
import EditFlagshipProduct from "../../blocks/childrenPages/flagship-product/edit.jsx";
import EditIntroDisposition1 from "../../blocks/childrenPages/intro-disposition-1/edit.jsx";
import EditIntroDisposition2 from "../../blocks/childrenPages/intro-disposition-2/edit.jsx";
import EditSimpleMessageForm from "../../blocks/childrenPages/simple-message-form/edit.jsx";
import EditSimpleText from "../../blocks/childrenPages/simple-text/edit.jsx";
import EditSimpleTextButton from "../../blocks/childrenPages/simple-text-button/edit.jsx";
import EditHeaderPageContainer from "../../blocks/childrenPages/header-page-container/edit.jsx";
import EditLocalReviewsList from "../../blocks/childrenPages/local-reviews-list/edit.jsx";
import EditProductList from "../../blocks/childrenPages/product-list/edit.jsx";

import EditGalleryGrid from "../../blocks/frontPage/gallery-grid/edit.jsx";
import EditFrontPageHero from "../../blocks/frontPage/front-page-hero/edit.jsx";
import EditLocalReviews from "../../blocks/frontPage/local-reviews/edit.jsx";
import EditGoogleReviews from "../../blocks/frontPage/google-reviews/edit.jsx";

import EditTwoImagesText from "../../blocks/general/two-images-text/edit.jsx";
import EditSimpleImageText from "../../blocks/general/simple-image-text/edit.jsx";
import EditReservation from "../../blocks/general/reservation/edit.jsx";
import EditFAQList from "../../blocks/general/faq-list/edit.jsx";
import EditFlagshipProductsModule from "../../blocks/general/flagship-products-module/edit.jsx";

// Enregistrement des blocs Gutenberg pour l'interface d'édition
registerBlockType("theme/complex-four-images", {
  title: "Disposition à 4 images avec paragraphes",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        description: {
          paragraph1: "",
          paragraph2: "",
        },
        images: {
          img1: { src: "", alt: "" },
          img2: { src: "", alt: "" },
          img3: { src: "", alt: "" },
          img4: { src: "", alt: "" },
        },
        backgroundImageSrc: "",
      },
    },
  },
  edit: EditComplexFourImages,
  save: () => null,
});

registerBlockType("theme/complex-message-form", {
  title: "Formulaire de message pour le livre d'or avec paragraphes",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        description: {
          paragraph1: "",
          paragraph2: "",
        },
        backgroundImageSrc: "",
      },
    },
  },
  edit: EditComplexMessageForm,
  save: () => null,
});

registerBlockType("theme/complex-triple-images", {
  title: "Disposition à 3 images empilées avec paragraphes",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        hook: "",
        images: {
          img1: { src: "", alt: "" },
          img2: { src: "", alt: "" },
          img3: { src: "", alt: "" },
        },
        description: {
          paragraph1: "",
          paragraph2: "",
        },
      },
    },
  },
  edit: EditComplexTripleImages,
  save: () => null,
});

registerBlockType("theme/cta-block", {
  title: "Bloc CTA",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        description: "",
        buttonCTA: { text: "", link: "" },
        images: { img1: null, img2: null, img3: null },
      },
    },
  },
  edit: EditCTABlock,
  save: () => null,
});

registerBlockType("theme/flagship-product", {
  title: "Produit phare",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        description: "",
        buttonCTA: { text: "", link: "" },
        imageProduct: { src: "", alt: "" },
        backgroundImage: "",
      },
    },
  },
  edit: EditFlagshipProduct,
  save: () => null,
});

registerBlockType("theme/intro-disposition-1", {
  title: "Bloc de texte avec une disposition bento à 3 images",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        images: { img1: null, img2: null, img3: null },
        texts: { text1: "", text2: "" },
      },
    },
  },
  edit: EditIntroDisposition1,
  save: () => null,
});

registerBlockType("theme/intro-disposition-2", {
  title: "Bloc de texte avec une disposition bento à 4 images",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        images: { img1: null, img2: null, img3: null, img4: null },
        texts: { text1: "", text2: "" },
      },
    },
  },
  edit: EditIntroDisposition2,
  save: () => null,
});

registerBlockType("theme/simple-message-form", {
  title: "Formulaire de message pour contacter",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
      },
    },
  },
  edit: EditSimpleMessageForm,
  save: () => null,
});

registerBlockType("theme/simple-text", {
  title: "Texte simple",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        text: "",
      },
    },
  },
  edit: EditSimpleText,
  save: () => null,
});

registerBlockType("theme/simple-text-button", {
  title: "Bouton avec texte simple",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        text: "",
        buttonCTA: {
          text: "",
          link: "",
        },
      },
    },
  },
  edit: EditSimpleTextButton,
  save: () => null,
});

registerBlockType("theme/header-page-container", {
  title: "Conteneur d'en-tête de page enfant",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        image: {
          src: "",
          alt: "",
        },
      },
    },
  },
  edit: EditHeaderPageContainer,
  save: () => null,
});

registerBlockType("theme/local-reviews-list", {
  title: "Liste des avis du livre d'or",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
      },
    },
  },
  edit: EditLocalReviewsList,
  save: () => null,
});

registerBlockType("theme/product-list", {
  title: "Affichage de la liste des produits",
  category: "children-pages",
  attributes: {
    datas: {
      type: "object",
      default: {},
    },
  },
  edit: EditProductList,
  save: () => null,
});

registerBlockType("theme/gallery-grid", {
  title: "Grille de galerie photos",
  category: "front-page",
  attributes: {
    datas: {
      type: "object",
      default: {
        images: { img1: null, img2: null, img3: null, img4: null, img5: null },
      },
    },
  },
  edit: EditGalleryGrid,
  save: () => null,
});

registerBlockType("theme/front-page-hero", {
  title: "Hero de la page d'accueil",
  category: "front-page",
  attributes: {
    datas: {
      type: "object",
      default: {
        backgroundImage: "",
        images: {
          image1: { src: "", alt: "" },
          imageProduct: { src: "", alt: "" },
        },
        title: "",
        buttonCTA: { text: "", link: "" },
        buttonSecondaryCTA: { text: "", link: "" },
        hook: "",
      },
    },
  },
  edit: EditFrontPageHero,
  save: () => null,
});

registerBlockType("theme/local-reviews", {
  title: "Affichage des 3 derniers avis du livre d'or",
  category: "front-page",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        description: "",
        buttonCTA: { text: "", link: "" },
      },
    },
  },
  edit: EditLocalReviews,
  save: () => null,
});

registerBlockType("theme/google-reviews", {
  title: "Affichage des 3 derniers avis Google",
  category: "front-page",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        description: "",
        buttonCTA: { text: "", link: "" },
        iframe: "",
      },
    },
  },
  edit: EditGoogleReviews,
  save: () => null,
});

registerBlockType("theme/two-images-text", {
  title: "Texte avec deux images",
  category: "general",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        images: { img1: null, img2: null },
        backgroundImage: "",
        description: { paragraphs1: "", paragraphs2: "" },
        buttonCTA: { text: "", link: "" },
      },
    },
  },
  edit: EditTwoImagesText,
  save: () => null,
});

registerBlockType("theme/simple-image-text", {
  title: "Affichage des informations globales avec image",
  category: "general",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
        image: { src: "", alt: "" },
        backgroundImage: "",
      },
    },
  },
  edit: EditSimpleImageText,
  save: () => null,
});

registerBlockType("theme/reservation", {
  title: "Formulaire de réservation (physique et en ligne)",
  category: "general",
  attributes: {
    datas: {
      type: "object",
      default: {
        introduction: {
          title: "",
          description: "",
        },
        physicalReservation: {
          slogan: "",
        },
        backgroundImage: "",
        confirmationLink: "",
      },
    },
  },
  edit: EditReservation,
  save: () => null,
});

registerBlockType("theme/faq-list", {
  title: "Liste FAQ",
  category: "general",
  attributes: {
    datas: {
      type: "object",
      default: {
        title: "",
      },
    },
  },
  edit: EditFAQList,
  save: () => null,
});

registerBlockType("theme/flagship-products-module", {
  title: "Affichage des 3 produits phares",
  category: "general",
  attributes: {
    datas: {
      type: "object",
      default: {
        backgroundImage: "",
        image: { src: "", alt: "" },
        title: "",
        hook: "",
        buttonCTA: { text: "", link: "" },
      },
    },
  },
  edit: EditFlagshipProductsModule,
  save: () => null,
});