"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cx } from "@/app/lib/cx";
import styles from "./parallax.module.css";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Travel as a percentage of the frame's own height, measured from centre.
   * Keep it small — 3–5 reads as depth, more reads as the image sliding.
   */
  strength?: number;
  className?: string;
};

/**
 * Vertical parallax for the large editorial images.
 *
 * The inner layer is scaled just enough to cover its own travel, so the image
 * never pulls away from the frame edge. The frame clips.
 *
 * Dependency-free — the npm registry is unreachable from this machine, so no
 * animation library is involved. Scroll work is batched through
 * requestAnimationFrame so a burst of scroll events collapses into one rect
 * read and one transform write per frame, and the frame's own rect gates the
 * write rather than an IntersectionObserver: the effect is pure geometry and
 * already reads that rect, so a second async source of truth buys nothing.
 *
 * Skipped entirely under `prefers-reduced-motion`.
 */
export function Parallax({ children, strength = 4, className }: ParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Nothing to do while the frame is outside the viewport.
      if (rect.bottom < 0 || rect.top > viewport) return;

      // -1 when the frame sits just below the fold, +1 once just above the top.
      const centre = rect.top + rect.height / 2;
      const progress = (viewport / 2 - centre) / (viewport / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));

      layer.style.transform = `translate3d(0, ${(clamped * strength).toFixed(3)}%, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      layer.style.transform = "";
    };
  }, [strength]);

  return (
    <div ref={frameRef} className={cx(styles.parallax, className)}>
      <div
        ref={layerRef}
        className={styles.layer}
        // Cover the travel in both directions, plus a little slack.
        style={{ "--parallax-scale": 1 + (strength * 2) / 100 + 0.02 } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
