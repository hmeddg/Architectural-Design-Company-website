import { cx } from "@/app/lib/cx";
import { ArrowLink } from "./ArrowLink";
import { Eyebrow } from "./Eyebrow";
import styles from "./section-header.module.css";

type SectionHeaderProps = {
  label: string;
  /** Right-aligned link, e.g. "View All" (2:47) or "View Project" (7:7). */
  link?: { label: string; href: string };
  tone?: "light" | "inverse";
  /** Some bands (SECTION 01, 02, 04, 05) open with a 1344px hairline. */
  rule?: boolean;
  className?: string;
};

/**
 * The masthead every band shares: a full-width hairline, then a row with the
 * numbered label on the left and an optional link on the right. In the comp the
 * label sits ~22px below the rule (e.g. 2:26 at y=28, 2:27 at y=50).
 */
export function SectionHeader({
  label,
  link,
  tone = "light",
  rule = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cx(
        styles.header,
        styles[tone],
        rule && styles.ruled,
        className,
      )}
    >
      <Eyebrow tone={tone === "inverse" ? "inverse" : "light"}>{label}</Eyebrow>
      {link ? (
        <ArrowLink
          href={link.href}
          label={link.label}
          tone={tone === "inverse" ? "inverse" : "light"}
        />
      ) : null}
    </div>
  );
}
