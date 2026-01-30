"use client"

import { ReactNode, CSSProperties } from "react"
import { StickToBottom, useStickToBottom } from "use-stick-to-bottom"
import { cn } from "@/lib/utils"

interface ConversationProps {
  children: ReactNode
  className?: string
}

export function Conversation({ children, className = "" }: ConversationProps) {
  return (
    <StickToBottom className={cn("flex-1 overflow-hidden", className)} resize="smooth">
      {children}
    </StickToBottom>
  )
}

interface ConversationContentProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function ConversationContent({ children, className = "", style }: ConversationContentProps) {
  const { scrollRef } = useStickToBottom()

  return (
    <div ref={scrollRef} className={cn("h-full overflow-y-auto", className)} style={style}>
      {children}
    </div>
  )
}

export function ConversationScrollButton() {
  const { isAtBottom, scrollToBottom } = useStickToBottom()

  if (isAtBottom) return null

  return (
    <button
      onClick={() => scrollToBottom()}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-emerald-200 text-emerald-600"
      aria-label="Scroll to bottom"
    >
      <svg
        className="w-5 h-5 text-emerald-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

export { useStickToBottom as useStickToBottomContext }
