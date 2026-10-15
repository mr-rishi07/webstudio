import Image from "next/image";

import styles from "./WebsiteShowcase.module.css";

export function WebsiteShowcase() {
  return (
    <section className={styles.section} aria-labelledby="website-showcase-heading">
      <h2 className={styles.heading} id="website-showcase-heading">
        Build with web studio
      </h2>

      <Image
        className={styles.mosaic}
        src="/images/landing/showcase/website-mosaic.png"
        alt="A mosaic of websites created with WebStudio"
        width={2880}
        height={988}
        sizes="100vw"
        unoptimized
      />
    </section>
  );
}
