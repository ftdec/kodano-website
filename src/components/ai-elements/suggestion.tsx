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
  "inline-flex items-center justify-center rounded-full border border-gray-300 bg-white/70 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-white hover:border-blue-500 hover:text-blue-600 hover:shadow-md cursor-pointer",
  {
    variants: {
      size: {
        sm: "text-xs px-2.5 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
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
