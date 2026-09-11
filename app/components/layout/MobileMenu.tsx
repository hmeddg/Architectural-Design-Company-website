"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, navigation } from "@/app/data/site";
import { SocialIcons } from "@/app/components/ui/SocialIcons";
import { cx } from "@/app/lib/cx";
import styles from "./mobile-menu.module.css";

const PANEL_ID = "mobile-menu-panel";

/**
 * Mobile navigation drawer (<1024px). The comp has no mobile frame, so this is
 * an addition — it carries the same nav, phone and socials the desktop header
 * and footer expose.
 *
 * The closed panel is `visibility: hidden`, which takes it out of the tab order
 * without needing `inert`.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [seenPath, setSeenPath] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on navigation. Adjusted during render rather than in an effect — the
  // sanctioned pattern for reacting to a changed value without a second pass.
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    if (open) setOpen(false);
  }

  // Escape closes; lock the page behind the drawer while it is open.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the drawer so keyboard users land inside it.
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={cx(styles.bars, open && styles.barsOpen)} aria-hidden="true">
          <span className={styles.bar} />
          <span className={styles.bar} />
        </span>
      </button>

      <div
        className={cx(styles.scrim, open && styles.scrimOpen)}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        id={PANEL_ID}
        className={cx(styles.panel, open && styles.panelOpen)}
        tabIndex={-1}
        data-native-scroll
      >
        <nav aria-label="Mobile">
          <ul className={styles.list}>
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.toLowerCase().startsWith(item.href.toLowerCase());

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(styles.link, active && styles.linkActive)}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.details}>
          <Link href={contact.phoneHref} className={styles.detail}>
            {contact.phone}
          </Link>
          <Link href={contact.emailHref} className={styles.detail}>
            {contact.email}
          </Link>
        </div>

        <div className={styles.socials}>
          <SocialIcons />
        </div>
      </div>
    </>
  );
}
