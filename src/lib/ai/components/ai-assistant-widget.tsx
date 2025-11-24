"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"
import { useI18n } from "@/lib/i18n/context"
import {
  ASSISTANT_WIDGET_CTA_EVENT,
  type AssistantWidgetCtaEventDetail,
} from "@/components/ai-elements/suggestion"
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input"
import type { PromptSuggestion } from "@/lib/shared/schemas"
import {
  createAssistantGreetingMessage,
  getAnimatedBaseText,
} from "@/lib/ai/pure-functions/message-helpers"
import {
  getToolLoadingCopy,
  isAssistantTextStreaming,
} from "@/lib/ai/pure-functions/tool-helpers"
import { FloatingChatButton } from "@/lib/ai/components/floating-chat-button"
import { ChatSidebar } from "@/lib/ai/components/chat-sidebar"
import { ConversationSection } from "@/lib/ai/components/conversation-section"
import { InputSection } from "@/lib/ai/components/input-section"

export function AIAssistantWidget() {
  const { dictionary, locale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [lastLoadingCopy, setLastLoadingCopy] = useState<string | null>(null)
  const prevLoadingCopyRef = useRef<string | null>(null)

  // Initialize chat hook
  const { messages, sendMessage, status, setMessages } = useChat({
    id: `ai-assistant-${locale}`,
  })

  // Set initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greetingMessage = createAssistantGreetingMessage(dictionary.aiWidget.greeting, locale)
      setMessages([greetingMessage])
    }
  }, []) // Only run once on mount

  // Create suggestions from dictionary
  const suggestions = useMemo<PromptSuggestion[]>(
    () => [
      {
        id: "1",
        label: dictionary.aiWidget.quickActions.solutions,
        message: dictionary.aiWidget.quickActions.solutions,
      },
      {
        id: "2",
        label: dictionary.aiWidget.quickActions.cost,
        message: dictionary.aiWidget.quickActions.cost,
      },
      {
        id: "3",
        label: dictionary.aiWidget.quickActions.examples,
        message: dictionary.aiWidget.quickActions.examples,
      },
      {
        id: "4",
        label: dictionary.aiWidget.quickActions.consultation,
        message: dictionary.aiWidget.quickActions.consultation,
      },
    ],
    [
      dictionary.aiWidget.quickActions.consultation,
      dictionary.aiWidget.quickActions.cost,
      dictionary.aiWidget.quickActions.examples,
      dictionary.aiWidget.quickActions.solutions,
    ],
  )

  const isAgentActive = status === "streaming" || status === "submitted"
  const consultationMessage = dictionary.aiWidget.quickActions.consultation
  const { toolLoadingMessages } = dictionary.aiWidget

  // Handle external CTA events (from other parts of the page)
  useEffect(() => {
    const handleAssistantCta: EventListener = (event) => {
      const { detail } = event as CustomEvent<AssistantWidgetCtaEventDetail>
      const requestedMessage = detail?.message?.trim()
      const messageToSend =
        requestedMessage && requestedMessage.length > 0 ? requestedMessage : consultationMessage

      setIsOpen(true)
      sendMessage({ text: messageToSend })
    }

    window.addEventListener(ASSISTANT_WIDGET_CTA_EVENT, handleAssistantCta)

    return () => {
      window.removeEventListener(ASSISTANT_WIDGET_CTA_EVENT, handleAssistantCta)
    }
  }, [consultationMessage, sendMessage])

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    sendMessage({ text: suggestion.message })
  }

  const handleSubmitMessage = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text)
    if (!hasText) return
    sendMessage({ text: message.text || "" })
  }

  // Determine if assistant text is streaming
  const isAssistantTextStreamingValue = useMemo(
    () => isAssistantTextStreaming(messages),
    [messages],
  )

  // Get tool loading copy (e.g., "Checking availability...")
  const toolLoadingCopy = useMemo(
    () => getToolLoadingCopy(messages, toolLoadingMessages),
    [messages, toolLoadingMessages],
  )

  // Determine current loading copy
  const currentLoadingCopy =
    (status === "submitted" && !toolLoadingCopy ? dictionary.aiWidget.thinking : null) ||
    toolLoadingCopy ||
    null

  // Manage loading copy transitions (smooth fade in/out)
  useEffect(() => {
    if (currentLoadingCopy !== prevLoadingCopyRef.current) {
      prevLoadingCopyRef.current = currentLoadingCopy
      if (currentLoadingCopy) {
        setTimeout(() => {
          setLastLoadingCopy(currentLoadingCopy)
        }, 0)
        return
      }
    }

    if ((status === "ready" || isAssistantTextStreamingValue) && lastLoadingCopy !== null) {
      setTimeout(() => {
        setLastLoadingCopy(null)
      }, 0)
    }
  }, [currentLoadingCopy, status, isAssistantTextStreamingValue, lastLoadingCopy])

  const activeLoadingCopy =
    currentLoadingCopy ?? (!isAssistantTextStreamingValue ? lastLoadingCopy : null)

  const shouldShowLoadingState = Boolean(activeLoadingCopy)
  const loadingBaseText = getAnimatedBaseText(activeLoadingCopy ?? dictionary.aiWidget.thinking)

  return (
    <>
      {!isOpen && (
        <FloatingChatButton
          onClick={() => setIsOpen(true)}
          ariaLabel={dictionary.aiWidget.title}
        />
      )}

      <ChatSidebar isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ConversationSection
          messages={messages}
          isStreaming={isAssistantTextStreamingValue}
          shouldShowLoadingState={shouldShowLoadingState}
          loadingBaseText={loadingBaseText}
          isScrollIsolationEnabled={isOpen}
        />

        <InputSection
          isAgentActive={isAgentActive}
          suggestions={suggestions}
          placeholder={dictionary.aiWidget.placeholder}
          onSuggestionSelect={handleSuggestionSelect}
          onSubmitMessage={handleSubmitMessage}
        />
      </ChatSidebar>
    </>
  )
}
