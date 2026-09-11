"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Smooth (inertial) wheel scrolling.
 *
 * Written against the platform — the npm registry is unreachable from this
 * machine, so Lenis could not be installed. This covers the same ground in the
 * one place that matters: it intercepts wheel input, keeps its own target
 * position, and eases the window toward it each frame.
 *
 * What it deliberately does NOT touch, because hijacking these makes a page
 * worse rather than smoother:
 *   • Touch scrolling — the OS already does this better than any script.
 *   • Keyboard, scrollbar dragging, and programmatic scrolls — these run
 *     natively and simply re-sync the target.
 *   • Anything inside an element marked `data-native-scroll` (the mobile
 *     drawer), which needs to scroll on its own.
 *   • `prefers-reduced-motion` — inertial scrolling is exactly what that
 *     setting exists to suppress, so the whole thing is skipped.
 *
 * To remove the effect entirely, delete <SmoothScroll /> from app/layout.tsx.
 * Nothing else depends on it.
 */

/** Proportion of the remaining distance closed per frame. Higher = tighter. */
const EASE = 0.1;
/** Below this, snap and stop animating. */
const EPSILON = 0.4;

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers are touch-first; leave their native momentum alone.
    const coarse = window.matchMedia("(pointer: coarse)");
    if (media.matches || coarse.matches) return;

    let target = window.scrollY;
    let current = target;
    let running = false;
    let frame = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const step = () => {
      const delta = target - current;

      if (Math.abs(delta) < EPSILON) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }

      current += delta * EASE;
      window.scrollTo(0, current);
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      // Let modified wheels (zoom) and nested scrollers behave normally.
      if (event.ctrlKey || event.metaKey) return;
      if ((event.target as Element | null)?.closest?.("[data-native-scroll]")) return;

      event.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + event.deltaY));
      start();
    };

    // Any scroll we did not drive — keyboard, scrollbar, anchor jump — becomes
    // the new truth, so the two never fight each other.
    const onScroll = () => {
      if (running) return;
      target = window.scrollY;
      current = target;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A new route starts at the top with no inertia carried across.
  //
  // Skipped on the very first render: this effect also runs on mount, and
  // scrolling to 0 there would defeat every deep link — landing on /#contact,
  // the skip link, and the contact form's error-summary anchors would all jump
  // straight back to the top. A hash is likewise left alone.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
