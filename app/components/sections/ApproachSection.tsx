import { approach, principles } from "@/app/data/content";
import { Container } from "@/app/components/ui/Container";
import { Figure } from "@/app/components/ui/Figure";
import { PrincipleIcon } from "@/app/components/ui/PrincipleIcon";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import styles from "./approach-section.module.css";

/**
 * SECTION 01 — OUR APPROACH (frame 2:25, 1440x300).
 *
 * A three-column row whose comp widths total the 1344 content column:
 * image 386 (Frame 3 / 1:5) · copy ~374 (H2 2:28, body 2:29) ·
 * four principle columns 518 (2:31–2:42), separated by the three 149px vertical
 * rules at x=1003 / 1130 / 1258 (30:3, 30:4, 30:6).
 */
export function ApproachSection() {
  return (
    <Container
      as="section"
      id="approach"
      className={styles.section}
      aria-labelledby="approach-heading"
    >
      <SectionHeader label={approach.label} />

      <div className={styles.row}>
        <Reveal className={styles.mediaCol} variant="lift">
          <Figure
            slot={approach.media}
            sizes="(min-width: 1280px) 386px, (min-width: 768px) 45vw, 100vw"
          />
        </Reveal>

        <Reveal className={styles.copyCol} delay={35}>
          <h2 id="approach-heading" className={styles.heading}>
            {approach.heading}
          </h2>
          <p className={styles.body}>{approach.body}</p>
        </Reveal>

        <Reveal className={styles.principlesCol} delay={70}>
          <ul className={styles.principles}>
            {principles.map((principle) => (
              <li key={principle.title} className={styles.principle}>
                <PrincipleIcon name={principle.icon} />
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleBody}>{principle.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Container>
  );
}
