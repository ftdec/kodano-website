/**
 * Kodano Design System Utilities v5.0
 * Advanced utility functions for building Stripe-level components
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

/**
 * Combines clsx and tailwind-merge for optimal class merging
 * Prevents style conflicts and ensures proper specificity
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Converts hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts hex color to RGBA string
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Adjusts color brightness
 */
export function adjustBrightness(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const adjust = (value: number) => {
    const adjusted = Math.round(value * factor);
    return Math.min(255, Math.max(0, adjusted));
  };

  const r = adjust(rgb.r);
  const g = adjust(rgb.g);
  const b = adjust(rgb.b);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

/**
 * Checks if code is running on server
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Checks if code is running on client
 */
export function isClient(): boolean {
  return !isServer();
}

/**
 * Gets current breakpoint based on window width
 */
export function getCurrentBreakpoint(): string {
  if (isServer()) return "desktop";

  const width = window.innerWidth;

  if (width < 640) return "mobile";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}

/**
 * Checks if current viewport matches breakpoint
 */
export function matchesBreakpoint(breakpoint: string): boolean {
  if (isServer()) return false;

  const query = {
    mobile: "(max-width: 639px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
  }[breakpoint];

  if (!query) return false;

  return window.matchMedia(query).matches;
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (isServer()) return false;

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
}

/**
 * Applies animation delay based on index for staggered effects
 */
export function staggerDelay(index: number, base = 50): number {
  return index * base;
}

/**
 * Creates CSS animation delay string
 */
export function animationDelay(index: number, base = 50): string {
  return `${staggerDelay(index, base)}ms`;
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Formats number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-BR").format(num);
}

/**
 * Formats currency in Brazilian Real
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

/**
 * Formats percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Truncates text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

/**
 * Generates unique ID for accessibility
 */
export function generateId(prefix = "kodano"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates ARIA label from multiple parts
 */
export function ariaLabel(...parts: (string | undefined)[]): string | undefined {
  const filtered = parts.filter(Boolean);
  return filtered.length > 0 ? filtered.join(", ") : undefined;
}

/**
 * Keyboard event helpers
 */
export const keyboard = {
  isEnter: (event: React.KeyboardEvent) => event.key === "Enter",
  isSpace: (event: React.KeyboardEvent) => event.key === " ",
  isEscape: (event: React.KeyboardEvent) => event.key === "Escape",
  isArrowUp: (event: React.KeyboardEvent) => event.key === "ArrowUp",
  isArrowDown: (event: React.KeyboardEvent) => event.key === "ArrowDown",
  isArrowLeft: (event: React.KeyboardEvent) => event.key === "ArrowLeft",
  isArrowRight: (event: React.KeyboardEvent) => event.key === "ArrowRight",
  isTab: (event: React.KeyboardEvent) => event.key === "Tab",
};

// ============================================================================
// FOCUS MANAGEMENT
// ============================================================================

/**
 * Traps focus within a container
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== "Tab") return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  container.addEventListener("keydown", handleKeyDown);

  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener("keydown", handleKeyDown);
  };
}

// ============================================================================
// SCROLL UTILITIES
// ============================================================================

/**
 * Smoothly scrolls to element
 */
export function scrollToElement(
  element: HTMLElement | string,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" }
): void {
  const el = typeof element === "string"
    ? document.querySelector(element)
    : element;

  el?.scrollIntoView(options);
}

/**
 * Gets scroll percentage
 */
export function getScrollPercentage(): number {
  if (isServer()) return 0;

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;

  if (scrollHeight <= 0) return 100;
  return Math.min((scrollPosition / scrollHeight) * 100, 100);
}

/**
 * Locks body scroll
 */
export function lockScroll(): () => void {
  if (isServer()) return () => {};

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const originalStyle = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  };

  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.overflow = originalStyle.overflow;
    document.body.style.paddingRight = originalStyle.paddingRight;
  };
}

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validates Brazilian phone number
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 11 || cleaned.length === 10;
}

/**
 * Validates URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// DATE UTILITIES
// ============================================================================

/**
 * Formats date in Brazilian format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR").format(d);
}

/**
 * Gets relative time
 */
export function getRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} dia${days > 1 ? "s" : ""} atrás`;
  if (hours > 0) return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
  return "agora mesmo";
}

// ============================================================================
// COMPONENT UTILITIES
// ============================================================================

/**
 * Merges refs for forwarding
 */
export function mergeRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Creates context with better error handling
 */
export function createContext<T>(name: string) {
  const Context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    return context;
  }

  return [Context, useContext] as const;
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Memoizes expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache = new Map();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy loads images
 */
export function lazyLoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ============================================================================
// EXPORT
// ============================================================================

export const utils = {
  cn,
  color: {
    hexToRgb,
    hexToRgba,
    adjustBrightness,
  },
  responsive: {
    isServer,
    isClient,
    getCurrentBreakpoint,
    matchesBreakpoint,
  },
  animation: {
    prefersReducedMotion,
    staggerDelay,
    animationDelay,
  },
  format: {
    number: formatNumber,
    currency: formatCurrency,
    percentage: formatPercentage,
    truncate,
    date: formatDate,
    relativeTime: getRelativeTime,
  },
  a11y: {
    generateId,
    ariaLabel,
    keyboard,
    trapFocus,
  },
  scroll: {
    scrollToElement,
    getScrollPercentage,
    lockScroll,
  },
  timing: {
    debounce,
    throttle,
  },
  validation: {
    isValidEmail,
    isValidPhone,
    isValidUrl,
  },
  component: {
    mergeRefs,
    createContext,
  },
  performance: {
    memoize,
    lazyLoadImage,
  },
} as const;

// Also export individually for convenience
export {
  // Most used utilities
  hexToRgba,
  prefersReducedMotion,
  formatNumber,
  formatCurrency,
  debounce,
  throttle,
  isValidEmail,
  mergeRefs,
};

// Import React for createContext utility
import React from "react";