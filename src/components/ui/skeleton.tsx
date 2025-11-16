/**
 * Skeleton Loader Components
 * Stripe-level loading states with shimmer animations
 */

"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { easings } from "@/lib/design-system/motion";

// ============================================================================
// BASE SKELETON COMPONENT
// ============================================================================

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  animation?: "pulse" | "wave" | "shimmer";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "rectangular",
  animation = "shimmer",
  width,
  height,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
    rounded: "rounded-lg",
  };

  const animationClasses = {
    pulse: "animate-pulse bg-muted/50",
    wave: "bg-muted/50 animate-wave",
    shimmer: "bg-muted/50 relative overflow-hidden",
  };

  return (
    <div
      className={cn(
        animationClasses[animation],
        variantClasses[variant],
        className
      )}
      style={{
        width: width || (variant === "circular" ? 40 : undefined),
        height: height || (variant === "circular" ? 40 : variant === "text" ? 16 : undefined),
      }}
      {...props}
    >
      {animation === "shimmer" && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
    </div>
  );
}

// ============================================================================
// PREDEFINED SKELETON COMPONENTS
// ============================================================================

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonHeading() {
  return <Skeleton className="h-8 w-2/3 mb-4" />;
}

export function SkeletonAvatar() {
  return <Skeleton className="h-12 w-12 rounded-full" variant="circular" />;
}

export function SkeletonButton() {
  return <Skeleton className="h-10 w-24 rounded-md" />;
}

export function SkeletonImage({ aspectRatio = "video" }: { aspectRatio?: "square" | "video" | "portrait" }) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <Skeleton
      className={`w-full ${aspectClasses[aspectRatio]} rounded-lg`}
    />
  );
}

export function SkeletonCodeBlock() {
  return (
    <div className="rounded-lg border border-border p-4 space-y-2 bg-muted/30">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <SkeletonImage aspectRatio="video" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex gap-2">
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="w-full space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-border">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// NEW ADVANCED SKELETON COMPONENTS
// ============================================================================

export function SkeletonTestimonial() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-4" variant="circular" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonFeature() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Skeleton className="mb-4 h-12 w-12 rounded-lg" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function SkeletonPricingCard() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="text-center mb-6">
        <Skeleton className="h-8 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-48 mx-auto mb-4" />
        <Skeleton className="h-12 w-24 mx-auto mb-2" />
        <Skeleton className="h-3 w-16 mx-auto" />
      </div>
      <div className="space-y-3 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-5/6 mx-auto mb-2" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-10" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-36 rounded-md" />
            <Skeleton className="h-12 w-36 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LOADING SPINNER
// ============================================================================

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-2",
    xl: "h-12 w-12 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted border-t-accent",
        sizeClasses[size],
        className
      )}
    />
  );
}

// ============================================================================
// LOADING OVERLAY
// ============================================================================

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingOverlay({
  show,
  message,
  fullScreen = false,
  className,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex items-center justify-center bg-background/80 backdrop-blur-sm",
            fullScreen
              ? "fixed inset-0 z-50"
              : "absolute inset-0 z-10 rounded-lg",
            className
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <Spinner size="lg" />
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground"
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// PROGRESS BAR
// ============================================================================

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = "md",
  variant = "default",
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  };

  const variantClasses = {
    default: "bg-accent",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", sizeClasses[size])}>
        <motion.div
          className={cn(
            "h-full rounded-full relative",
            variantClasses[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: easings.emphasized }}
        >
          {animated && (
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE LOADER
// ============================================================================

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <Spinner size="xl" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Carregando...</p>
      </motion.div>
    </div>
  );
}