import { useBlockProps, MediaUpload, URLInput } from "@wordpress/block-editor";
import { TextControl, TextareaControl, Button } from "@wordpress/components";

// Styles
const smallStyles = {
  fontSize: ".8rem",
  fontStyle: "italic",
  opacity: ".25",
  fontWeight: "600",
  marginTop: "-.5rem",
  display: "block",
  marginBottom: "1rem",
};

const previewImgStyles = {
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const mediaUploadStyles = {
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
};

const h2Styles = {
  marginBottom: "1rem",
  fontSize: "1.5rem",
  fontWeight: "700",
};

const blockStyles = {
  padding: "1rem",
  border: ".15rem solid #cb95bcff",
};

// Limites de caractères
const MAX_TITLE = 70;
const MAX_HOOK = 100;

export default function EditFrontPageHero({ attributes, setAttributes }) {
  const datas = {
    backgroundImage: attributes.datas?.backgroundImage || "",
    images: {
      image1: attributes.datas?.images?.image1 || { src: "", alt: "" },
      imageProduct: attributes.datas?.images?.imageProduct || {
        src: "",
        alt: "",
      },
    },
    title: attributes.datas?.title || "",
    buttonCTA: {
      text: attributes.datas?.buttonCTA?.text || "",
      link: attributes.datas?.buttonCTA?.link || "",
    },
    buttonSecondaryCTA: {
      text: attributes.datas?.buttonSecondaryCTA?.text || "",
      link: attributes.datas?.buttonSecondaryCTA?.link || "",
    },
    hook: attributes.datas?.hook || "",
  };

  const updateDatas = (key, value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        [key]: value,
      },
    });
  };

  const updateHook = (value) => {
    setAttributes({
      datas: { ...datas, hook: value },
    });
  };

  const updateCTA = (key, value) => {
    setAttributes({
      datas: {
        ...datas,
        buttonCTA: {
          ...(datas.buttonCTA || {}),
          [key]: value,
        },
      },
    });
  };

  const updateSecondaryCTA = (key, value) => {
    setAttributes({
      datas: {
        ...datas,
        buttonSecondaryCTA: {
          ...(datas.buttonSecondaryCTA || {}),
          [key]: value,
        },
      },
    });
  };

  const updateImage = (imgKey, media) => {
    setAttributes({
      datas: {
        ...datas,
        images: {
          ...datas.images,
          [imgKey]: { src: media.url, alt: media.alt || "" },
        },
      },
    });
  };

  const updateBackgroundImage = (media) => {
    setAttributes({
      datas: {
        ...datas,
        backgroundImage: media.url,
      },
    });
  };

  const renderImageUpload = (imgKey, label) => (
    <MediaUpload
      onSelect={(media) => updateImage(imgKey, media)}
      allowedTypes={["image"]}
      value={datas.images[imgKey]?.src || ""}
      render={({ open }) => (
        <div style={mediaUploadStyles}>
          <Button onClick={open} isSecondary>
            {label}
          </Button>
          {datas.images[imgKey]?.src && (
            <img
              src={datas.images[imgKey]?.src}
              alt="Preview"
              style={previewImgStyles}
            />
          )}
        </div>
      )}
    />
  );

  const renderBackgroundImageUpload = (label) => (
    <MediaUpload
      onSelect={updateBackgroundImage}
      allowedTypes={["image"]}
      value={datas.backgroundImage || ""}
      render={({ open }) => (
        <div style={mediaUploadStyles}>
          <Button onClick={open} isSecondary>
            {label}
          </Button>
          {datas.backgroundImage && (
            <img
              src={datas.backgroundImage}
              alt="Preview"
              style={previewImgStyles}
            />
          )}
        </div>
      )}
    />
  );

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Hero de la page d'accueil</h2>

      {/* Champ Titre */}
      <TextControl
        label="Titre"
        value={datas.title}
        onChange={(val) => updateDatas("title", val.slice(0, MAX_TITLE))}
      />
      <small style={smallStyles}>
        {datas.title.length}/{MAX_TITLE} caractères
      </small>

      {/* Champ Phrase d'accroche */}
      <TextareaControl
        label="Phrase d'accroche"
        value={datas.hook}
        onChange={(val) => updateHook(val.slice(0, MAX_HOOK))}
      />
      <small style={smallStyles}>
        {datas.hook.length}/{MAX_HOOK} caractères
      </small>

      {/* Champ Bouton CTA */}
      <div style={{ marginTop: "2rem" }}>
        <TextControl
          label="Texte du bouton CTA"
          value={datas.buttonCTA?.text || ""}
          onChange={(val) => updateCTA("text", val)}
        />

        <div style={{ marginTop: "1rem" }}>
          <strong>Lien du bouton CTA</strong>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <URLInput
              value={datas.buttonCTA?.link || ""}
              onChange={(url) => updateCTA("link", url)}
              disableSuggestions={false}
            />
          </div>
        </div>
      </div>

      {/* Champ Bouton CTA secondaire */}
      <div style={{ marginTop: "2rem" }}>
        <TextControl
          label="Texte du bouton CTA secondaire"
          value={datas.buttonSecondaryCTA?.text || ""}
          onChange={(val) => updateSecondaryCTA("text", val)}
        />

        <div style={{ marginTop: "1rem" }}>
          <strong>Lien du bouton CTA secondaire</strong>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "6px",
            }}
          >
            <URLInput
              value={datas.buttonSecondaryCTA?.link || ""}
              onChange={(url) => updateSecondaryCTA("link", url)}
              disableSuggestions={false}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        {/* Upload images */}
        <div>
          <div>{renderImageUpload("image1", "Image 1")}</div>
          <div>{renderImageUpload("imageProduct", "Image produit")}</div>
        </div>
        
        {/* Upload image de fond */}
        <div style={{ marginTop: "1rem" }}>
          {renderBackgroundImageUpload("Image de fond")}
        </div>
      </div>
    </div>
  );
}
