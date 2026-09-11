import type { ReactNode } from "react";
import { cx } from "@/app/lib/cx";
import styles from "./eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
  /** `inverse` for the dark contact / footer bands. */
  tone?: "light" | "inverse" | "media";
  className?: string;
};

/**
 * The numbered section label — "01 / OUR APPROACH", "04 / ABOUT US",
 * "05 / CONTACT TO US". Every one of these layers measures 13px tall in the
 * comp, i.e. an 11px uppercase face on heavy tracking.
 */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <span className={cx(styles.eyebrow, styles[tone], className)}>{children}</span>
  );
}
