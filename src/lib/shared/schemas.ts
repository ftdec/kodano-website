import { z } from "zod"

export const PromptSuggestionSchema = z.object({
  id: z.string(),
  label: z.string(),
  message: z.string(),
})

export type PromptSuggestion = z.infer<typeof PromptSuggestionSchema>
