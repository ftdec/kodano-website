/**
 * Animation Constants
 * Centralized timing and configuration for all animations
 */

export const durations = {
  instant: 0.1,      // 100ms - Micro-interactions
  fast: 0.2,         // 200ms - Hover states
  normal: 0.3,       // 300ms - Default transitions
  slow: 0.5,         // 500ms - Emphasis
  slower: 0.8,       // 800ms - Major transitions
  slowest: 1.2,      // 1200ms - Page transitions
} as const;

export const delays = {
  none: 0,
  short: 0.05,
  medium: 0.1,
  long: 0.2,
  stagger: 0.05,     // For staggered children
} as const;

export const stagger = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.1,
  slower: 0.15,
} as const;

export const viewport = {
  once: true,
  margin: '-100px',
  amount: 0.3,
} as const;

export const viewportMobile = {
  once: true,
  margin: '-50px',
  amount: 0.2,
} as const;
