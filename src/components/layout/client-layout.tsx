"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { ChatWidget } from "@/components/chat";
import { ErrorBoundary } from "@/components/error-boundary";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  // Force light mode on mount and prevent any dark mode
  useEffect(() => {
    // Remove dark class immediately
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
    
    // Watch for any attempts to add dark class and remove it
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const html = document.documentElement;
          if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            html.style.colorScheme = 'light';
          }
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="kodano-theme"
    >
      <I18nProvider locale="pt">
        {children}
        <ErrorBoundary level="component">
          <ChatWidget />
        </ErrorBoundary>
      </I18nProvider>
    </ThemeProvider>
  );
}
