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
const MAX_SLOGAN = 100;
const MAX_PARAGRAPH = 300;

export default function EditReservation({ attributes, setAttributes }) {
  const datas = {
    introduction: attributes.datas?.introduction || {
      title: "",
      description: "",
    },
    physicalReservation: attributes.datas?.physicalReservation || {
      slogan: "",
    },
    backgroundImage: attributes.datas?.backgroundImage || "",
    confirmationLink: attributes.datas?.confirmationLink || "",
  };

  const updateIntroductionTitle = (value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        introduction: {
          ...(attributes.datas?.introduction || {}),
          title: value,
        },
      },
    });
  };

  const updateIntroductionDescription = (value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        introduction: {
          ...(attributes.datas?.introduction || {}),
          description: value,
        },
      },
    });
  };

  const updateSlogan = (value) => {
    setAttributes({
      datas: { ...datas, physicalReservation: { slogan: value } },
      ...datas,
      physicalReservation: {
        ...(datas.introduction || {}),
        slogan: value,
      },
    });
  };

  const updateConfirmationLink = (value) => {
    setAttributes({
      datas: { ...datas, confirmationLink: value },
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
      <h2 style={h2Styles}>Formulaire de réservation (physique et en ligne)</h2>
      {/* Champ Titre */}
      <TextControl
        label="Titre"
        value={datas.introduction.title}
        onChange={(val) => updateIntroductionTitle(val.slice(0, MAX_TITLE))}
      />
      <small style={smallStyles}>
        {datas.introduction.title.length}/{MAX_TITLE} caractères
      </small>

      {/* Champ Paragraphe */}
      <TextareaControl
        label="Paragraphe"
        value={datas.introduction.description}
        onChange={(val) =>
          updateIntroductionDescription(val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.introduction.description.length}/{MAX_PARAGRAPH} caractères
      </small>

      {/* Champ Slogan réservation physique */}
      <TextareaControl
        label="Slogan réservation physique"
        value={datas.physicalReservation.slogan}
        onChange={(val) => updateSlogan(val.slice(0, MAX_SLOGAN))}
      />
      <small style={smallStyles}>
        {datas.physicalReservation.slogan.length}/{MAX_SLOGAN} caractères
      </small>

      <div style={{ marginTop: "1rem" }}>
        <strong>
          Lien du bouton Valider (pour amener vers la page de confirmation)
        </strong>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <URLInput
            value={datas.confirmationLink || ""}
            onChange={(url) => updateConfirmationLink(url)}
            disableSuggestions={false}
          />
        </div>
      </div>

      {/* Upload image de fond */}
      <div style={{ marginTop: "3rem" }}>
        {renderBackgroundImageUpload("Image de fond")}
      </div>
    </div>
  );
}
