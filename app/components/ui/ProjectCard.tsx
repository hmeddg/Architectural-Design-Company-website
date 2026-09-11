import Link from "next/link";
import type { Project } from "@/app/data/projects";
import { Figure } from "./Figure";
import styles from "./project-card.module.css";

type ProjectCardProps = {
  project: Project;
  sizes: string;
  priority?: boolean;
};

/**
 * Project card — 660x242 image (2:48 / 2:49) under a 60px bottom scrim
 * (2:50 / 2:51) carrying the title (inset 20px), the meta line, and a
 * right-aligned link (inset 28px).
 *
 * The whole card is the link, so the target is the full card rather than the
 * small label. Href anchors into the projects index: the comp has no project
 * detail page, so there is no per-slug route to point at.
 */
export function ProjectCard({ project, sizes, priority = false }: ProjectCardProps) {
  return (
    <Link href={`/project#${project.slug}`} className={styles.card}>
      <Figure
        slot={project.media}
        sizes={sizes}
        stretch
        priority={priority}
        tone="dark"
        className={styles.figure}
      />
      <span className={styles.scrim} aria-hidden="true" />

      <span className={styles.caption}>
        <span className={styles.text}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.meta}>{project.meta}</span>
        </span>
        <span className={styles.link}>
          {project.linkLabel}
          <span className={styles.arrow} aria-hidden="true">
            &#8594;
          </span>
        </span>
      </span>
    </Link>
  );
}
