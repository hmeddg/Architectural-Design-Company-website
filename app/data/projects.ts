import type { MediaSlot } from "@/app/lib/media";

/**
 * SECTION 02 — SELECTED PROJECTS (frame 2:44).
 * Two 660x242 cards 24px apart (2:48 / 2:49), each with a 60px bottom scrim
 * (2:50 / 2:51) carrying a title, a meta line and a right-aligned link.
 */

export type Project = {
  slug: string;
  /** Project 0n Title (2:52 / 2:55) */
  title: string;
  /** Project 0n Meta (2:53 / 2:56) */
  meta: string;
  /** Project 0n Link (2:54 / 2:57) */
  linkLabel: string;
  media: MediaSlot;
};

export const projectsLabel = "02 / SELECTED PROJECTS";
export const projectsViewAll = { label: "VIEW ALL PROJECTS", href: "/project" };

/** Titles and meta lines are (copy) — the comp's text content was not
 *  retrievable. Card geometry is exact. */
export const projects: Project[] = [
  {
    slug: "jumeirah-courtyard-house",
    title: "Courtyard House",
    meta: "Jumeirah, Dubai · Residential · 2025",
    linkLabel: "VIEW",
    media: {
      figmaLayer: "Project 01 Image",
      src: "/ARCHIA_Project_02.jpg",
      expectedPath: "/ARCHIA_Project_02.jpg",
      alt: "Courtyard House — a two-storey stone villa at dusk, its glazing veiled by a vertical timber screen above a black reflecting pool",
      width: 660,
      height: 242,
    },
  },
  {
    slug: "al-quoz-arts-pavilion",
    title: "Arts Pavilion",
    meta: "Al Quoz, Dubai · Cultural · 2024",
    linkLabel: "VIEW",
    media: {
      figmaLayer: "Project 02 Image",
      src: "/ARCHIA_Project_01.jpg",
      expectedPath: "/ARCHIA_Project_01.jpg",
      alt: "Arts Pavilion — a lit stone loggia opening onto a lap pool and olive tree, with wooded hills beyond",
      width: 660,
      height: 242,
    },
  },
];
