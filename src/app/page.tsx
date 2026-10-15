import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LandingHero } from "@/features/landing/sections/LandingHero";
import { ExploreCreativity } from "@/features/landing/sections/ExploreCreativity";
import { FullyCustomized } from "@/features/landing/sections/FullyCustomized";
import { GlobalTemplates } from "@/features/landing/sections/GlobalTemplates";
import { GlobalVariables } from "@/features/landing/sections/GlobalVariables";
import { WebsiteShowcase } from "@/features/landing/sections/WebsiteShowcase";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page} aria-label="WebStudio landing page">
        <LandingHero />
        <ExploreCreativity />
        <FullyCustomized />
        <GlobalTemplates />
        <GlobalVariables />
        <WebsiteShowcase />
      </main>
      <SiteFooter />
    </>
  );
}
