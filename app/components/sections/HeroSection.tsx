"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { heroCta, heroSlides } from "@/app/data/content";
import { Figure } from "@/app/components/ui/Figure";
import { Parallax } from "@/app/components/ui/Parallax";
import { cx } from "@/app/lib/cx";
import styles from "./hero-section.module.css";

/**
 * HERO — frame 2:13 (1440x516).
 *
 * Layers: a side scrim (2:15) and a bottom scrim (2:16) over the image, copy
 * inset 64px (eyebrow 2:17, H1 2:18 at 600 wide, body 2:19 at 390 wide) and the
 * 130x42 CTA (2:20), which is now the bottom-aligned element the comp's dots
 * used to be. Both scrims are shared by every slide rather than tuned per
 * image, so advancing does not visibly re-grade the hero.
 *
 * A Client Component because the carousel advances on its own; the markup
 * (including the H1 and the LCP image) still server-renders in the initial HTML.
 *
 * The comp's slider dots (2:22–2:24) were dropped on request. With no control
 * left, the slides have to rotate themselves or the three behind the first
 * would never be seen — so this now auto-advances, which WCAG 2.2.2 would
 * rather have a visible pause button for. What stands in for it:
 *   • hover or keyboard focus anywhere in the hero halts the rotation
 *   • `prefers-reduced-motion` stops it outright, leaving slide 1 in place
 * Re-add a control here if that trade stops being acceptable.
 */

/** Long enough to read the H1 and body before the crossfade starts. */
const SLIDE_MS = 6500;

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const slide = heroSlides[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (held || reduced || heroSlides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [held, reduced]);

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Studio introduction"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      // React's focus events bubble, so this catches the CTA inside.
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className={styles.media}>
        {heroSlides.map((item, i) => (
          <div
            key={item.media.figmaLayer}
            className={cx(styles.slide, i === index && styles.slideActive)}
            aria-hidden={i !== index}
          >
            <Parallax strength={3} className={styles.parallax}>
              <Figure
                slot={item.media}
                sizes="100vw"
                stretch
                priority={i === 0}
                tone="dark"
                className={styles.figure}
              />
            </Parallax>
          </div>
        ))}
        <div className={styles.scrimSide} aria-hidden="true" />
        <div className={styles.scrimBottom} aria-hidden="true" />
      </div>

      <div className={styles.inner}>
        <div
          className={styles.copy}
          role="group"
          aria-label={`Slide ${index + 1} of ${heroSlides.length}`}
        >
          <p className={styles.eyebrow}>{slide.eyebrow}</p>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.body}>{slide.body}</p>

          <Link href={heroCta.href} className={styles.cta}>
            {heroCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
