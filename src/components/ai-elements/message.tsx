"use client"

import { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const messageVariants = cva("flex gap-2 sm:gap-3 mb-3 sm:mb-4", {
  variants: {
    from: {
      user: "justify-end",
      assistant: "justify-start",
    },
  },
  defaultVariants: {
    from: "user",
  },
})

interface MessageProps extends VariantProps<typeof messageVariants> {
  children: ReactNode
  from?: "user" | "assistant"
}

export function Message({ children, from }: MessageProps) {
  return <div className={cn(messageVariants({ from }))}>{children}</div>
}

const messageContentVariants = cva("rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 max-w-[90%] sm:max-w-[85%] break-words text-sm sm:text-base leading-relaxed", {
  variants: {
    variant: {
      contained: "bg-[#00C8DC] text-white",
      flat: "bg-[#2a5a6a]/40 text-white/95",
    },
  },
  defaultVariants: {
    variant: "contained",
  },
})

interface MessageContentProps extends VariantProps<typeof messageContentVariants> {
  children: ReactNode
}

export function MessageContent({ children, variant }: MessageContentProps) {
  return <div className={cn(messageContentVariants({ variant }))}>{children}</div>
}
