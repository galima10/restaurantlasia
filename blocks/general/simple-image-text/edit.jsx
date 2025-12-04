import { useBlockProps, MediaUpload } from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";

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

export default function EditSimpleImageText({ attributes, setAttributes }) {
  const datas = {
    title: attributes.datas?.title || "",
    image: attributes.datas?.image || { src: "", alt: "" },
    backgroundImage: attributes.datas?.backgroundImage || "",
  };

  const updateDatas = (key, value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        [key]: value,
      },
    });
  };

  const updateImage = (media) => {
    setAttributes({
      datas: {
        ...datas,
        image: { src: media.url, alt: media.alt || "" },
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

  const renderImageUpload = (label) => (
    <MediaUpload
      onSelect={(media) => updateImage(media)}
      allowedTypes={["image"]}
      value={datas.image?.src || ""}
      render={({ open }) => (
        <div style={mediaUploadStyles}>
          <Button onClick={open} isSecondary>
            {label}
          </Button>
          {datas.image?.src && (
            <img
              src={datas.image?.src}
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
      <h2 style={h2Styles}>Affichage des informations globales avec image</h2>

      {/* Champ Titre */}
      <TextControl
        label="Titre"
        value={datas.title}
        onChange={(val) => updateDatas("title", val.slice(0, MAX_TITLE))}
      />
      <small style={smallStyles}>
        {datas.title.length}/{MAX_TITLE} caractères
      </small>

      <div style={{ marginTop: "3rem" }}>
        {/* Upload image */}
        <div>{renderImageUpload("Image")}</div>
        
        {/* Upload image de fond */}
        <div style={{ marginTop: "1rem" }}>
          {renderBackgroundImageUpload("Image de fond")}
        </div>
      </div>
    </div>
  );
}
