import type { StatementBlock } from "@/app/data/content";
import { cx } from "@/app/lib/cx";
import styles from "./statement.module.css";

type StatementProps = {
  blocks: readonly StatementBlock[];
  className?: string;
};

/**
 * The studio statement (layer 41:3).
 *
 * Shared by the home page's About band and the /About route so the typography
 * is defined once. Each block's `lines` are hard breaks inside a single
 * paragraph — the design breaks certain sentences onto their own line without
 * opening a new paragraph, so they must stay one <p> for reading order.
 */
export function Statement({ blocks, className }: StatementProps) {
  return (
    <div className={cx(styles.statement, className)}>
      {blocks.map((block) => (
        <p
          key={block.lines[0]}
          className={cx(styles.block, styles[block.tone])}
        >
          {block.lines.map((line, i) => (
            <span key={line} className={styles.line}>
              {line}
              {i < block.lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
