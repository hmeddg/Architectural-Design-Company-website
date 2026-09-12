import type { Metadata } from "next";
import { projects } from "@/app/data/projects";
import { Container } from "@/app/components/ui/Container";
import { PageIntro } from "@/app/components/ui/PageIntro";
import { ProjectCard } from "@/app/components/ui/ProjectCard";
import { Reveal } from "@/app/components/ui/Reveal";
import styles from "./project.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected residential, cultural and hospitality projects by ARCHIA Studio.",
};

/**
 * Projects index. The home page's cards link here with a #slug fragment, so each
 * entry carries a matching id as its scroll target.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        title="Each project is a unique architectural statement."
        body="Responding to its context, purpose and identity."
      />

      <Container as="section" className={styles.section}>
        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} id={project.slug} delay={i * 45}>
              <ProjectCard
                project={project}
                sizes="(min-width: 1280px) 660px, (min-width: 768px) 48vw, 100vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}
