import React, { useId } from "react";
import styles from "./Section.module.css";

export type SectionProps = {
  title: string;
  /** When omitted, no action control is shown (e.g. Songs section). */
  actionLabel?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
};

/**
 * Reusable section: heading row (title + optional accent action) and body slot.
 */
export default function Section({
  title,
  actionLabel,
  onActionClick,
  children,
}: SectionProps) {
  const headingId = useId();
  const showAction = Boolean(actionLabel);

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.header}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        {showAction && (
          <button
            type="button"
            className={styles.action}
            onClick={onActionClick}
          >
            {actionLabel}
          </button>
        )}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
