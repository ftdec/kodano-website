"use client"

import { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { PromptSuggestion } from "@/lib/shared/schemas"

// Custom event for external triggers
export const ASSISTANT_WIDGET_CTA_EVENT = "assistant-widget-cta"

export interface AssistantWidgetCtaEventDetail {
  message?: string
}

const suggestionVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-[#00C8DC]/50 bg-[#3a6a7a]/60 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white/95 transition-all active:bg-[#00C8DC]/30 hover:bg-[#00C8DC]/30 active:border-[#00C8DC] hover:border-[#00C8DC] active:text-white hover:text-white active:shadow-md hover:shadow-md cursor-pointer touch-manipulation",
  {
    variants: {
      size: {
        sm: "text-xs px-2.5 py-1.5 sm:py-1 min-h-[2rem] sm:min-h-0",
        md: "text-sm px-3 py-1.5 min-h-[2.25rem] sm:min-h-0",
        lg: "text-base px-4 py-2 min-h-[2.5rem] sm:min-h-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface SuggestionProps extends VariantProps<typeof suggestionVariants> {
  id: string
  label: string
  message: string
  onSuggestionSelect: (suggestion: PromptSuggestion) => void
}

export function Suggestion({
  id,
  label,
  message,
  onSuggestionSelect,
  size,
}: SuggestionProps) {
  const handleClick = () => {
    onSuggestionSelect({ id, label, message })
  }

  return (
    <button onClick={handleClick} className={cn(suggestionVariants({ size }))}>
      {label}
    </button>
  )
}

interface SuggestionsProps {
  children: ReactNode
  className?: string
}

export function Suggestions({ children, className = "" }: SuggestionsProps) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
}
