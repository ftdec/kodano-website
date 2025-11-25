"use client"

import type { CSSProperties } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  PromptInputProvider,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import { RichTextInput } from "@/components/ai-elements/rich-text-input"
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion"
import {
  suggestionContainerVariants,
  suggestionItemVariants,
} from "@/lib/ai/components/constants"
import type { PromptSuggestion } from "@/lib/shared/schemas"

interface InputSectionProps {
  isAgentActive: boolean
  suggestions: PromptSuggestion[]
  placeholder: string
  onSuggestionSelect: (suggestion: PromptSuggestion) => void
  onSubmitMessage: (message: PromptInputMessage) => void
  onClose?: () => void
}

export function InputSection({
  isAgentActive,
  suggestions,
  placeholder,
  onSuggestionSelect,
  onSubmitMessage,
  onClose,
}: InputSectionProps) {
  const inputSectionStyle: CSSProperties & { "--chat-bottom-offset"?: string } = {
    "--chat-bottom-offset":
      "max(env(safe-area-inset-bottom, 0px), var(--chat-bottom-inset, 0px))",
    paddingBottom: "calc(var(--chat-input-base, 1rem) + var(--chat-bottom-offset, 0px))",
  }

  return (
    <div
      className="px-3 sm:px-3 md:px-4 border-t border-[#00C8DC]/40 bg-[#002A35]/30 backdrop-blur-md rounded-none sm:rounded-bl-3xl [--chat-input-base:0.75rem] sm:[--chat-input-base:1.5rem] md:[--chat-input-base:2rem]"
      style={inputSectionStyle}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isAgentActive && suggestions.length > 0 && (
          <motion.div
            className="mt-2 mb-2 sm:mt-3 sm:mb-3 md:mt-4 md:mb-4"
            variants={suggestionContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Suggestions className="gap-1.5 sm:gap-2">
              {suggestions.map((suggestion) => (
                <motion.div key={suggestion.id} variants={suggestionItemVariants}>
                  <Suggestion
                    id={suggestion.id}
                    label={suggestion.label}
                    message={suggestion.message}
                    onSuggestionSelect={onSuggestionSelect}
                    size="sm"
                  />
                </motion.div>
              ))}
            </Suggestions>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        <div className="relative flex-1 w-full min-w-0">
          <PromptInputProvider>
            <RichTextInput
              placeholder={placeholder}
              onSubmit={(content) => {
                const message: PromptInputMessage = { text: content }
                onSubmitMessage(message)
              }}
            />
          </PromptInputProvider>
        </div>
      </div>
    </div>
  )
}
