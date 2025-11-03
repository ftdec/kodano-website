import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "frosted" | "tinted" | "subtle";
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
  ...props
}: GlassCardProps) {
  const variants = {
    default:
      "bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg",
    frosted:
      "bg-background/40 backdrop-blur-2xl border border-white/10 shadow-2xl",
    tinted:
      "bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl border border-border/30 shadow-xl",
    subtle:
      "bg-background/80 backdrop-blur-md border border-border/40 shadow-md",
  };

  const hoverEffect = hover
    ? "transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-accent/50"
    : "";

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        variants[variant],
        hoverEffect,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassPanel({
  children,
  className = "",
  glow = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl bg-background/50 backdrop-blur-lg border border-border/50 p-6",
        glow &&
          "before:absolute before:inset-0 before:-z-10 before:blur-2xl before:bg-gradient-to-r before:from-primary/20 before:to-accent/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function GlassButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: GlassButtonProps) {
  const variants = {
    primary:
      "bg-primary/20 hover:bg-primary/30 border-primary/50 text-primary-foreground",
    secondary:
      "bg-secondary/20 hover:bg-secondary/30 border-secondary/50 text-secondary-foreground",
    accent:
      "bg-accent/20 hover:bg-accent/30 border-accent/50 text-accent-foreground",
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg backdrop-blur-xl border transition-all duration-300 font-medium",
        "hover:shadow-lg hover:scale-105 active:scale-95",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

export function GlassBadge({
  children,
  className = "",
  color = "blue",
  ...props
}: GlassBadgeProps) {
  const colors = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
    orange:
      "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400",
    red: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-lg border",
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Floating glass orb for backgrounds
export function GlassOrb({
  className = "",
  size = "md",
  color = "primary",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "secondary";
}) {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[32rem] h-[32rem]",
  };

  const colors = {
    primary: "bg-primary/20",
    accent: "bg-accent/20",
    secondary: "bg-secondary/20",
  };

  return (
    <div
      className={cn(
        "rounded-full blur-3xl opacity-50 animate-pulse",
        sizes[size],
        colors[color],
        className
      )}
      style={{
        animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );
}

// Glass container with gradient border
export function GlassContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-2xl p-[1px]", className)}>
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-sm" />

      {/* Content */}
      <div className="relative rounded-2xl bg-background/80 backdrop-blur-xl p-6">
        {children}
      </div>
    </div>
  );
}
