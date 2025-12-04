import { useBlockProps, MediaUpload } from "@wordpress/block-editor";
import { TextareaControl, Button } from "@wordpress/components";

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
const MAX_PARAGRAPH = 300;

export default function EditIntroDisposition1({ attributes, setAttributes }) {
  const datas = {
    images: attributes.datas?.images || { img1: null, img2: null, img3: null },
    texts: attributes.datas?.texts || { text1: "", text2: "" },
  };

  const updateDescription = (key, value) => {
    setAttributes({
      datas: { ...datas, texts: { ...datas.texts, [key]: value } },
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
      <h2 style={h2Styles}>
        Bloc de texte avec une disposition bento à 3 images
      </h2>

      {/* Champ Paragraphe 1 */}
      <TextareaControl
        label="Paragraphe 1"
        value={datas.texts.text1}
        onChange={(val) =>
          updateDescription("text1", val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.texts.text1.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Champ Paragraphe 2 */}
      <TextareaControl
        label="Paragraphe 2"
        value={datas.texts.text2}
        onChange={(val) =>
          updateDescription("text2", val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.texts.text2.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Upload images */}
      <div style={{ marginTop: "3rem" }}>
        <div>{renderImageUpload("img1", "Image 1")}</div>
        <div>{renderImageUpload("img2", "Image 2")}</div>
        <div>{renderImageUpload("img3", "Image 3")}</div>
      </div>
    </div>
  );
}
