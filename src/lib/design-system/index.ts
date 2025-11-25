/**
 * Kodano Design System v5.0
 * Central export point for all design system modules
 * Stripe-level quality components and utilities
 */

// Core design tokens
export * from "./tokens";
export { default as designTokens } from "./tokens";

// Motion system
export * from "./motion";
export { default as motion } from "./motion";

// Utility functions
export * from "./utils";
export { utils } from "./utils";

// GPU acceleration utilities
export * from "./gpu";
export { default as gpu } from "./gpu";

// Import required modules for composite exports
import { designTokens as tokensModule, generateCSSVariables, colors, typography, breakpoints, spacing } from "./tokens";
import { motion as motionModule } from "./motion";
import { utils as utilsModule } from "./utils";

// Type exports
export type { DesignTokens } from "./tokens";

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

// Most used tokens
export { brandColors, colors, typography, spacing, shadows, animation } from "./tokens";

// Most used motion presets
export {
  easings,
  durations,
  springs,
  transitions,
  fadeVariants,
  slideUpVariants,
  cardHoverVariants,
  buttonVariants,
} from "./motion";

// Most used utilities
export { cn } from "./utils";

// ============================================================================
// COMPOSITE EXPORTS
// ============================================================================

/**
 * Complete design system object
 * Use this for accessing the entire system in one import
 */
export const KodanoDesignSystem = {
  tokens: tokensModule,
  motion: motionModule,
  utils: utilsModule,
} as const;

// ============================================================================
// CSS GENERATION
// ============================================================================

/**
 * Generates CSS custom properties for use in stylesheets
 */
export function generateDesignSystemCSS(): string {

  return `
/* ========================================
   Kodano Design System v5.0 - CSS Variables
   ======================================== */

:root {
  /* Brand Colors */
  --color-primary: #0D1B2A;
  --color-secondary: #1B263B;
  --color-blue-medium: #415A77;
  --color-blue-light: #778DA9;
  --color-gray-light: #E0E1DD;
  --color-white: #FFFFFF;

  /* Semantic Colors */
  --color-background: var(--color-white);
  --color-foreground: var(--color-primary);
  --color-border: var(--color-gray-light);
  --color-muted: var(--color-blue-light);
  --color-accent: var(--color-blue-medium);

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 96px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 4px 0 rgba(13, 27, 42, 0.06);
  --shadow-md: 0 4px 8px 0 rgba(13, 27, 42, 0.08);
  --shadow-lg: 0 8px 16px 0 rgba(13, 27, 42, 0.10);
  --shadow-xl: 0 12px 24px 0 rgba(13, 27, 42, 0.12);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;

  --easing-default: cubic-bezier(0.32, 0, 0.67, 0);
  --easing-emphasized: cubic-bezier(0.22, 1, 0.36, 1);
  --easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-Index */
  --z-base: 0;
  --z-elevated: 1;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-popover: 50;
  --z-toast: 60;
  --z-tooltip: 70;

  ${generateCSSVariables()}
}

/* Dark Mode Variables - DISABLED - Light mode only */
/* .dark {
  Dark mode styles removed - site is light mode only
  --color-background: #000000;
  --color-foreground: #FFFFFF;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-muted: rgba(255, 255, 255, 0.6);
  --color-accent: #778DA9;

  --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 12px 24px 0 rgba(0, 0, 0, 0.5);
} */

/* Responsive Container */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  max-width: 1200px;
}

@media (min-width: 640px) {
  .container {
    padding-left: var(--spacing-lg);
    padding-right: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--spacing-xl);
    padding-right: var(--spacing-xl);
  }
}

/* Animation Classes */
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in {
    animation: fadeIn var(--duration-normal) var(--easing-default) both;
  }

  .animate-slide-up {
    animation: slideUp var(--duration-normal) var(--easing-emphasized) both;
  }

  .animate-scale-in {
    animation: scaleIn var(--duration-normal) var(--easing-spring) both;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;
}

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

/**
 * Configuration object for theme providers and build tools
 */
export const themeConfig = {
  colors,
  fonts: typography.fonts,
  breakpoints,
  spacing,
  animation: motionModule,
} as const;

// ============================================================================
// HOOKS (for use in React components)
// ============================================================================

/**
 * Design system hooks will be added here as the system evolves
 * Examples: useTheme, useBreakpoint, useAnimation, etc.
 */

// Placeholder for future hooks
export const hooks = {} as const;

export default KodanoDesignSystem;