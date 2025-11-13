import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // New variants for Kodano brand
        kodano: "bg-[#002A35] hover:bg-[#00C8DC] text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-accent/30",
        "kodano-outline": "border-[#002A35] dark:border-white bg-transparent hover:bg-accent/10 hover:border-[#00C8DC] hover:text-[#00C8DC] text-[#002A35] dark:text-white dark:hover:text-accent backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        md: "h-10 px-5 py-2",
        lg: "h-12 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-md": "size-10",
        "icon-lg": "size-12",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
