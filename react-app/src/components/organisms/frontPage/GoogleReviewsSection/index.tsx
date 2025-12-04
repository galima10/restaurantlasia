import styles from "./GoogleReviewsSection.module.scss";

import AppButton from "@components/atoms/AppButton";
import ReviewCard from "@components/molecules/ReviewCard";

interface GoogleReviewsSectionProps {
  datas?: {
    title?: string;
    description?: string;
    buttonCTA?: {
      link?: string;
      text?: string;
    };
    iframe?: string;
  };
}

export default function GoogleReviewsSection({
  datas,
}: GoogleReviewsSectionProps) {
  return (
    <section className={styles.googleReviewsSection}>
      <hgroup>
        <h2>{datas?.title || "Titre de la section"}</h2>
        <p>{datas?.description || "Description de la section"}</p>
      </hgroup>
      {datas?.iframe ? (
        <div
          className={styles.iframeWrapper}
          dangerouslySetInnerHTML={{ __html: datas.iframe }}
        />
      ) : (
        <p className={styles.noReviews}>Aucune carte Google Maps fournie.</p>
      )}
      <AppButton
        className={styles.cta}
        link={datas?.buttonCTA?.link || "/"}
        text={datas?.buttonCTA?.text || "Bouton CTA externe"}
        type="primary"
        blank={true}
      />
    </section>
  );
}
