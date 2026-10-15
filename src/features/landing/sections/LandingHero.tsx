import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import babyHush from "./hero-assets/babyhush.png";
import inflatable from "./hero-assets/inflatable-illustrations.png";
import neoCultural from "./hero-assets/neocultural-couture.png";
import quietTechnology from "./hero-assets/quiet-technology.png";
import sliceDebit from "./hero-assets/slice-debit.png";

import styles from "./LandingHero.module.css";

const inter = localFont({
  src: "./hero-fonts/Inter-Variable.ttf",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-hero-inter",
});

const heroCards = [
  {
    className: styles.quietTechnology,
    src: quietTechnology,
    alt: "Quiet Technology website preview",
    width: 501,
    height: 622,
  },
  {
    className: styles.sliceDebit,
    src: sliceDebit,
    alt: "Slice Debit Card website preview",
    width: 501,
    height: 622,
  },
  {
    className: styles.babyHush,
    src: babyHush,
    alt: "BabyHush mobile interfaces website preview",
    width: 501,
    height: 622,
  },
  {
    className: styles.neoCultural,
    src: neoCultural,
    alt: "NeoCultural Couture website preview",
    width: 501,
    height: 621,
  },
  {
    className: styles.inflatable,
    src: inflatable,
    alt: "Inflatable Illustrations website preview",
    width: 501,
    height: 622,
  },
] as const;

export function LandingHero() {
  return (
    <section
      className={`${styles.hero} ${inter.variable}`}
      aria-labelledby="landing-hero-heading"
    >
      <div className={styles.copy}>
        <h1 className={styles.heading} id="landing-hero-heading">
          <span>Make Collaboration Part of Your</span>{" "}
          <span>Creative Workflow</span>
        </h1>

        <p className={styles.description}>
          We engineer high-end web experiences that transcend traditional
          <br className={styles.desktopBreak} />
          {" "}
          boundaries. Combining abstract geometry with precise custom
          <br className={styles.desktopBreak} />
          {" "}
          code to build immersive brand environments.
        </p>

        <Link className={styles.cta} href="/">
          <span>GET STARTED</span>
        </Link>
      </div>

      <div className={styles.cards} aria-label="Selected website previews">
        {heroCards.map((card) => (
          <Image
            className={`${styles.card} ${card.className}`}
            src={card.src}
            alt={card.alt}
            width={card.width}
            height={card.height}
            sizes="(max-width: 767px) 250px, 21.528vw"
            priority
            unoptimized
            key={card.alt}
          />
        ))}
      </div>
    </section>
  );
}
