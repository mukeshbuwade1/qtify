import React, { useId } from "react";
import styles from "./Section.module.css";

export type SectionProps = {
  title: string;
  actionLabel: string;
  onActionClick?: () => void;
  children: React.ReactNode;
};

/**
 * Reusable section: heading row (title + accent action) and body slot for grids or other content.
 */
export default function Section({
  title,
  actionLabel,
  onActionClick,
  children,
}: SectionProps) {
  const headingId = useId();
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <button
          type="button"
          className={styles.action}
          onClick={onActionClick}
        >
          {actionLabel}
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
