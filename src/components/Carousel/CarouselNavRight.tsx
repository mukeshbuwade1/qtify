import React from "react";
import styles from "./CarouselNavButtons.module.css";

export type CarouselNavRightProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** When true, button is not rendered (e.g. at last slide). */
  hidden?: boolean;
};

/**
 * Next-slide control — green circle with chevron (Figma export).
 */
export default function CarouselNavRight({
  hidden,
  className,
  type = "button",
  "aria-label": ariaLabel = "Next slides",
  ...rest
}: CarouselNavRightProps) {
  if (hidden) return null;

  return (
    <button
      type={type}
      className={[styles.navButton, styles.navButtonRight, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      {...rest}
    >
      <svg
        className={styles.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
