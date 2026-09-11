import Link from "next/link";
import { site } from "@/app/data/site";
import { cx } from "@/app/lib/cx";
import styles from "./wordmark.module.css";

type WordmarkProps = {
  /** `header` = 2:5 / 2:6 (110x24 over 90x8); `footer` = 87:4 / 87:5 (300x27). */
  size?: "header" | "footer";
  tone?: "light" | "inverse";
  className?: string;
};

/**
 * The two-line lockup: "ARCHIA" over a hyper-tracked "STUDIO". In the comp the
 * sub-line is inset ~10px from the left of the mark and optically centred
 * beneath it, which the 0.55em tracking plus a trailing space reproduces.
 */
export function Wordmark({
  size = "header",
  tone = "light",
  className,
}: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cx(styles.wordmark, styles[size], styles[tone], className)}
      aria-label={`${site.wordmark} ${site.wordmarkSub} — home`}
    >
      <span className={styles.mark}>{site.wordmark}</span>
      <span className={styles.sub} aria-hidden="true">
        {site.wordmarkSub}
      </span>
    </Link>
  );
}
