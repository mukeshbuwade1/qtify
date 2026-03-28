import React from "react";
import styles from "./CarouselNavButtons.module.css";

export type CarouselNavLeftProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** When true, button is not rendered (e.g. at first slide). */
  hidden?: boolean;
};

/**
 * Previous-slide control — green circle with chevron (Figma export).
 */
export default function CarouselNavLeft({
  hidden,
  className,
  type = "button",
  "aria-label": ariaLabel = "Previous slides",
  ...rest
}: CarouselNavLeftProps) {
  if (hidden) return null;

  return (
    <button
      type={type}
      className={[styles.navButton, styles.navButtonLeft, className].filter(Boolean).join(" ")}
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
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
