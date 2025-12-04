import { useBlockProps } from "@wordpress/block-editor";
import { TextareaControl } from "@wordpress/components";

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

export default function EditSimpleText({ attributes, setAttributes }) {
  const datas = {
    text: attributes.datas?.text || "",
  };

  const updateDescription = (value) => {
    setAttributes({
      datas: { ...datas, text: value },
    });
  };

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Texte simple</h2>

      {/* Champ Paragraphe */}
      <TextareaControl
        label="Paragraphe"
        value={datas.text}
        onChange={(val) =>
          updateDescription(val.slice(0, MAX_PARAGRAPH))
        }
      />
      <small style={smallStyles}>
        {datas.text.length}/{MAX_PARAGRAPH} caractères
      </small>
    </div>
  );
}
