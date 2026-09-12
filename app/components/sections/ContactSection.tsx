import Link from "next/link";
import { contactSection } from "@/app/data/content";
import { contact } from "@/app/data/site";
import { Container } from "@/app/components/ui/Container";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { ContactForm } from "./ContactForm";
import styles from "./contact-section.module.css";

/**
 * 05 / CONTACT (Frame 6 / 47:71, 1344x672) over the full-bleed "Contact
 * Background" (87:2, 1440x800) — the dark band that closes the page.
 *
 * Two columns: copy 600 wide (H2 76:2 at 48px/2 lines, body 76:3, divider 76:4,
 * then the email/phone detail pairs at x=0 and x=296) and the form at x=744.
 */
type ContactSectionProps = {
  /**
   * The numbered eyebrow + its hairline. On by default for the home page, where
   * this is band 05 of the comp; off on the standalone /Contact route, where a
   * section index would be meaningless.
   */
  showLabel?: boolean;
  /**
   * Heading level. `h2` on the home page, where the hero owns the `h1`; `h1` on
   * the standalone /Contact route, which would otherwise have no top-level
   * heading at all.
   */
  headingAs?: "h1" | "h2";
};

export function ContactSection({
  showLabel = true,
  headingAs: Heading = "h2",
}: ContactSectionProps) {
  return (
    <section id="contact" className={styles.band} aria-labelledby="contact-heading">
      <Container className={styles.inner}>
        {showLabel ? (
          <div className={styles.head}>
            <Eyebrow tone="inverse">{contactSection.label}</Eyebrow>
          </div>
        ) : null}

        <div className={styles.row}>
          <div className={styles.copy}>
            <Heading id="contact-heading" className={styles.heading}>
              {contactSection.heading}
            </Heading>
            <p className={styles.body}>{contactSection.body}</p>

            <dl className={styles.details}>
              <div className={styles.detail}>
                <dt className={styles.detailLabel}>Email</dt>
                <dd className={styles.detailValue}>
                  <Link href={contact.emailHref} className={styles.detailLink}>
                    {contact.email}
                  </Link>
                </dd>
              </div>
              <div className={styles.detail}>
                <dt className={styles.detailLabel}>Phone</dt>
                <dd className={styles.detailValue}>
                  <Link href={contact.phoneHref} className={styles.detailLink}>
                    {contact.phone}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <div className={styles.formCol}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
