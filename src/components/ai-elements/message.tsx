"use client"

import { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const messageVariants = cva("flex gap-3 mb-4", {
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

const messageContentVariants = cva("rounded-2xl px-4 py-3 max-w-[85%] break-words", {
  variants: {
    variant: {
      contained: "bg-blue-600 text-white",
      flat: "bg-transparent text-gray-900 dark:text-gray-100",
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
