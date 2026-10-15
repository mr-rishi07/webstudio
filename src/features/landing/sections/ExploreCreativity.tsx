import Image from "next/image";
import Link from "next/link";

import styles from "./ExploreCreativity.module.css";

export function ExploreCreativity() {
  return (
    <section className={styles.section} aria-labelledby="explore-creativity-heading">
      <div className={styles.copy}>
        <h2 className={styles.heading} id="explore-creativity-heading">
          <span>Explore creativity. Share your</span>
          <span>vision.</span>
        </h2>

        <p className={styles.description}>
          Build your entire web presence, visually.
          <br className={styles.desktopBreak} />
          {" "}
          Build and publish pages with Webprofessional visual editor,
          <br className={styles.desktopBreak} />
          {" "}
          no code required. Govern brand consistency across your
          <br className={styles.desktopBreak} />
          {" "}
          site with one centralized design system created manually or
          <br className={styles.desktopBreak} />
          {" "}
          with AI.
        </p>
      </div>

      <Link className={styles.cta} href="/">
        Book demo
      </Link>

      <Image
        className={styles.artwork}
        src="/images/landing/creativity/perspective-showcase.png"
        alt="Perspective arrangement of website designs created with WebStudio"
        width={2020}
        height={752}
        sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 96px), 1010px"
        unoptimized
      />
    </section>
  );
}
