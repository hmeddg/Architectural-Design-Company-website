import Image from "next/image";
import { cx } from "@/app/lib/cx";
import { ratioOf, type MediaSlot } from "@/app/lib/media";
import styles from "./figure.module.css";

type FigureProps = {
  slot: MediaSlot;
  /** next/image `sizes`. Required, so the srcset matches the rendered box. */
  sizes: string;
  /**
   * Stretch to the parent's box instead of holding the comp's own ratio. Used
   * where the comp crops a taller source into a shorter window — e.g. "image5 1"
   * (1342x894) inside Frame 7's 1342x663 opening, or "draw4 1" (379x474) inside
   * its clipped column. The parent must supply the height.
   */
  stretch?: boolean;
  priority?: boolean;
  /** Which part of the crop to keep, matching the comp's clipping. */
  objectPosition?: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Every picture in the comp renders through here.
 *
 * When `slot.src` is set it becomes a `next/image` at the slot's exact ratio.
 * When it is not — the Figma export quota blocked the download — it becomes a
 * labelled placeholder occupying the identical box, so the page's geometry is
 * already correct and dropping the file in is the only remaining step.
 */
export function Figure({
  slot,
  sizes,
  stretch = false,
  priority = false,
  objectPosition,
  tone = "light",
  className,
}: FigureProps) {
  const root = cx(
    styles.figure,
    stretch ? styles.stretch : undefined,
    styles[tone],
    className,
  );
  // Only impose the comp's ratio when the parent isn't dictating the height.
  const style = stretch ? undefined : { aspectRatio: ratioOf(slot) };

  if (!slot.src) {
    return (
      <div className={root} style={style} role="presentation">
        <div className={styles.placeholder}>
          <span className={styles.placeholderLayer}>{slot.figmaLayer}</span>
          <span className={styles.placeholderPath}>{slot.expectedPath}</span>
          <span className={styles.placeholderDims}>
            {slot.width} &times; {slot.height}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={root} style={style}>
      <Image
        src={slot.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
