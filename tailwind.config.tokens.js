/**
 * Kodano Tailwind Design Tokens Extension
 * Extends Tailwind with custom design tokens
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'kodano-cyan': 'hsl(var(--kodano-cyan) / <alpha-value>)',
        'kodano-teal': 'hsl(var(--kodano-teal) / <alpha-value>)',
        'kodano-dark': 'hsl(var(--kodano-dark) / <alpha-value>)',
        'kodano-white': 'hsl(var(--kodano-white) / <alpha-value>)',

        // Accent Colors
        'accent-emerald': 'hsl(var(--accent-emerald) / <alpha-value>)',
        'accent-purple': 'hsl(var(--accent-purple) / <alpha-value>)',
        'accent-coral': 'hsl(var(--accent-coral) / <alpha-value>)',
        'accent-red': 'hsl(var(--accent-red) / <alpha-value>)',

        // Semantic Colors
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        success: 'hsl(var(--color-success) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        error: 'hsl(var(--color-error) / <alpha-value>)',
        info: 'hsl(var(--color-info) / <alpha-value>)',

        // Surface Colors
        surface: {
          0: 'hsl(var(--color-surface-0) / <alpha-value>)',
          1: 'hsl(var(--color-surface-1) / <alpha-value>)',
          2: 'hsl(var(--color-surface-2) / <alpha-value>)',
          3: 'hsl(var(--color-surface-3) / <alpha-value>)',
          4: 'hsl(var(--color-surface-4) / <alpha-value>)',
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      fontSize: {
        '2xs': 'var(--text-2xs)',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
      },

      fontWeight: {
        light: 'var(--font-light)',
        regular: 'var(--font-regular)',
        medium: 'var(--font-medium)',
        semibold: 'var(--font-semibold)',
        bold: 'var(--font-bold)',
        extrabold: 'var(--font-extrabold)',
      },

      lineHeight: {
        none: 'var(--leading-none)',
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)',
      },

      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },

      spacing: {
        px: 'var(--space-px)',
        0: 'var(--space-0)',
        0.5: 'var(--space-0-5)',
        1: 'var(--space-1)',
        1.5: 'var(--space-1-5)',
        2: 'var(--space-2)',
        2.5: 'var(--space-2-5)',
        3: 'var(--space-3)',
        3.5: 'var(--space-3-5)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        14: 'var(--space-14)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        36: 'var(--space-36)',
        40: 'var(--space-40)',
      },

      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },

      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        glass: 'var(--shadow-glass)',
        none: 'none',
      },

      transitionDuration: {
        instant: 'var(--duration-instant)',
        fast: 'var(--duration-fast)',
        DEFAULT: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },

      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        in: 'var(--ease-in)',
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
        bounce: 'var(--ease-bounce)',
        smooth: 'var(--ease-smooth)',
      },

      zIndex: {
        negative: 'var(--z-negative)',
        0: 'var(--z-base)',
        10: 'var(--z-10)',
        20: 'var(--z-20)',
        30: 'var(--z-30)',
        40: 'var(--z-40)',
        50: 'var(--z-50)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        overlay: 'var(--z-overlay)',
        tooltip: 'var(--z-tooltip)',
        notification: 'var(--z-notification)',
        max: 'var(--z-max)',
      },

      blur: {
        none: 'var(--blur-none)',
        sm: 'var(--blur-sm)',
        DEFAULT: 'var(--blur-base)',
        md: 'var(--blur-md)',
        lg: 'var(--blur-lg)',
        xl: 'var(--blur-xl)',
        '2xl': 'var(--blur-2xl)',
        '3xl': 'var(--blur-3xl)',
      },

      screens: {
        xs: 'var(--screen-xs)',
        sm: 'var(--screen-sm)',
        md: 'var(--screen-md)',
        lg: 'var(--screen-lg)',
        xl: 'var(--screen-xl)',
        '2xl': 'var(--screen-2xl)',
        '3xl': 'var(--screen-3xl)',
      },

      animation: {
        // Fade animations
        'fade-in': 'fade-in var(--duration-base) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-base) var(--ease-in)',

        // Slide animations
        'slide-in-up': 'slide-in-up var(--duration-base) var(--ease-out)',
        'slide-in-down': 'slide-in-down var(--duration-base) var(--ease-out)',
        'slide-in-left': 'slide-in-left var(--duration-base) var(--ease-out)',
        'slide-in-right': 'slide-in-right var(--duration-base) var(--ease-out)',

        // Scale animations
        'scale-in': 'scale-in var(--duration-base) var(--ease-out)',
        'scale-out': 'scale-out var(--duration-base) var(--ease-in)',

        // Spin
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',

        // Pulse
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        // Bounce
        'bounce-slow': 'bounce 2s infinite',
        'bounce-fast': 'bounce 0.5s infinite',

        // Glow
        glow: 'glow 2s ease-in-out infinite alternate',

        // Float
        float: 'float 3s ease-in-out infinite',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgb(var(--kodano-cyan-rgb) / 0.3)' },
          '100%': { boxShadow: '0 0 20px rgb(var(--kodano-cyan-rgb) / 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};