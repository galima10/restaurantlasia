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
const MAX_TITLE = 50;

export default function EditLocalReviewsList({ attributes, setAttributes }) {
  const datas = {
    title: attributes.datas?.title || "",
  };

  const updateDatas = (value) => {
    setAttributes({
      datas: { ...datas, title: value },
    });
  };

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Liste des avis du livre d'or</h2>

      {/* Champ Titre */}
      <TextareaControl
        label="Titre"
        value={datas.title}
        onChange={(val) =>
          updateDatas(val.slice(0, MAX_TITLE))
        }
      />
      <small style={smallStyles}>
        {datas.title.length}/{MAX_TITLE} caractères
      </small>
    </div>
  );
}
