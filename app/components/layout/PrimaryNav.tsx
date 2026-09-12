"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/data/site";
import { cx } from "@/app/lib/cx";
import { useActiveSection } from "@/app/lib/useActiveSection";
import styles from "./primary-nav.module.css";

/** Section ids the nav can track, in page order. */
const SECTION_IDS: readonly string[] = navigation
  .map((item) => item.sectionId)
  .filter((id) => id !== null);

/**
 * Desktop nav (2:7–2:11). The active item carries its own underline.
 *
 * On the home page the underline marks the band you are scrolled into, so it
 * moves Home → Projects → About → Contact as the page moves. Everywhere else it
 * marks the current route.
 *
 * There was a single underline here that measured the active item and animated
 * between positions — the shared-layout effect. It has been removed: each item
 * now simply shows or hides the same `::after` rule the pointer already uses, so
 * the nav needs no measurement, no refs and no resize or font-load listeners.
 */
export function PrimaryNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const activeSection = useActiveSection(isHome ? SECTION_IDS : []);

  const activeIndex = navigation.findIndex((item) => {
    if (isHome && activeSection) return item.sectionId === activeSection;
    return item.href === "/"
      ? pathname === "/"
      : pathname.toLowerCase().startsWith(item.href.toLowerCase());
  });

  return (
    <nav className={cx(styles.nav, className)} aria-label="Primary">
      <ul className={styles.list}>
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
      </ul>
    </nav>
  );
}
