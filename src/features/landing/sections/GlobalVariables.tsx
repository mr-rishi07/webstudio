import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import styles from "./GlobalVariables.module.css";

const inter = localFont({
  src: "./hero-fonts/Inter-Variable.ttf",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export function GlobalVariables() {
  return (
    <section className={`${inter.className} ${styles.section}`} aria-labelledby="global-variables-heading">
      <div className={styles.card}>
        <div className={styles.introduction}>
          <h2 className={styles.heading} id="global-variables-heading">
            Assign and manage global variables across your website
          </h2>

          <p className={styles.description}>
            Generate and define global colors, numbers, images, and more for design consistency and speed like never before.
          </p>

          <nav className={styles.actions} aria-label="Global variables actions">
            <Link className={styles.learnMore} href="/">
              Learn More
            </Link>
            <Link className={styles.variableGenerator} href="/">
              Variable Generator
            </Link>
          </nav>
        </div>

        <Image
          className={styles.artwork}
          src="/images/landing/global-control/variables-illustration.png"
          alt="Global variables interface with number and color controls, filters, and variable generator examples"
          width={2470}
          height={1210}
          sizes="(max-width: 1100px) calc(100vw - 80px), (max-width: 1439px) calc(100vw - 110px), 1235px"
          unoptimized
        />
      </div>
    </section>
  );
}
