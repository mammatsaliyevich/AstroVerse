/**
 * Typography scale for AstroVerse.
 */
export const typography = {
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  spacing: {
    tight: -0.5,
    normal: 0,
    wide: 1,
  },
} as const;

export type Typography = typeof typography;
export default typography;
