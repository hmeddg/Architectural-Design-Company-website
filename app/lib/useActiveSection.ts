"use client";

import { useEffect, useState } from "react";

/**
 * Scrollspy: reports which of the given section ids is currently the main thing
 * on screen, or `null` when none of them qualifies.
 *
 * Uses IntersectionObserver with a band of thresholds rather than a single
 * "is it visible" flag, because several of this page's bands are on screen at
 * once — the winner is whichever covers the most of the viewport.
 *
 * `null` is the caller's cue to fall back to route highlighting: it happens
 * above the first section, and on routes that have none of these ids.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  // The dependency is the *contents* of the list, not its identity — callers
  // build the array inline, so it is a new reference on every render.
  const key = ids.join("|");

  const [active, setActive] = useState<string | null>(null);
  const [seenKey, setSeenKey] = useState(key);

  // Switching to a different set of sections clears the old answer. Adjusted
  // during render rather than in an effect, which avoids a cascading pass.
  if (key !== seenKey) {
    setSeenKey(key);
    setActive(null);
  }

  useEffect(() => {
    const nodes = key
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    // Latest visible ratio per id, updated as entries arrive.
    const ratios = new Map<string, number>();

    const pick = () => {
      let winner: string | null = null;
      let best = 0;
      for (const [id, ratio] of ratios) {
        if (ratio > best) {
          best = ratio;
          winner = id;
        }
      }
      // Ignore a band that has barely crept into view.
      setActive(best > 0.08 ? winner : null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        pick();
      },
      {
        // A band counts by how much of the viewport it occupies, so sample
        // across the range rather than at one cut-off.
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        // Discount the sticky header, so a band is not "active" while it is
        // hidden behind it.
        rootMargin: "-88px 0px -35% 0px",
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [key]);

  return active;
}
