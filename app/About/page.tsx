import type { Metadata } from "next";
import { about } from "@/app/data/content";
import { Container } from "@/app/components/ui/Container";
import { PageIntro } from "@/app/components/ui/PageIntro";
import { Statement } from "@/app/components/ui/Statement";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: about.statement[0].lines[0],
};

/**
 * The Figma file contains only the home page, so this route reuses the studio
 * statement (layer 41:3 — verbatim comp copy) on the shared page scale.
 */
export default function AboutPage() {
  return (
    <>
      <PageIntro
        title="Luxury through simplicity."
        body="Nothing is excessive. Nothing is accidental."
      />

      <Container as="section" className={styles.statement}>
        <Statement blocks={about.statement} className={styles.copy} />
      </Container>
    </>
  );
}
