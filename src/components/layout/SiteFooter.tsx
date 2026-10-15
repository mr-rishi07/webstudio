import Image from "next/image";

import styles from "./SiteFooter.module.css";

const navigationGroups = [
  {
    title: "PRODUCT",
    items: ["Architecture", "Protocol", "Governance", "Security"],
  },
  {
    title: "AGENCY",
    items: ["About", "Careers", "Blog"],
  },
  {
    title: "PRICING",
    items: ["Terms", "Privacy"],
  },
] as const;

const socialIcons = [
  { name: "X", src: "/images/shared/social-x.svg", width: 22, height: 22 },
  { name: "GitHub", src: "/images/shared/social-github.svg", width: 22, height: 22 },
  { name: "Discord", src: "/images/shared/social-discord.svg", width: 26, height: 24 },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            className={styles.wordmark}
            src="/images/shared/webstudio-wordmark-light.svg"
            alt="WebStudio"
            width={358}
            height={60}
            unoptimized
          />
          <p className={styles.description}>
            Advancing the protocol layer. Join our network for
            <br />
            {" "}technical updates and architecture proposals.
          </p>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          {navigationGroups.map((group) => (
            <section className={styles.navigationGroup} key={group.title} aria-labelledby={`footer-${group.title.toLowerCase()}`}>
              <h2 id={`footer-${group.title.toLowerCase()}`}>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span title="Destination pending approval">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <form className={styles.newsletter} aria-label="Newsletter signup">
          <label className={styles.visuallyHidden} htmlFor="footer-email">
            Email address
          </label>
          <input id="footer-email" name="email" type="email" placeholder="Enter email address" autoComplete="email" />
          {/* Integration is pending; this must not submit until a newsletter service is approved. */}
          <button type="button" aria-disabled="true" title="Newsletter integration pending">
            JOIN
          </button>
        </form>

        <div className={styles.divider} />

        <div className={styles.legalRow}>
          <p>© 2026 DEEP TECH INITIATIVE. ALL RIGHTS RESERVED.</p>
          <div className={styles.socials} aria-label="Social profiles">
            {socialIcons.map((social) => (
              <span className={styles.socialPlaceholder} title={`${social.name} profile destination pending`} key={social.name}>
                <Image src={social.src} alt={social.name} width={social.width} height={social.height} unoptimized />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
