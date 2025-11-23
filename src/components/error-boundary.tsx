/**
 * Error Boundary Components
 * Stripe-level error handling with graceful fallbacks
 */

"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button-v2";
import { easings, durations } from "@/lib/design-system/motion";

// ============================================================================
// ERROR BOUNDARY TYPES
// ============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: "page" | "section" | "component";
}

// ============================================================================
// ERROR FALLBACK COMPONENTS
// ============================================================================

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
  errorId: string;
  level?: "page" | "section" | "component";
  retryCount: number;
  maxRetries: number;
}

function PageErrorFallback({ error, resetError, errorId }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: durations.normal, ease: easings.emphasized }}
        className="max-w-md w-full"
      >
        <div className="rounded-2xl border bg-card p-8 text-center shadow-xl">
          {/* Error Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10"
          >
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </motion.div>

          {/* Error Message */}
          <h1 className="mb-2 text-2xl font-bold">Algo deu errado</h1>
          <p className="mb-6 text-muted-foreground">
            Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando na solução.
          </p>

          {/* Error Details (Dev only) */}
          {process.env.NODE_ENV === "development" && error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 rounded-lg bg-muted/50 p-4 text-left"
            >
              <p className="mb-2 text-xs font-mono text-muted-foreground">
                Error ID: {errorId}
              </p>
              <p className="text-xs font-mono text-red-500">
                {error.message}
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = "/"}
            >
              <Home className="mr-2 h-4 w-4" />
              Página Inicial
            </Button>
            <Button
              variant="kodano"
              size="sm"
              onClick={resetError}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar Novamente
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SectionErrorFallback({ resetError, retryCount, maxRetries }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.normal }}
      className="py-12"
    >
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-red-900 dark:text-red-100">
              Erro ao carregar seção
            </h3>
            <p className="mb-4 text-sm text-red-700 dark:text-red-300">
              Esta seção não pôde ser carregada. Você pode tentar novamente ou continuar navegando.
            </p>
            {retryCount >= maxRetries && (
              <p className="mb-4 text-xs text-red-600 dark:text-red-400">
                Múltiplas tentativas falharam. Por favor, recarregue a página.
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={resetError}
              disabled={retryCount >= maxRetries}
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              {retryCount >= maxRetries ? "Limite de tentativas excedido" : "Tentar Novamente"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComponentErrorFallback({ resetError }: ErrorFallbackProps) {
  return (
    <div className="rounded-md border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 p-4">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Componente temporariamente indisponível
        </p>
        <button
          onClick={resetError}
          className="ml-auto text-xs text-yellow-600 hover:text-yellow-700 underline"
        >
          Recarregar
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN ERROR BOUNDARY CLASS
// ============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;
  private previousResetKeys: Array<string | number> = [];

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId(),
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    this.logErrorToService(error, errorInfo);

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
      errorId: this.generateErrorId(),
    });

    // Auto-retry after delay if configured
    if (this.state.retryCount < (this.props.maxRetries || 3)) {
      this.scheduleReset(5000); // Retry after 5 seconds
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset on prop changes if configured
    if (hasError && prevProps.children !== this.props.children && resetOnPropsChange) {
      this.resetError();
    }

    // Reset on resetKeys change
    if (resetKeys && !this.arraysEqual(resetKeys, this.previousResetKeys)) {
      this.previousResetKeys = resetKeys;
      if (hasError) {
        this.resetError();
      }
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }
  }

  private generateErrorId(): string {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private arraysEqual(a: Array<string | number>, b: Array<string | number>): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  private scheduleReset(delay: number) {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState((prevState) => ({
        retryCount: prevState.retryCount + 1,
      }));
      this.resetError();
    }, delay);
  }

  private logErrorToService(error: Error, errorInfo: ErrorInfo) {
    // In production, send to error monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to Sentry, LogRocket, etc.
      console.error("Error logged to monitoring service:", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "unknown",
      });
    } else {
      console.error("Error Boundary Caught:", error, errorInfo);
    }
  }

  private resetError = () => {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  render() {
    const { hasError, error, errorId, retryCount } = this.state;
    const { children, fallback, level = "component", maxRetries = 3 } = this.props;

    if (hasError) {
      // Custom fallback provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Default fallbacks based on error level
      const errorProps: ErrorFallbackProps = {
        error,
        resetError: this.resetError,
        errorId,
        level,
        retryCount,
        maxRetries,
      };

      switch (level) {
        case "page":
          return <PageErrorFallback {...errorProps} />;
        case "section":
          return <SectionErrorFallback {...errorProps} />;
        case "component":
        default:
          return <ComponentErrorFallback {...errorProps} />;
      }
    }

    return children;
  }
}

// ============================================================================
// ERROR BOUNDARY HOOK
// ============================================================================

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return {
    throwError: setError,
    clearError: () => setError(null),
  };
}

// ============================================================================
// ASYNC ERROR BOUNDARY
// ============================================================================

interface AsyncBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export function AsyncBoundary({ children, fallback, errorFallback }: AsyncBoundaryProps) {
  return (
    <ErrorBoundary level="component" fallback={errorFallback}>
      <React.Suspense fallback={fallback || <ComponentLoadingState />}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );
}

// ============================================================================
// LOADING STATES
// ============================================================================

function ComponentLoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <RefreshCw className="h-6 w-6 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

// ============================================================================
// WITH ERROR BOUNDARY HOC
// ============================================================================

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: ErrorBoundaryProps
) {
  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}