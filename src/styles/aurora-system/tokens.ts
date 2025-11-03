// Kodano Aurora Design System v4.0
// Inspirado no Stripe Design System

export const auroraColors = {
  // Primary Colors
  tealDark: "#003E4E",
  cyan: "#00A6B4",
  iridescent: "#B6E0F9",
  deepBlack: "#0A0A0F",

  // Gradients
  auroraGradient: "linear-gradient(135deg, #003E4E 0%, #00A6B4 50%, #B6E0F9 100%)",
  deepGradient: "linear-gradient(180deg, #0A0A0F 0%, #003E4E 100%)",

  // Semantic Colors
  primary: "#00A6B4",
  secondary: "#003E4E",
  accent: "#B6E0F9",
  background: "#0A0A0F",
  foreground: "#FFFFFF",

  // Status Colors
  success: "#00D68F",
  warning: "#FFAB00",
  error: "#FF6B6B",
  info: "#00A6B4",
} as const;

export const auroraTypography = {
  fonts: {
    body: "'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
  },

  sizes: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
    "7xl": "4.5rem",    // 72px
  },

  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const auroraSpacing = {
  // 8-pt grid system
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px - minimum padding
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  32: "8rem",     // 128px
} as const;

export const auroraShadows = {
  // Layered soft shadows
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 4px 12px rgba(0, 0, 0, 0.25)",
  md: "0 6px 16px rgba(0, 0, 0, 0.3)",
  lg: "0 10px 24px rgba(0, 0, 0, 0.35)",
  xl: "0 20px 40px rgba(0, 0, 0, 0.4)",
  "2xl": "0 25px 50px rgba(0, 0, 0, 0.45)",

  // Colored shadows
  glow: "0 0 20px rgba(0, 166, 180, 0.5)",
  auroraGlow: "0 0 40px rgba(182, 224, 249, 0.6)",
} as const;

export const auroraAnimations = {
  // Easing functions
  easing: {
    default: "cubic-bezier(0.25, 1, 0.5, 1)",
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Durations
  duration: {
    fast: "150ms",
    base: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
} as const;

export const auroraBorders = {
  radius: {
    none: "0",
    sm: "0.25rem",    // 4px
    base: "0.5rem",   // 8px
    md: "0.75rem",    // 12px
    lg: "1rem",       // 16px
    xl: "1.5rem",     // 24px
    "2xl": "2rem",    // 32px
    full: "9999px",
  },

  width: {
    thin: "1px",
    base: "1.5px",
    thick: "2px",
  },
} as const;

export const auroraBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1400px", // max-width para conteúdo
} as const;

export const auroraZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const;

// WebGL / 3D specific
export const aurora3D = {
  perspective: "1000px",
  depth: {
    shallow: "translateZ(10px)",
    medium: "translateZ(50px)",
    deep: "translateZ(100px)",
  },
} as const;

// Export all tokens
export const auroraTokens = {
  colors: auroraColors,
  typography: auroraTypography,
  spacing: auroraSpacing,
  shadows: auroraShadows,
  animations: auroraAnimations,
  borders: auroraBorders,
  breakpoints: auroraBreakpoints,
  zIndex: auroraZIndex,
  "3d": aurora3D,
} as const;

export type AuroraTokens = typeof auroraTokens;
