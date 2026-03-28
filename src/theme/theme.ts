/**
 * Design tokens — single place for theme values.
 * CSS modules and global styles use matching variables from `theme.css` (:root).
 */

export const colors = {
  /** Brand / navbar accent */
  primary: "#34C94B",
  /** Page and surface dark backgrounds */
  black: "#121212",
  white: "#FFFFFF",
  /** Feedback CTA surface (matches legacy feedback button) */
  surface: "#121212",
  /** Autocomplete / interactive list */
  interactiveHover: "#4a8df6",
  interactivePressed: "#2977f5",
  searchBorder: "#121212",
  placeholder: "#6c6c6c",
} as const;

/**
 * Spacing, radii, breakpoints, typography scale, etc.
 * Add keys here as the design system grows.
 */
export const sizes = {
  // spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  // radius: { sm: 4, md: 8, lg: 16 },
} as const;

export const theme = {
  colors,
  sizes,
} as const;

export type Theme = typeof theme;
export type ColorToken = keyof typeof colors;
