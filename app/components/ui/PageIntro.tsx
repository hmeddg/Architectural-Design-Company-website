import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import styles from "./page-intro.module.css";

type PageIntroProps = {
  /** Numbered eyebrow. Omitted on the standalone routes — the numbering is a
   *  home-page device that reads as a section index, not a page title. */
  label?: string;
  title: string;
  body?: string;
  children?: ReactNode;
};

/**
 * Masthead for the secondary routes. The Figma file contains only the home
 * page, so these pages reuse the home page's type scale and numbered-label
 * convention rather than inventing a second visual language.
 */
export function PageIntro({ label, title, body, children }: PageIntroProps) {
  return (
    <Container as="section" className={styles.intro}>
      {label ? <Eyebrow>{label}</Eyebrow> : null}
      <h1 className={styles.title}>{title}</h1>
      {body ? <p className={styles.body}>{body}</p> : null}
      {children}
    </Container>
  );
}
