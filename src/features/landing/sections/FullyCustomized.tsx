import Image from "next/image";
import Link from "next/link";

import styles from "./FullyCustomized.module.css";

export function FullyCustomized() {
  return (
    <section
      className={styles.section}
      aria-labelledby="fully-customized-heading"
    >
      <h2 className={styles.heading} id="fully-customized-heading">
        <span>Your Vision,</span>
        <span>Fully Customized</span>
      </h2>

      <div className={styles.details}>
        <p className={styles.description}>
          A versatile collection of blocks to help you design the canvas you envision.
          <br className={styles.desktopBreak} />
          {" "}
          Mix, match,
          <br className={styles.desktopBreak} />
          {" "}
          and customize every element to create stunning interface experiences —
          <br className={styles.desktopBreak} />
          {" "}
          no code required.
        </p>

        <Link className={styles.cta} href="/">
          <span>Explore All Blocks</span>
          <svg
            aria-hidden="true"
            className={styles.arrow}
            viewBox="0 0 12 12"
            width="12"
            height="12"
          >
            <path d="M2.5 6h6M6 2.5 9.5 6 6 9.5" />
          </svg>
        </Link>
      </div>

      <Image
        className={styles.artwork}
        src="/images/landing/customization/editor-illustration.png"
        alt="WebStudio editor showing a fashion website with floating block callouts"
        width={2640}
        height={1544}
        sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1100px) calc(100vw - 48px), 1320px"
        unoptimized
      />
    </section>
  );
}
