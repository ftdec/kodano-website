/**
 * Kodano Design System v5.0 - Stripe-Level
 * Based on PRD requirements with fixed brand colors
 * Implements advanced patterns from top-tier product companies
 */

// ============================================================================
// BRAND COLORS (FIXED - DO NOT MODIFY)
// ============================================================================
export const brandColors = {
  // Primary palette from PRD
  primary: "#0D1B2A",       // Deep blue-black
  secondary: "#1B263B",     // Dark blue
  blueMedium: "#415A77",    // Medium blue
  blueLight: "#778DA9",     // Light blue
  grayLight: "#E0E1DD",     // Light gray
  white: "#FFFFFF",         // Pure white
} as const;

// ============================================================================
// EXTENDED COLOR SYSTEM
// ============================================================================
export const colors = {
  ...brandColors,

  // Semantic colors built from brand palette
  background: {
    primary: brandColors.white,
    secondary: brandColors.grayLight,
    tertiary: "#F8F8F7",  // Slightly off-white
    inverse: brandColors.primary,
  },

  foreground: {
    primary: brandColors.primary,
    secondary: brandColors.blueMedium,
    muted: brandColors.blueLight,
    inverse: brandColors.white,
  },

  // Interactive states
  interactive: {
    default: brandColors.primary,
    hover: brandColors.secondary,
    active: brandColors.blueMedium,
    disabled: brandColors.blueLight,
  },

  // Status colors (professional, not cartoonish)
  status: {
    success: "#0A7A3F",    // Deep green
    warning: "#B85C00",    // Deep orange
    error: "#B91C1C",      // Deep red
    info: brandColors.blueMedium,
  },

  // Border colors with opacity
  border: {
    default: `${brandColors.grayLight}`,
    subtle: `${brandColors.grayLight}80`, // 50% opacity
    strong: brandColors.blueMedium,
    interactive: brandColors.primary,
  },

  // Overlay colors for modals/dropdowns
  overlay: {
    backdrop: "rgba(13, 27, 42, 0.4)",  // Primary with opacity
    scrim: "rgba(0, 0, 0, 0.6)",
  },
} as const;

// ============================================================================
// GRADIENTS (Stripe-level sophistication)
// ============================================================================
export const gradients = {
  // Subtle brand gradients
  brandSubtle: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
  brandVibrant: `linear-gradient(135deg, ${brandColors.secondary} 0%, ${brandColors.blueMedium} 100%)`,

  // Mesh gradients (Stripe-style)
  mesh: {
    hero: `
      radial-gradient(at 40% 20%, ${brandColors.blueLight}15 0px, transparent 50%),
      radial-gradient(at 80% 0%, ${brandColors.blueMedium}15 0px, transparent 50%),
      radial-gradient(at 10% 50%, ${brandColors.secondary}10 0px, transparent 50%),
      radial-gradient(at 80% 80%, ${brandColors.primary}05 0px, transparent 50%)
    `,
    card: `
      radial-gradient(at 0% 0%, ${brandColors.blueLight}10 0px, transparent 50%),
      radial-gradient(at 100% 100%, ${brandColors.blueMedium}10 0px, transparent 50%)
    `,
  },

  // Animated gradients
  shimmer: `linear-gradient(90deg, transparent 0%, ${brandColors.white}20 50%, transparent 100%)`,
  glow: `radial-gradient(circle at center, ${brandColors.blueMedium}30 0%, transparent 70%)`,
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM (Stripe-level hierarchy)
// ============================================================================
export const typography = {
  // Font stacks
  fonts: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Monaco, Consolas, monospace',
  },

  // Type scale (Stripe's exact scale)
  sizes: {
    // Display sizes
    display1: { size: "72px", lineHeight: "80px", letterSpacing: "-0.02em" },
    display2: { size: "60px", lineHeight: "68px", letterSpacing: "-0.02em" },
    display3: { size: "48px", lineHeight: "56px", letterSpacing: "-0.01em" },

    // Heading sizes
    h1: { size: "40px", lineHeight: "48px", letterSpacing: "-0.01em" },
    h2: { size: "32px", lineHeight: "40px", letterSpacing: "-0.01em" },
    h3: { size: "28px", lineHeight: "36px", letterSpacing: "-0.01em" },
    h4: { size: "24px", lineHeight: "32px", letterSpacing: "0" },
    h5: { size: "20px", lineHeight: "28px", letterSpacing: "0" },
    h6: { size: "18px", lineHeight: "24px", letterSpacing: "0" },

    // Body sizes
    large: { size: "18px", lineHeight: "28px", letterSpacing: "0" },
    base: { size: "16px", lineHeight: "24px", letterSpacing: "0" },
    small: { size: "14px", lineHeight: "20px", letterSpacing: "0" },
    tiny: { size: "12px", lineHeight: "16px", letterSpacing: "0" },

    // Special sizes
    button: { size: "14px", lineHeight: "20px", letterSpacing: "0.02em" },
    caption: { size: "12px", lineHeight: "16px", letterSpacing: "0.01em" },
    overline: { size: "11px", lineHeight: "16px", letterSpacing: "0.08em" },
  },

  // Font weights
  weights: {
    thin: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 800,
  },
} as const;

