import { about } from "@/app/data/content";
import { Container } from "@/app/components/ui/Container";
import { Figure } from "@/app/components/ui/Figure";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { Statement } from "@/app/components/ui/Statement";
import styles from "./about-section.module.css";

/**
 * 04 / ABOUT US — Frame 5 (1:20, 1344x824).
 *
 * The drawings are a washed-out backdrop and the statement sits on top of them.
 * That is what the comp's geometry always described — `draw4 1` (x=−31…348)
 * overlaps the text box (x=195…1150), and the four-image row along the bottom
 * runs under it — but with no screenshot available it read as an overlap to
 * avoid rather than the intent. It is the intent: the drawings are faded far
 * enough back that the copy stays legible over them.
 *
 * The whole backdrop is decorative and hidden from assistive tech; the
 * statement is the content.
 *
 * Bottom row widths total exactly the 1344 content column (546/236/305/257),
 * bottom-aligned, so `align-items: end` reproduces the comp.
 */
export function AboutSection() {
  return (
    <Container
      as="section"
      id="about"
      className={styles.section}
      aria-labelledby="about-label"
    >
      <SectionHeader label={about.label} />
      <h2 id="about-label" className={styles.srHeading}>
        About the studio
      </h2>

      <div className={styles.stage}>
        <div className={styles.backdrop} aria-hidden="true">
          <div className={styles.portraitSlot}>
            <Figure
              slot={about.portrait}
              sizes="(min-width: 1024px) 26vw, 60vw"
              className={styles.drawing}
            />
          </div>

          <ul className={styles.gallery}>
            {about.gallery.map((slot) => (
              <li key={slot.figmaLayer} className={styles.galleryItem}>
                <Figure
                  slot={slot}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={styles.drawing}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.copy}>
          <Statement blocks={about.statement} />
        </div>
      </div>
    </Container>
  );
}
