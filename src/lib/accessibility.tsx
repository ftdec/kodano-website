/**
 * Accessibility Utilities and Components
 * Stripe-level accessibility for inclusive user experience
 */

"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Eye, EyeOff, Keyboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button-v2";

// ============================================================================
// ACCESSIBILITY TYPES
// ============================================================================

interface AccessibilityPreferences {
  reduceMotion: boolean;
  highContrast: boolean;
  fontSize: "normal" | "large" | "xlarge";
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
  colorBlindMode: "none" | "protanopia" | "deuteranopia" | "tritanopia";
}

interface AriaLiveRegionProps {
  message: string;
  politeness?: "polite" | "assertive";
  atomic?: boolean;
  relevant?: "additions" | "removals" | "text" | "all";
  children?: React.ReactNode;
}

// ============================================================================
// ACCESSIBILITY CONTEXT
// ============================================================================

const AccessibilityContext = React.createContext<{
  preferences: AccessibilityPreferences;
  updatePreference: (key: keyof AccessibilityPreferences, value: any) => void;
  resetPreferences: () => void;
}>({
  preferences: {
    reduceMotion: false,
    highContrast: false,
    fontSize: "normal",
    screenReaderMode: false,
    keyboardNavigation: true,
    focusIndicator: true,
    colorBlindMode: "none",
  },
  updatePreference: () => {},
  resetPreferences: () => {},
});

// ============================================================================
// ACCESSIBILITY PROVIDER
// ============================================================================

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    // Load preferences from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("a11y-preferences");
      if (saved) {
        return JSON.parse(saved);
      }
    }

    // Check system preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prefersHighContrast =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-contrast: high)").matches;

    return {
      reduceMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
      fontSize: "normal",
      screenReaderMode: false,
      keyboardNavigation: true,
      focusIndicator: true,
      colorBlindMode: "none",
    };
  });

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem("a11y-preferences", JSON.stringify(preferences));

    // Apply preferences to document
    const root = document.documentElement;

    // Motion preferences
    if (preferences.reduceMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }

    // Contrast preferences
    if (preferences.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Font size preferences
    root.setAttribute("data-font-size", preferences.fontSize);

    // Focus indicator
    if (preferences.focusIndicator) {
      root.classList.add("focus-visible");
    } else {
      root.classList.remove("focus-visible");
    }

    // Color blind mode
    if (preferences.colorBlindMode !== "none") {
      root.setAttribute("data-color-blind", preferences.colorBlindMode);
    } else {
      root.removeAttribute("data-color-blind");
    }
  }, [preferences]);

  const updatePreference = useCallback(
    (key: keyof AccessibilityPreferences, value: any) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetPreferences = useCallback(() => {
    setPreferences({
      reduceMotion: false,
      highContrast: false,
      fontSize: "normal",
      screenReaderMode: false,
      keyboardNavigation: true,
      focusIndicator: true,
      colorBlindMode: "none",
    });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ preferences, updatePreference, resetPreferences }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

// ============================================================================
// ACCESSIBILITY HOOKS
// ============================================================================

export function useAccessibility() {
  return React.useContext(AccessibilityContext);
}

export function useReducedMotion() {
  const { preferences } = useAccessibility();
  return preferences.reduceMotion;
}

export function useFocusTrap(isActive = true) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState("");

  const announce = useCallback((message: string, delay = 100) => {
    setTimeout(() => {
      setAnnouncement(message);
      setTimeout(() => setAnnouncement(""), 1000);
    }, delay);
  }, []);

  return { announcement, announce };
}

// ============================================================================
// SKIP NAVIGATION
// ============================================================================

export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
    >
      Pular para o conteúdo principal
    </a>
  );
}

// ============================================================================
// ARIA LIVE REGION
// ============================================================================

export function AriaLiveRegion({
  message,
  politeness = "polite",
  atomic = true,
  relevant = "all",
  children,
}: AriaLiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className="sr-only"
    >
      {message}
      {children}
    </div>
  );
}

// ============================================================================
// ACCESSIBLE TOOLTIP
// ============================================================================