// ============================================================================
// SPACING SYSTEM (8pt grid)
// ============================================================================
export const spacing = {
  // Base scale
  px: "1px",
  0: "0",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  2.5: "10px",
  3: "12px",
  3.5: "14px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  9: "36px",
  10: "40px",
  11: "44px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  36: "144px",
  40: "160px",
  44: "176px",
  48: "192px",
  52: "208px",
  56: "224px",
  60: "240px",
  64: "256px",
  72: "288px",
  80: "320px",
  96: "384px",

  // Component-specific spacing
  section: {
    mobile: "48px",
    tablet: "64px",
    desktop: "96px",
  },

  container: {
    padding: {
      mobile: "16px",
      tablet: "24px",
      desktop: "32px",
    },
    maxWidth: "1200px",
  },
} as const;

// ============================================================================
// SHADOWS (Stripe-level depth system)
// ============================================================================
export const shadows = {
  // Elevation scale
  none: "none",
  xs: "0 1px 2px 0 rgba(13, 27, 42, 0.04)",
  sm: "0 2px 4px 0 rgba(13, 27, 42, 0.06), 0 1px 2px 0 rgba(13, 27, 42, 0.04)",
  md: "0 4px 8px 0 rgba(13, 27, 42, 0.08), 0 2px 4px 0 rgba(13, 27, 42, 0.04)",
  lg: "0 8px 16px 0 rgba(13, 27, 42, 0.10), 0 4px 8px 0 rgba(13, 27, 42, 0.04)",
  xl: "0 12px 24px 0 rgba(13, 27, 42, 0.12), 0 8px 16px 0 rgba(13, 27, 42, 0.04)",
  "2xl": "0 20px 40px 0 rgba(13, 27, 42, 0.14), 0 12px 24px 0 rgba(13, 27, 42, 0.04)",
  "3xl": "0 32px 64px 0 rgba(13, 27, 42, 0.16), 0 20px 40px 0 rgba(13, 27, 42, 0.04)",

  // Interactive shadows
  button: {
    default: "0 2px 4px 0 rgba(13, 27, 42, 0.08)",
    hover: "0 4px 8px 0 rgba(13, 27, 42, 0.12)",
    active: "0 1px 2px 0 rgba(13, 27, 42, 0.08)",
  },

  card: {
    default: "0 2px 8px 0 rgba(13, 27, 42, 0.08)",
    hover: "0 8px 24px 0 rgba(13, 27, 42, 0.12)",
  },

  // Colored shadows (subtle)
  glow: {
    primary: `0 0 24px rgba(13, 27, 42, 0.2)`,
    blue: `0 0 24px rgba(65, 90, 119, 0.2)`,
  },

  // Inset shadows
  inset: {
    sm: "inset 0 1px 2px 0 rgba(13, 27, 42, 0.06)",
    md: "inset 0 2px 4px 0 rgba(13, 27, 42, 0.08)",
  },
} as const;

