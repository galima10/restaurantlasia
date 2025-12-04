import { useBlockProps } from "@wordpress/block-editor";

// Styles
const h2Styles = {
  marginBottom: "1rem",
  fontSize: "1.5rem",
  fontWeight: "700",
};

const blockStyles = {
  padding: "1rem",
  border: ".15rem solid #cb95bcff",
};

export default function EditProductList({ attributes, setAttributes }) {
  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Affichage de la liste des produits</h2>
    </div>
  );
}
