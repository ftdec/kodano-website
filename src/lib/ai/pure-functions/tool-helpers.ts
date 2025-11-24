import type { UIMessage } from "ai"

/**
 * Check if assistant is currently streaming text
 */
export function isAssistantTextStreaming(messages: UIMessage[]): boolean {
  if (messages.length === 0) return false

  const lastMessage = messages[messages.length - 1]

  if (lastMessage.role !== "assistant") return false

  // Check if message has text parts
  const hasTextParts = lastMessage.parts?.some((part) => part.type === "text")

  return Boolean(hasTextParts)
}

/**
 * Get loading copy based on active tool
 */
export function getToolLoadingCopy(
  messages: UIMessage[],
  toolLoadingMessages: Record<string, string>,
): string | null {
  if (messages.length === 0) return null

  const lastMessage = messages[messages.length - 1]

  if (lastMessage.role !== "assistant") return null

  // Check for tool call parts
  const toolCallPart = lastMessage.parts?.find((part) => part.type === "tool-call")

  if (toolCallPart && "toolName" in toolCallPart) {
    const toolName = toolCallPart.toolName as string

    // Map tool names to loading messages
    const loadingMessageMap: Record<string, string> = {
      checkAvailability: toolLoadingMessages.checkingAvailability || "Checking availability...",
      bookMeeting: toolLoadingMessages.bookingMeeting || "Booking your meeting...",
      getWeekdayDate: toolLoadingMessages.gettingDate || "Getting date...",
      getNextAvailability:
        toolLoadingMessages.findingNextAvailability || "Finding next availability...",
    }

    return loadingMessageMap[toolName] || null
  }

  return null
}
