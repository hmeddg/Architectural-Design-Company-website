import Link from "next/link";
import { featured } from "@/app/data/content";
import { Container } from "@/app/components/ui/Container";
import { Figure } from "@/app/components/ui/Figure";
import { Parallax } from "@/app/components/ui/Parallax";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import styles from "./featured-section.module.css";

/**
 * FEATURED PROJECT — the rule at y=1277 (37:11), the label (96:2), the
 * right-aligned link (7:7), and Frame 7 (96:3): a 1342x663 window onto a taller
 * 1342x894 image, so the crop is anchored to the top.
 *
 * Deviation: the comp leaves this 1342x663 photograph unlabelled. A caption row
 * (title + meta) is added beneath it — an unlabelled hero-scale image is poor
 * for both readers and search. Remove the .caption block to match the comp exactly.
 */
export function FeaturedSection() {
  return (
    <Container
      as="section"
      id="featured"
      className={styles.section}
      aria-labelledby="featured-label"
    >
      <SectionHeader label={featured.label} link={featured.link} />
      <h2 id="featured-label" className={styles.srHeading}>
        Featured project
      </h2>

      <Reveal className={styles.body} variant="veil">
        <Link href={featured.link.href} className={styles.mediaLink}>
          <Parallax strength={4} className={styles.parallax}>
            <Figure
              slot={featured.media}
              sizes="(min-width: 1440px) 1344px, 100vw"
              stretch
              objectPosition="center center"
              className={styles.figure}
            />
          </Parallax>
        </Link>

        <div className={styles.caption}>
          <h3 className={styles.title}>{featured.title}</h3>
          <p className={styles.meta}>{featured.meta}</p>
        </div>
      </Reveal>
    </Container>
  );
}
