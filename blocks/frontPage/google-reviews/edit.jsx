import { useBlockProps, URLInput } from "@wordpress/block-editor";
import { TextControl, TextareaControl } from "@wordpress/components";

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

export default function EditLocalReviews({ attributes, setAttributes }) {
  const datas = {
    title: attributes.datas?.title || "",
    description: attributes.datas?.description || "",
    buttonCTA: {
      text: attributes.datas?.buttonCTA?.text || "",
      link: attributes.datas?.buttonCTA?.link || "",
    },
    iframe: attributes.datas?.iframe || "",
  };

  const updateDatas = (key, value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        [key]: value,
      },
    });
  };

  const updateIframe = (value) => {
    setAttributes({
      datas: { ...datas, iframe: value },
    });
  }

  const updateDescription = (value) => {
    setAttributes({
      datas: { ...datas, description: value },
    });
  };

  const updateCTA = (key, value) => {
    setAttributes({
      datas: {
        ...(attributes.datas || {}),
        buttonCTA: {
          ...(attributes.datas?.buttonCTA || {}),
          [key]: value,
        },
      },
    });
  };

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Affichage des 3 derniers avis Google</h2>

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

      {/* Champ Iframe */}
      <TextareaControl
        label="Iframe"
        value={datas.iframe}
        onChange={(val) => updateIframe(val)}
      />

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
    </div>
  );
}
