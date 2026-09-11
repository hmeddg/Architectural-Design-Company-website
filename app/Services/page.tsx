import type { Metadata } from "next";
import { principles } from "@/app/data/content";
import { Container } from "@/app/components/ui/Container";
import { PageIntro } from "@/app/components/ui/PageIntro";
import { PrincipleIcon } from "@/app/components/ui/PrincipleIcon";
import { Reveal } from "@/app/components/ui/Reveal";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interiors, masterplanning and delivery by ARCHIA Studio.",
};

/**
 * The Figma file defines no Services page, so this route is built from the
 * home page's own vocabulary: the four principle marks (2:31–2:42) plus the
 * disciplines implied by the studio statement. Replace the copy below once the
 * Services frame exists in the design.
 */
const disciplines = [
  {
    title: "Architecture",
    body: "Concept through to construction, for residential, cultural and hospitality projects.",
  },
  {
    title: "Interiors",
    body: "Interior architecture developed in the same hand as the building that holds it.",
  },
  {
    title: "Masterplanning",
    body: "Siting, massing and the relationships between volume, landscape and light.",
  },
  {
    title: "Delivery",
    body: "Detailing, tender support and site oversight through to completion.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Considered from the first line to the last detail."
        body="Four disciplines, one continuous hand."
      />

      <Container as="section" className={styles.section}>
        <ul className={styles.grid}>
          {disciplines.map((discipline, i) => (
            <Reveal as="li" key={discipline.title} className={styles.item} delay={i * 70}>
              <PrincipleIcon name={principles[i].icon} />
              <h2 className={styles.title}>{discipline.title}</h2>
              <p className={styles.body}>{discipline.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}
