import { nanoid } from "nanoid"
import type { UIMessage } from "ai"

/**
 * Create the initial assistant greeting message
 */
export function createAssistantGreetingMessage(greeting: string, locale: string): UIMessage {
  return {
    id: nanoid(),
    role: "assistant",
    parts: [
      {
        type: "text",
        text: greeting,
      },
    ],
  }
}

/**
 * Strip ellipsis from text for animation
 */
export function getAnimatedBaseText(text: string): string {
  return text.replace(/\.+$/, "")
}
