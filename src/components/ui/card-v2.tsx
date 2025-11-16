/**
 * Card Component v2.0
 * Stripe-level cards with advanced hover effects and animations
 */

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

// Import design system
import { easings, durations } from "@/lib/design-system/motion";
import { shadows } from "@/lib/design-system/tokens";

// ============================================================================
// CARD VARIANTS
// ============================================================================

const cardVariants = {
  default: {
    scale: 1,
    y: 0,
    boxShadow: shadows.sm,
    transition: {
      duration: durations.normal,
      ease: easings.emphasized,
    },
  },
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: shadows.xl,
    transition: {
      duration: durations.normal,
      ease: easings.spring,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: shadows.xs,
    transition: {
      duration: durations.fast,
    },
  },
} satisfies Variants;

const glowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: durations.slow },
  },
} satisfies Variants;

const shineVariants = {
  initial: { x: "-100%", opacity: 0 },
  hover: {
    x: "100%",
    opacity: [0, 1, 0],
    transition: {
      duration: 0.5,
      ease: "linear",
    },
  },
} satisfies Variants;

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glowOnHover?: boolean;
  shineOnHover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      hoverable = false,
      glowOnHover = false,
      shineOnHover = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-card text-card-foreground",
          hoverable && "cursor-pointer",
          className
        )}
        variants={hoverable ? cardVariants : undefined}
        initial={hoverable ? "default" : undefined}
        whileHover={hoverable ? "hover" : undefined}
        whileTap={hoverable ? "tap" : undefined}
        {...(props as any)}
      >
        {/* Glow effect */}
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 -z-10 opacity-0"
            style={{
              background: "radial-gradient(circle at center, rgba(65, 90, 119, 0.15) 0%, transparent 70%)",
            }}
            variants={glowVariants}
            initial="initial"
            whileHover="hover"
          />
        )}

        {/* Shine effect */}
        {shineOnHover && (
          <motion.div
            className="absolute inset-0 -z-10"
            variants={shineVariants}
            initial="initial"
            whileHover="hover"
          >
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        )}

        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// ============================================================================
// CARD HEADER COMPONENT
// ============================================================================

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ============================================================================

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// ============================================================================
// CARD CONTENT COMPONENT
// ============================================================================

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

// ============================================================================
// CARD FOOTER COMPONENT
// ============================================================================

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// ============================================================================
// FEATURE CARD COMPONENT
// ============================================================================

interface FeatureCardProps extends Omit<CardProps, "children"> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  badge?: string;
  highlight?: boolean;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      href,
      badge,
      highlight = false,
      className,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        <CardHeader>
          <div className="flex items-start justify-between">
            {icon && (
              <motion.div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg",
                  highlight
                    ? "bg-gradient-to-br from-accent/20 to-primary/20"
                    : "bg-accent/10"
                )}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {icon}
              </motion.div>
            )}
            {badge && (
              <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                {badge}
              </span>
            )}
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </CardContent>
        {href && (
          <CardFooter>
            <motion.span
              className="inline-flex items-center text-sm font-medium text-primary hover:text-accent"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Saiba mais
              <ArrowRight className="ml-1 h-4 w-4" />
            </motion.span>
          </CardFooter>
        )}
      </>
    );

    return (
      <Card
        ref={ref}
        hoverable
        glowOnHover={highlight}
        shineOnHover
        className={cn(
          highlight && "border-accent/50 bg-gradient-to-br from-card to-accent/5",
          className
        )}
        {...props}
      >
        {href ? (
          <a href={href} className="block h-full">
            {content}
          </a>
        ) : (
          content
        )}
      </Card>
    );
  }
);

FeatureCard.displayName = "FeatureCard";

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

interface MetricCardProps extends Omit<CardProps, "children"> {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: React.ReactNode;
  sparkline?: boolean;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      change,
      icon,
      sparkline = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        hoverable
        shineOnHover
        className={className}
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {icon && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground"
              >
                {icon}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easings.emphasized }}
            className="mt-2"
          >
            <p className="text-3xl font-bold tracking-tight">{value}</p>
          </motion.div>

          {change && (
            <div className="mt-4 flex items-center space-x-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  change.type === "increase"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                )}
              >
                {change.type === "increase" ? "+" : "-"}{Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground">vs último mês</span>
            </div>
          )}

          {sparkline && (
            <div className="mt-4 h-8 w-full">
              {/* Sparkline placeholder - would integrate with chart library */}
              <svg className="h-full w-full" viewBox="0 0 100 32">
                <motion.polyline
                  points="0,20 20,15 40,18 60,10 80,14 100,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: easings.emphasized }}
                />
              </svg>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

MetricCard.displayName = "MetricCard";

// ============================================================================
// PRICING CARD COMPONENT
// ============================================================================

interface PricingCardProps extends Omit<CardProps, "children"> {
  title: string;
  description: string;
  price: {
    amount: string;
    period?: string;
  };
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  popular?: boolean;
}

const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      title,
      description,
      price,
      features,
      cta,
      popular = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        hoverable
        glowOnHover
        shineOnHover={popular}
        className={cn(
          popular && "border-accent shadow-lg",
          "relative",
          className
        )}
        {...props}
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <Sparkles className="h-3 w-3" />
              Recomendado
            </span>
          </div>
        )}

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <div className="mb-8">
            <span className="text-4xl font-bold">{price.amount}</span>
            {price.period && (
              <span className="text-muted-foreground">/{price.period}</span>
            )}
          </div>

          <ul className="space-y-3 text-sm">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: durations.normal,
                }}
                className="flex items-center"
              >
                <svg
                  className="mr-3 h-4 w-4 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex-col space-y-4">
          <a href={cta.href} className="w-full">
            <motion.button
              className={cn(
                "w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                popular
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {cta.label}
            </motion.button>
          </a>
        </CardFooter>
      </Card>
    );
  }
);

PricingCard.displayName = "PricingCard";

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FeatureCard,
  MetricCard,
  PricingCard,
};

export type {
  CardProps,
  FeatureCardProps,
  MetricCardProps,
  PricingCardProps,
};