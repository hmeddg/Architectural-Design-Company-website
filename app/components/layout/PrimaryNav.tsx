"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation } from "@/app/data/site";
import { cx } from "@/app/lib/cx";
import { useActiveSection } from "@/app/lib/useActiveSection";
import styles from "./primary-nav.module.css";

/** Section ids the nav can track, in page order. */
const SECTION_IDS: readonly string[] = navigation
  .map((item) => item.sectionId)
  .filter((id) => id !== null);

/**
 * Desktop nav (2:7–2:11) with a single underline that slides between items.
 *
 * On the home page the underline follows the band you are scrolled into, so it
 * glides Home → Projects → About → Contact as the page moves. Everywhere else
 * it marks the current route.
 *
 * This is the same effect as Framer Motion's shared-layout `layoutId`: one
 * element that animates between positions rather than a separate underline per
 * item fading in and out. It is done natively here because the npm registry is
 * unreachable from this machine, so `motion` could not be installed — the
 * indicator measures the active item and transitions `transform`/`width`, which
 * is what `layoutId` does under the hood anyway.
 */
export function PrimaryNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const activeSection = useActiveSection(isHome ? SECTION_IDS : []);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  const activeIndex = navigation.findIndex((item) => {
    if (isHome && activeSection) return item.sectionId === activeSection;
    return item.href === "/"
      ? pathname === "/"
      : pathname.toLowerCase().startsWith(item.href.toLowerCase());
  });

  // Measure the active item and move the shared underline onto it.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || activeIndex < 0) {
      setIndicator(null);
      return;
    }
    const item = list.children[activeIndex] as HTMLElement | undefined;
    if (!item) {
      setIndicator(null);
      return;
    }
    setIndicator({ x: item.offsetLeft, w: item.offsetWidth });
  }, [activeIndex]);

  useEffect(() => {
    measure();
  }, [measure]);

  // Label widths shift with the font load and the viewport.
  useEffect(() => {
    window.addEventListener("resize", measure, { passive: true });
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <nav className={cx(styles.nav, className)} aria-label="Primary">
      <ul className={styles.list} ref={listRef}>
        {navigation.map((item, i) => {
          const current = i === activeIndex;
          // aria-current marks the route, never the scrolled-to band — the
          // underline is decoration there, not a change of page.
          const isRoute =
            item.href === "/"
              ? pathname === "/"
              : pathname.toLowerCase().startsWith(item.href.toLowerCase());

          return (
            <li key={item.href} className={styles.item}>
              <Link
                href={item.href}
                className={cx(styles.link, current && styles.active)}
                aria-current={isRoute ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        {indicator ? (
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={{
              transform: `translateX(${indicator.x}px)`,
              width: `${indicator.w}px`,
            }}
          />
        ) : null}
      </ul>
    </nav>
  );
}
