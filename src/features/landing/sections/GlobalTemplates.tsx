import Image from "next/image";
import Link from "next/link";

import styles from "./GlobalTemplates.module.css";

export function GlobalTemplates() {
  return (
    <section className={styles.section} aria-labelledby="global-templates-heading">
      <svg
        aria-hidden="true"
        className={styles.decoration}
        preserveAspectRatio="none"
        viewBox="0 0 1440 110"
      >
        <path d="M223 0h829c-116 10-226 11-324 25-78 28-153 60-215 75-55 16-110 4-141 0-57-11-92-37-105-50-23-25-37-40-44-50Z" />
      </svg>

      <div className={styles.introduction}>
        <h2 className={styles.heading} id="global-templates-heading">
          <span>The smarter way to build digital</span>
          <span>experiences</span>
        </h2>

        <div className={styles.details}>
          <p className={styles.description}>
            Enjoy global control with customizable, dynamic
            <br className={styles.desktopBreak} />
            {" "}
            website templates
          </p>

          <Link className={styles.cta} href="/">
            Learn More
          </Link>
        </div>
      </div>

      <Image
        className={styles.artwork}
        src="/images/landing/global-control/templates-illustration.png"
        alt="Global templates interface with template cards, settings dialogs, and jewelry website previews"
        width={2680}
        height={1570}
        sizes="(max-width: 820px) calc(100vw - 24px), (max-width: 1100px) calc(100vw - 48px), (max-width: 1439px) calc(100vw - 100px), 1340px"
        unoptimized
      />
    </section>
  );
}
