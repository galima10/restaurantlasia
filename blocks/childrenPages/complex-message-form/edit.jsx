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

export default function EditComplexMessageForm({ attributes, setAttributes }) {
  const datas = {
    description: attributes.datas?.description || {
      paragraph1: "",
      paragraph2: "",
    },
    backgroundImage: attributes.datas?.backgroundImage || "",
  };

  const updateDescription = (key, value) => {
    setAttributes({
      datas: { ...datas, description: { ...datas.description, [key]: value } },
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
      <h2 style={h2Styles}>
        Formulaire de message pour le livre d'or avec paragraphes
      </h2>

      {/* Champ Paragraphe 1 */}
      <TextareaControl
        label="Paragraphe 1"
        value={datas.description.paragraph1}
        onChange={(val) =>
          updateDescription("paragraph1", val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.description.paragraph1.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Champ Paragraphe 2 */}
      <TextareaControl
        label="Paragraphe 2"
        value={datas.description.paragraph2}
        onChange={(val) =>
          updateDescription("paragraph2", val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.description.paragraph2.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Upload image de fond */}
      <div style={{ marginTop: "3rem" }}>
        {renderBackgroundImageUpload("Image de fond")}
      </div>
    </div>
  );
}
