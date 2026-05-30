/**
 * AstroVerse color palette - deep space, NASA-inspired.
 */
export const colors = {
  space: {
    deep: '#05010f',
    dark: '#0a0a1f',
    medium: '#141432',
    light: '#1e1e44',
  },
  cosmic: {
    blue: '#3a86ff',
    purple: '#8338ec',
    pink: '#ff006e',
    cyan: '#00d4ff',
    orange: '#ff6b35',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b8b8d0',
    tertiary: '#7a7a96',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.10)',
    medium: 'rgba(255, 255, 255, 0.06)',
    dark: 'rgba(0, 0, 0, 0.35)',
  },
  border: 'rgba(255, 255, 255, 0.12)',
  status: {
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#ef4444',
  },
} as const;

export type Colors = typeof colors;
export default colors;