interface AccessibleTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function AccessibleTooltip({
  content,
  children,
  side = "top",
}: AccessibleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = React.useId();

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby={isVisible ? tooltipId : undefined}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "absolute z-50 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg",
              {
                "bottom-full left-1/2 mb-2 -translate-x-1/2": side === "top",
                "top-full left-1/2 mt-2 -translate-x-1/2": side === "bottom",
                "right-full top-1/2 mr-2 -translate-y-1/2": side === "left",
                "left-full top-1/2 ml-2 -translate-y-1/2": side === "right",
              }
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// KEYBOARD NAVIGATION INDICATOR
// ============================================================================

export function KeyboardNavigationIndicator() {
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsKeyboardNav(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardNav(true);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {isKeyboardNav && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm text-white shadow-lg"
        >
          <Keyboard className="h-4 w-4" />
          Navegação por teclado ativa
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// ACCESSIBILITY PANEL
// ============================================================================

export function AccessibilityPanel() {
  const { preferences, updatePreference, resetPreferences } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Abrir painel de acessibilidade"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-80 bg-card shadow-2xl"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="border-b p-6">
                <h2 className="text-xl font-bold">Acessibilidade</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Personalize sua experiência
                </p>
              </div>

              {/* Options */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Reduce Motion */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium">Reduzir Movimento</span>
                      <input
                        type="checkbox"
                        checked={preferences.reduceMotion}
                        onChange={(e) =>
                          updatePreference("reduceMotion", e.target.checked)
                        }
                        className="h-4 w-4"
                      />
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Desativa animações e transições
                    </p>
                  </div>

                  {/* High Contrast */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium">Alto Contraste</span>
                      <input
                        type="checkbox"
                        checked={preferences.highContrast}
                        onChange={(e) =>
                          updatePreference("highContrast", e.target.checked)
                        }
                        className="h-4 w-4"
                      />
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Aumenta o contraste das cores
                    </p>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="text-sm font-medium">Tamanho da Fonte</label>
                    <div className="mt-2 space-y-2">
                      {["normal", "large", "xlarge"].map((size) => (
                        <label key={size} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="fontSize"
                            value={size}
                            checked={preferences.fontSize === size}
                            onChange={() =>
                              updatePreference(
                                "fontSize",
                                size as "normal" | "large" | "xlarge"
                              )
                            }
                          />
                          <span className="text-sm capitalize">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Color Blind Mode */}
                  <div>
                    <label className="text-sm font-medium">Modo Daltonismo</label>
                    <select
                      value={preferences.colorBlindMode}
                      onChange={(e) =>
                        updatePreference("colorBlindMode", e.target.value)
                      }
                      className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="none">Nenhum</option>
                      <option value="protanopia">Protanopia</option>
                      <option value="deuteranopia">Deuteranopia</option>
                      <option value="tritanopia">Tritanopia</option>
                    </select>
                  </div>

                  {/* Focus Indicator */}
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium">Indicador de Foco</span>
                      <input
                        type="checkbox"
                        checked={preferences.focusIndicator}
                        onChange={(e) =>
                          updatePreference("focusIndicator", e.target.checked)
                        }
                        className="h-4 w-4"
                      />
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Mostra bordas ao focar elementos
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-6">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetPreferences}
                    className="flex-1"
                  >
                    Redefinir
                  </Button>
                  <Button
                    variant="kodano"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================================
// FOCUS MANAGEMENT UTILITIES
// ============================================================================

export function manageFocus(element: HTMLElement | null) {
  if (!element) return;

  // Store the currently focused element
  const previouslyFocused = document.activeElement as HTMLElement;

  // Focus the target element
  element.focus();

  // Return a function to restore focus
  return () => {
    previouslyFocused?.focus();
  };
}

export function getTabbableElements(container: HTMLElement): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return Array.from(container.querySelectorAll(selector));
}

export function getFirstAndLastTabbable(container: HTMLElement) {
  const tabbables = getTabbableElements(container);
  return {
    first: tabbables[0],
    last: tabbables[tabbables.length - 1],
  };
}