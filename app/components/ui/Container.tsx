import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cx } from "@/app/lib/cx";
import styles from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
  /** Defaults to `div`; pass `section`, `header`, `footer` … as needed. */
  as?: ElementType;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/**
 * The page shell. Every section rule in the comp runs x=48 → x=1392 on a 1440
 * frame, i.e. a 1344px content column inside 48px gutters — which is exactly
 * what this reproduces, shrinking the gutter on smaller viewports.
 */
export function Container({
  children,
  as: Tag = "div",
  className,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cx(styles.container, className)} {...rest}>
      {children}
    </Tag>
  );
}
