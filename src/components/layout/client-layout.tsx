"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { AIAssistantWidget } from "@/lib/ai/components/ai-assistant-widget";
import { ErrorBoundary } from "@/components/error-boundary";

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider locale="pt">
        {children}
        <ErrorBoundary level="component">
          <AIAssistantWidget />
        </ErrorBoundary>
      </I18nProvider>
    </ThemeProvider>
  );
}
