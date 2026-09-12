import { projects, projectsLabel, projectsViewAll } from "@/app/data/projects";
import { Container } from "@/app/components/ui/Container";
import { ProjectCard } from "@/app/components/ui/ProjectCard";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import styles from "./projects-section.module.css";

/**
 * SECTION 02 — SELECTED PROJECTS (frame 2:44, 1440x352).
 * Two 660x242 cards 24px apart, under the label (2:46) and "View All" (2:47).
 */
export function ProjectsSection() {
  return (
    <Container
      as="section"
      id="projects"
      className={styles.section}
      aria-labelledby="projects-label"
    >
      <SectionHeader label={projectsLabel} link={projectsViewAll} />
      <h2 id="projects-label" className={styles.srHeading}>
        Selected projects
      </h2>

      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              sizes="(min-width: 1280px) 660px, (min-width: 768px) 48vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
