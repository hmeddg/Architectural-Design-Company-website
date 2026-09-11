import Link from "next/link";
import { footer } from "@/app/data/content";
import { contact } from "@/app/data/site";
import { Container } from "@/app/components/ui/Container";
import { Figure } from "@/app/components/ui/Figure";
import { SocialIcons } from "@/app/components/ui/SocialIcons";
import { Wordmark } from "@/app/components/ui/Wordmark";
import styles from "./site-footer.module.css";

/**
 * FOOTER — frame 87:3, 1440x500, dark.
 *
 * Four columns from the comp: the brand block at x=48 (logo 87:4, sub 87:5,
 * statement 87:6 at 420 wide, credentials 87:7), contact at x=540, studio at
 * x=790, and the 383x237 image (Frame 8 / 99:5) at x=721. Beneath: socials
 * (103:23) and the copyright row (106:29).
 *
 * The comp's "copywrite logo 1" (45x25) could not be exported, so the copyright
 * line carries a © glyph instead.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Wordmark size="footer" tone="inverse" />
            <p className={styles.statement}>{footer.statement}</p>
            <p className={styles.credentials}>{footer.credentials}</p>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>{footer.contactLabel}</p>
            <ul className={styles.list}>
              <li>
                <Link href={contact.emailHref} className={styles.link}>
                  {contact.email}
                </Link>
              </li>
              <li>
                <Link href={contact.phoneHref} className={styles.link}>
                  {contact.phone}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <p className={styles.columnLabel}>{footer.studioLabel}</p>
            <address className={styles.address}>
              {contact.address.map((line) => (
                <span key={line} className={styles.addressLine}>
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className={styles.mediaCol}>
            <Figure
              slot={footer.media}
              sizes="(min-width: 1280px) 383px, (min-width: 768px) 40vw, 100vw"
              tone="dark"
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <SocialIcons />
          <p className={styles.copyright}>
            <span aria-hidden="true">&copy;</span> {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
