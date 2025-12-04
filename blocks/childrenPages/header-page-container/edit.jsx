import { useBlockProps, MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

// Styles
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

export default function EditHeaderPageContainer({ attributes, setAttributes }) {
  const datas = {
    image: attributes.datas?.image || { src: "", alt: "" },
  };

  const updateImage = (media) => {
    setAttributes({
      datas: {
        ...datas,
        image: { src: media.url, alt: media.alt || "" },
      },
    });
  };

  const renderImageUpload = (label) => (
    <MediaUpload
      onSelect={updateImage}
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

  return (
    <div {...useBlockProps()} style={blockStyles}>
      <h2 style={h2Styles}>Conteneur d'en-tête de page enfant</h2>

      {/* Upload image bannière */}
      <div style={{ marginTop: "3rem" }}>
        {renderImageUpload("Image bannière")}
      </div>
    </div>
  );
}
