import Link from "next/link";
import localFont from "next/font/local";

import styles from "./SiteHeader.module.css";

const sora = localFont({
  src: "./fonts/Sora-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
});

const primaryLinks = [
  "PRODUCT",
  "AGENCY",
  "ENTER PRISING",
  "PRICING",
  "WEB BUILDER",
] as const;

// Final routes are pending approval. The home route keeps every item safe and inert
// from a product-flow perspective while retaining semantic, keyboard-accessible links.
const temporaryHref = "/";

export function SiteHeader() {
  return (
    <header className={`${styles.header} ${sora.className}`}>
      <div className={styles.inner}>
        <Link className={styles.brand} href={temporaryHref} aria-label="WebStudio home">
          <span className={styles.wordmark}>web studio</span>
        </Link>

        <nav className={styles.primaryNavigation} aria-label="Primary navigation">
          {primaryLinks.map((label) => (
            <Link className={styles.navigationLink} href={temporaryHref} key={label}>
              {label}
            </Link>
          ))}
        </nav>

        <nav className={styles.accountNavigation} aria-label="Account navigation">
          <Link className={styles.loginLink} href={temporaryHref}>
            <span>Login</span>
          </Link>
          <div className={styles.getStartedSlot}>
            <Link className={styles.getStartedLink} href={temporaryHref}>
              <span>GET STARTED</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
