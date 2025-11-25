"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, storageKey, ...props }: ThemeProviderProps) {
  // Force light theme and prevent any dark mode
  React.useEffect(() => {
    // Remove dark class if it exists
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
      
      // Prevent localStorage from storing dark theme
      if (typeof window !== 'undefined' && window.localStorage) {
        const themeKey = storageKey || 'theme';
        const stored = localStorage.getItem(themeKey);
        if (stored === 'dark' || stored === 'system') {
          localStorage.setItem(themeKey, 'light');
        }
      }
    }
  }, [storageKey]);

  // Force light theme - override any props
  const forcedProps: ThemeProviderProps = {
    ...props,
    storageKey,
    forcedTheme: "light",
    defaultTheme: "light",
    enableSystem: false,
  };

  return (
    <NextThemesProvider {...forcedProps}>
      {children}
    </NextThemesProvider>
  );
}
