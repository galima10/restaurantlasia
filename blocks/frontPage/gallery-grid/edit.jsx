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

export default function EditGalleryGrid({ attributes, setAttributes }) {
  const datas = {
    images: attributes.datas?.images || {
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      img5: null,
    },
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
      <h2 style={h2Styles}>Grille de galerie photos</h2>

      {/* Upload images */}
      <div style={{ marginTop: "3rem" }}>
        <div>{renderImageUpload("img1", "Image 1")}</div>
        <div>{renderImageUpload("img2", "Image 2")}</div>
        <div>{renderImageUpload("img3", "Image 3")}</div>
        <div>{renderImageUpload("img4", "Image 4")}</div>
        <div>{renderImageUpload("img5", "Image 5")}</div>
      </div>
    </div>
  );
}