// ============================================================================
// ANIMATION SYSTEM (Stripe-level motion)
// ============================================================================
export const animation = {
  // Timing functions (Stripe's exact curves)
  easing: {
    // Primary easings
    default: "cubic-bezier(0.32, 0, 0.67, 0)",      // Stripe's default
    emphasized: "cubic-bezier(0.22, 1, 0.36, 1)",   // For important transitions

    // Standard easings
    linear: "linear",
    ease: "ease",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",

    // Spring easings
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    springSmooth: "cubic-bezier(0.43, 0.195, 0.02, 1.0)",

    // Back easings (for playful elements)
    backIn: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    backOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    backInOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Duration scale
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
    slowest: "700ms",

    // Component-specific
    microInteraction: "100ms",
    transition: "250ms",
    complex: "500ms",
    pageTransition: "600ms",
  },

  // Keyframe presets
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeInUp: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    fadeInScale: {
      from: { opacity: 0, transform: "scale(0.95)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    slideIn: {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0)" },
    },
    shimmer: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    pulse: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
  },

  // Stagger delays for list animations
  stagger: {
    fast: "50ms",
    normal: "100ms",
    slow: "150ms",
  },
} as const;

// ============================================================================
// BORDER & RADIUS SYSTEM
// ============================================================================
export const borders = {
  width: {
    none: "0",
    thin: "1px",
    default: "1px",
    medium: "2px",
    thick: "3px",
  },

  radius: {
    none: "0",
    xs: "2px",
    sm: "4px",
    md: "6px",
    default: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",

    // Component-specific
    button: "8px",
    card: "12px",
    modal: "16px",
    tooltip: "6px",
  },
} as const;

// ============================================================================
// BREAKPOINTS (Mobile-first)
// ============================================================================
export const breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",

  // Semantic breakpoints
  mobile: "640px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1536px",

  // Container widths
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1200px",
  },
} as const;

// ============================================================================
// Z-INDEX SCALE
// ============================================================================
export const zIndex = {
  hide: -1,
  base: 0,
  elevated: 1,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  toast: 60,
  tooltip: 70,
  skipLink: 100,
} as const;

// ============================================================================
// EFFECTS & FILTERS
// ============================================================================
export const effects = {
  blur: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "24px",
  },

  backdrop: {
    blur: "blur(12px)",
    saturate: "saturate(180%)",
  },

  glass: {
    light: "background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px) saturate(180%);",
    dark: "background: rgba(13, 27, 42, 0.7); backdrop-filter: blur(12px) saturate(180%);",
  },
} as const;

// ============================================================================
// COMPOSITE TOKENS
// ============================================================================
export const components = {
  button: {
    height: {
      sm: "32px",
      md: "40px",
      lg: "48px",
    },
    padding: {
      sm: "0 12px",
      md: "0 16px",
      lg: "0 24px",
    },
  },

  input: {
    height: {
      sm: "36px",
      md: "40px",
      lg: "48px",
    },
  },

  card: {
    padding: {
      sm: "16px",
      md: "24px",
      lg: "32px",
    },
  },
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================
export const designTokens = {
  colors,
  gradients,
  typography,
  spacing,
  shadows,
  animation,
  borders,
  breakpoints,
  zIndex,
  effects,
  components,
} as const;

export type DesignTokens = typeof designTokens;

// ============================================================================
// CSS VARIABLE GENERATOR
// ============================================================================
export function generateCSSVariables(): string {
  const vars: string[] = [];

  // Colors
  Object.entries(brandColors).forEach(([key, value]) => {
    vars.push(`--color-brand-${key}: ${value};`);
  });

  // Typography sizes
  Object.entries(typography.sizes).forEach(([key, value]) => {
    vars.push(`--font-size-${key}: ${value.size};`);
    vars.push(`--line-height-${key}: ${value.lineHeight};`);
    vars.push(`--letter-spacing-${key}: ${value.letterSpacing};`);
  });

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    if (typeof value === 'string') {
      vars.push(`--spacing-${key}: ${value};`);
    }
  });

  // Animation durations
  Object.entries(animation.duration).forEach(([key, value]) => {
    vars.push(`--duration-${key}: ${value};`);
  });

  return vars.join('\n  ');
}

export default designTokens;