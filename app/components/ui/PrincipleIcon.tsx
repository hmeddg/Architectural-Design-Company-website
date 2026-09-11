import styles from "./principle-icon.module.css";

export type PrincipleIconName = "clarity" | "proportion" | "materiality" | "permanence";

/**
 * The four "Principle Icon" marks (2:31 / 2:34 / 2:37 / 2:40).
 *
 * In the comp these are *text* layers boxed at 40x30.8 — not exported image
 * assets — so their glyphs were never retrievable and are invented either way.
 * Drawn as SVG rather than Unicode shape characters so they render identically
 * everywhere, at the comp's exact box.
 */
const paths: Record<PrincipleIconName, React.ReactNode> = {
  // Diamond — legible form.
  clarity: <path d="M20 4 34 15.4 20 26.8 6 15.4Z" />,
  // Nested squares — measured volume.
  proportion: (
    <>
      <rect x="7" y="3.4" width="26" height="24" />
      <rect x="14" y="9.4" width="12" height="12" />
    </>
  ),
  // Stacked planes — honest surface.
  materiality: (
    <>
      <path d="M20 3.4 34 10.2 20 17 6 10.2Z" />
      <path d="M6 17.2 20 24 34 17.2" />
    </>
  ),
  // Circle in a square — built to outlast.
  permanence: (
    <>
      <circle cx="20" cy="15.4" r="11" />
      <circle cx="20" cy="15.4" r="4" />
    </>
  ),
};

export function PrincipleIcon({ name }: { name: PrincipleIconName }) {
  return (
    <svg
      className={styles.icon}
      width="40"
      height="31"
      viewBox="0 0 40 31"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
