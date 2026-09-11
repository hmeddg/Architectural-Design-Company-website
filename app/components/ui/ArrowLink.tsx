import Link from "next/link";
import { cx } from "@/app/lib/cx";
import styles from "./arrow-link.module.css";

type ArrowLinkProps = {
  href: string;
  label: string;
  /**
   * `bare`  — the naked 13px-tall labels: "View All" (2:47),
   *           "Featured View Project" (7:7), "Project 0n Link" (2:54 / 2:57).
   * `boxed` — "About Link" (2:30) inside its 123x30 frame (1:12).
   */
  variant?: "bare" | "boxed";
  tone?: "light" | "inverse" | "media";
  className?: string;
};

/** Small tracked uppercase link with a rule that draws in on hover. */
export function ArrowLink({
  href,
  label,
  variant = "bare",
  tone = "light",
  className,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cx(styles.link, styles[variant], styles[tone], className)}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        &#8594;
      </span>
    </Link>
  );
}
