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
const MAX_TITLE = 50;
const MAX_PARAGRAPH = 300;

export default function EditCTABlock({ attributes, setAttributes }) {
  const datas = {
    title: attributes.datas?.title || "",
    description: attributes.datas?.description || "",
    buttonCTA: attributes.datas?.buttonCTA || { text: "", link: "" },
    images: attributes.datas?.images || { img1: null, img2: null, img3: null },
  };

  const updateDatas = (key, value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        [key]: value,
      },
    });
  };

  const updateDescription = (value) => {
    setAttributes({
      datas: { ...datas, description: value },
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

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Bloc CTA</h2>

      {/* Champ Titre */}
      <TextControl
        label="Titre"
        value={datas.title}
        onChange={(val) => updateDatas("title", val.slice(0, MAX_TITLE))}
      />
      <small style={smallStyles}>
        {datas.title.length}/{MAX_TITLE} caractères
      </small>

      {/* Champ Paragraphe */}
      <TextareaControl
        label="Paragraphe"
        value={datas.description}
        onChange={(val) => updateDescription(val.slice(0, MAX_PARAGRAPH))}
      />
      <small style={smallStyles}>
        {datas.description.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Champ Bouton CTA */}
      <div>
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

      {/* Upload images */}
      <div style={{ marginTop: "3rem" }}>
        <div>{renderImageUpload("img1", "Image 1")}</div>
        <div>{renderImageUpload("img2", "Image 2")}</div>
        <div>{renderImageUpload("img3", "Image 3")}</div>
      </div>
    </div>
  );
}
