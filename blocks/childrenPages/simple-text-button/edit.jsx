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
const MAX_PARAGRAPH = 300;

export default function EditSimpleTextButton({ attributes, setAttributes }) {
  const datas = {
    text: attributes.datas?.text || "",
    buttonCTA: attributes.datas?.buttonCTA || { text: "", link: "" },
  };

  const updateDescription = (value) => {
    setAttributes({
      datas: { ...datas, text: value },
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

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Bouton avec texte simple</h2>

      {/* Champ Paragraphe */}
      <TextareaControl
        label="Paragraphe"
        value={datas.text}
        onChange={(val) => updateDescription(val.slice(0, MAX_PARAGRAPH))}
      />
      <small style={smallStyles}>
        {datas.text.length}/{MAX_PARAGRAPH} caractères
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
    </div>
  );
}
