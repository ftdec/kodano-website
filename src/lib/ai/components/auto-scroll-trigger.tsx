"use client"

import { useEffect } from "react"
import type { UIMessage } from "ai"
import { useStickToBottomContext } from "@/components/ai-elements/conversation"

interface AutoScrollTriggerProps {
  messages: UIMessage[]
  isStreaming: boolean
  shouldShowLoadingState: boolean
}

export function AutoScrollTrigger({
  messages,
  isStreaming,
  shouldShowLoadingState,
}: AutoScrollTriggerProps) {
  const { scrollToBottom } = useStickToBottomContext()

  useEffect(() => {
    // Scroll to bottom when messages change or loading state changes
    scrollToBottom()
  }, [messages, isStreaming, shouldShowLoadingState, scrollToBottom])

  return null
}
