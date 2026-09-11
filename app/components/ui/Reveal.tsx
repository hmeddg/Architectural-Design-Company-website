"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cx } from "@/app/lib/cx";
import styles from "./reveal.module.css";

export type RevealVariant = "soft" | "lift" | "veil";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in ms, for sibling reveals. */
  delay?: number;
  /**
   * How the element arrives:
   *   soft — 18px rise. Body copy, small blocks.
   *   lift — 44px rise with a slight settle in scale. Cards, portraits.
   *   veil — 64px rise behind a clip that opens upward. The big images.
   */
  variant?: RevealVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children" | "style">;

/** Safety net: disarm regardless, so content can never stay stuck hidden. */
const FAILSAFE_MS = 3000;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal.
 *
 * Written against the platform rather than a library — the npm registry is
 * unreachable from this machine, so framer-motion could not be installed. The
 * variants below cover what it would have been used for here.
 *
 * Fail-safe by construction, which matters more than the animation:
 *   • Visible by default in CSS. No JS, a thrown error, a failed hydration —
 *     the content still renders. Nothing hides behind a script.
 *   • JS only arms an element it has confirmed is below the fold, in a layout
 *     effect (before paint), so nothing is ever seen then hidden.
 *   • An armed element disarms on intersection, and unconditionally after
 *     FAILSAFE_MS if the observer never fires.
 *   • Skipped entirely under `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "soft",
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    // Only hide what is genuinely off-screen; anything already visible stays put.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.classList.add(styles.armed);
    const disarm = () => node.classList.remove(styles.armed);

    const timer = window.setTimeout(disarm, FAILSAFE_MS);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            disarm();
            observer.disconnect();
            window.clearTimeout(timer);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      disarm();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={cx(styles.reveal, styles[variant], className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
