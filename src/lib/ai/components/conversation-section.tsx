"use client"

import { useEffect, useRef } from "react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  useStickToBottomContext,
} from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import { Response } from "@/components/ai-elements/response"
import { Shimmer } from "@/components/ai-elements/shimmer"
import { AutoScrollTrigger } from "@/lib/ai/components/auto-scroll-trigger"
import { AnimatedThinking } from "@/lib/ai/components/animated-thinking"
import type { UIMessage } from "ai"

interface ConversationSectionProps {
  messages: UIMessage[]
  isStreaming: boolean
  shouldShowLoadingState: boolean
  loadingBaseText: string
  isScrollIsolationEnabled: boolean
  onClose?: () => void
}

// Helper function to detect if message mentions contact
function shouldShowContactButton(text: string): boolean {
  const keywords = [
    'fale conosco',
    'fale com',
    'contato',
    'formulário',
    'conectar',
    'time',
    'equipe',
    'especialista',
    'consultor',
    'demonstração',
    'clique',
    'acesse'
  ]

  const lowerText = text.toLowerCase()
  return keywords.some(keyword => lowerText.includes(keyword))
}

export function ConversationSection({
  messages,
  isStreaming,
  shouldShowLoadingState,
  loadingBaseText,
  isScrollIsolationEnabled,
  onClose,
}: ConversationSectionProps) {
  return (
    <Conversation className="flex-1">
      <ScrollIsolation isEnabled={isScrollIsolationEnabled} />
      <AutoScrollTrigger
        messages={messages}
        isStreaming={isStreaming}
        shouldShowLoadingState={shouldShowLoadingState}
      />
      <ConversationContent className="px-3 py-3 sm:px-6 sm:py-5">
        {messages.map((message: UIMessage) => (
          <div key={message.id}>
            {message.parts?.map((part, i: number) => {
              switch (part.type) {
                case "text":
                  return (
                    <div key={`${message.id}-${i}`}>
                      <Message from={message.role === "assistant" ? "assistant" : "user"}>
                        <MessageContent
                          variant={message.role === "assistant" ? "flat" : "contained"}
                        >
                          <Response>{part.text}</Response>
                        </MessageContent>
                      </Message>
                      {/* Botão Fale Conosco apenas quando o assistente menciona contato */}
                      {message.role === "assistant" && shouldShowContactButton(part.text) && (
                        <div className="mt-2 sm:mt-3 px-2 sm:px-4">
                          <a
                            href="#contact"
                            data-slot="button"
                            className="items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-[#002A35] active:bg-[#00C8DC] hover:bg-[#00C8DC] text-white shadow-lg shadow-primary/20 active:shadow-xl hover:shadow-xl hover:shadow-accent/30 h-11 sm:h-10 px-5 sm:px-6 py-2.5 sm:py-2 text-sm rounded-full inline-flex w-full touch-manipulation"
                            onClick={(e) => {
                              e.preventDefault()
                              if (onClose) onClose()
                              setTimeout(() => {
                                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
                              }, 300)
                            }}
                          >
                            Fale Conosco
                          </a>
                        </div>
                      )}
                    </div>
                  )
                case "tool-result":
                  // Não renderiza nada para tool results, o botão fixo é suficiente
                  return null
                default:
                  return null
              }
            })}
          </div>
        ))}

        {shouldShowLoadingState && (
          <div className="px-3 sm:px-4 py-2 sm:py-3">
            <Shimmer className="text-sm text-white/80">
              <AnimatedThinking baseText={loadingBaseText} />
            </Shimmer>
          </div>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}

// Scroll isolation prevents page scroll when scrolling chat
function ScrollIsolation({ isEnabled }: { isEnabled: boolean }) {
  const { scrollRef } = useStickToBottomContext()
  const touchStartYRef = useRef(0)

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const scrollElement = scrollRef.current

    if (!scrollElement) {
      return
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) {
        return
      }

      event.preventDefault()
      scrollElement.scrollTop += event.deltaY
    }

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return
      }

      touchStartYRef.current = event.touches[0].clientY
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return
      }

      const currentY = event.touches[0].clientY
      const deltaY = touchStartYRef.current - currentY

      if (deltaY === 0) {
        return
      }

      event.preventDefault()
      scrollElement.scrollTop += deltaY
      touchStartYRef.current = currentY
    }

    scrollElement.addEventListener("wheel", handleWheel, { passive: false })
    scrollElement.addEventListener("touchstart", handleTouchStart, { passive: false })
    scrollElement.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      scrollElement.removeEventListener("wheel", handleWheel)
      scrollElement.removeEventListener("touchstart", handleTouchStart)
      scrollElement.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isEnabled, scrollRef])

  return null
}
