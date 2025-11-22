/**
 * Button Component v2.0
 * Stripe-level button with advanced animations and states
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Import design system
import { easings, durations, springs } from "@/lib/design-system/motion";

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

const buttonVariants = cva(
  // Base styles - Stripe-level polish
  [
    "relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "select-none touch-none",
    // Icon handling
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Text rendering
    "subpixel-antialiased",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary variants
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:shadow-lg",
          "active:bg-primary/80",
          "focus-visible:ring-primary",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80 hover:shadow-md",
          "active:bg-secondary/70",
          "focus-visible:ring-secondary",
        ].join(" "),

        // Outline variant - Stripe style
        outline: [
          "border-2 border-border bg-transparent",
          "hover:bg-accent/5 hover:border-accent",
          "active:bg-accent/10",
          "focus-visible:ring-accent",
          "dark:border-border dark:hover:bg-accent/10",
        ].join(" "),

        // Ghost variant - subtle interaction
        ghost: [
          "bg-transparent",
          "hover:bg-accent/10 hover:text-accent-foreground",
          "active:bg-accent/20",
          "focus-visible:ring-accent",
        ].join(" "),

        // Destructive variant
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90 hover:shadow-lg",
          "active:bg-destructive/80",
          "focus-visible:ring-destructive",
        ].join(" "),

        // Link variant - text button
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary/80",
          "focus-visible:ring-0 focus-visible:underline",
        ].join(" "),

        // Kodano brand variants
        kodano: [
          "bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] text-white",
          "hover:from-[#1B263B] hover:to-[#415A77] hover:shadow-xl",
          "active:from-[#0D1B2A] active:to-[#1B263B]",
          "focus-visible:ring-[#415A77]",
          "shadow-lg shadow-primary/20",
        ].join(" "),

        "kodano-outline": [
          "border-2 border-[#0D1B2A] bg-transparent text-[#0D1B2A]",
          "hover:bg-[#0D1B2A] hover:text-white hover:shadow-lg",
          "active:bg-[#1B263B] active:border-[#1B263B]",
          "focus-visible:ring-[#415A77]",
          "dark:border-[#778DA9] dark:text-[#778DA9]",
          "dark:hover:bg-[#778DA9] dark:hover:text-black",
        ].join(" "),

        // Premium gradient variant
        gradient: [
          "bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%]",
          "text-white animate-gradient",
          "hover:shadow-2xl hover:scale-[1.02]",
          "active:scale-[0.98]",
          "focus-visible:ring-accent",
        ].join(" "),
      },

      size: {
        xs: "h-7 px-2.5 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3 text-xs rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 px-4 text-sm rounded-lg [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-6 text-base rounded-lg [&_svg:not([class*='size-'])]:size-5",
        xl: "h-14 px-8 text-lg rounded-xl [&_svg:not([class*='size-'])]:size-6",

        // Icon sizes
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-md": "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-14 rounded-xl [&_svg:not([class*='size-'])]:size-6",
      },

      // Loading state
      loading: {
        true: "cursor-wait",
        false: "",
      },

      // Full width
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
      fullWidth: false,
    },
  }
);

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const buttonMotionVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

// Shimmer effect motion
const shimmerMotion = {
  initial: { x: "-100%" },
  hover: {
    x: "100%",
    transition: {
      duration: 0.5,
      ease: easings.default,
    },
  },
};

// Loading spinner motion
const spinnerMotion = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shimmer?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      shimmer = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const showShimmer = shimmer && variant !== "link" && variant !== "ghost";

    // Determine if button should have motion
    const hasMotion = !asChild && !variant?.includes("link");

    const buttonContent = (
      <>
        {/* Loading spinner */}
        {loading && (
          <motion.div
            variants={spinnerMotion}
            animate="animate"
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
          >
            <Loader2 className="size-4 animate-spin" />
          </motion.div>
        )}

        {/* Button content */}
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center gap-2",
            loading && "invisible"
          )}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}

          {loading && loadingText ? loadingText : children}

          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>

        {/* Shimmer effect overlay */}
        {showShimmer && (
          <motion.span
            className="absolute inset-0 -z-10 block rounded-inherit"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            variants={shimmerMotion}
            initial="initial"
            whileHover="hover"
          />
        )}

        {/* Focus ring enhancement */}
        <span className="absolute inset-0 rounded-inherit ring-0 ring-offset-0 ring-offset-background transition-all duration-200" />
      </>
    );

    // For asChild, extract text content from Link children
    // When using asChild with Link, children is the Link element itself
    // We need to extract the actual text/content from the Link
    const getLinkContent = () => {
      if (React.isValidElement(children)) {
        const props = children.props as { children?: React.ReactNode };
        if (props?.children) {
          // Extract children from the Link element (or any child element)
          return props.children;
        }
      }
      return children;
    };

    const linkContent = asChild ? getLinkContent() : children;

    // For asChild, we need to wrap content properly
    const asChildContent = (
      <>
        {/* Loading spinner */}
        {loading && (
          <motion.div
            variants={spinnerMotion}
            animate="animate"
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit"
          >
            <Loader2 className="size-4 animate-spin" />
          </motion.div>
        )}

        {/* Content wrapper - simpler for asChild */}
        <span className={cn("relative z-10 inline-flex items-center justify-center gap-2", loading && "invisible")}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {loading && loadingText ? loadingText : linkContent}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>

        {/* Shimmer effect overlay */}
        {showShimmer && (
          <motion.span
            className="absolute inset-0 -z-10 block rounded-inherit"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            variants={shimmerMotion}
            initial="initial"
            whileHover="hover"
          />
        )}

        {/* Focus ring enhancement */}
        <span className="absolute inset-0 rounded-inherit ring-0 ring-offset-0 ring-offset-background transition-all duration-200" />
      </>
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, loading, fullWidth, className }))}
          {...props}
        >
          {asChildContent}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, loading, fullWidth, className }))}
        disabled={isDisabled}
        variants={hasMotion ? buttonMotionVariants : undefined}
        initial={hasMotion ? "rest" : undefined}
        whileHover={hasMotion && !isDisabled ? "hover" : undefined}
        whileTap={hasMotion && !isDisabled ? "tap" : undefined}
        {...(props as any)}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// ============================================================================
// BUTTON GROUP COMPONENT
// ============================================================================

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", attached = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          attached && orientation === "horizontal" && "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0",
          attached && orientation === "vertical" && "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:border-t-0",
          !attached && "gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

// ============================================================================
// ICON BUTTON COMPONENT
// ============================================================================

interface IconButtonProps extends ButtonProps {
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "icon-md", className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("rounded-full", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, ButtonGroup, IconButton, buttonVariants };
export type { ButtonGroupProps, IconButtonProps };