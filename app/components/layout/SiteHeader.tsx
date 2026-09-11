import Link from "next/link";
import { contact } from "@/app/data/site";
import { Container } from "@/app/components/ui/Container";
import { PhoneIcon } from "@/app/components/ui/PhoneIcon";
import { Wordmark } from "@/app/components/ui/Wordmark";
import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./site-header.module.css";

/**
 * HEADER — frame 2:3, 1440x88 with a 1px bottom border (2:4).
 * Wordmark at x=45, nav from x=200, phone right-aligned to x=1390.
 *
 * Made sticky (the comp has no scroll state, but the page is 4188px tall and
 * the band's resting appearance is unchanged).
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Wordmark size="header" className={styles.brand} />
        <PrimaryNav className={styles.nav} />
        <Link href={contact.phoneHref} className={styles.phone}>
          <PhoneIcon />
          {contact.phone}
        </Link>
        <MobileMenu />
      </Container>
    </header>
  );
}
