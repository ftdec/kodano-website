"use client"

import { createContext, useContext, ReactNode } from "react"

export interface PromptInputMessage {
  text?: string
}

interface PromptInputContextValue {
  // Add any shared state here if needed
}

const PromptInputContext = createContext<PromptInputContextValue | undefined>(undefined)

interface PromptInputProviderProps {
  children: ReactNode
}

export function PromptInputProvider({ children }: PromptInputProviderProps) {
  const value: PromptInputContextValue = {
    // Initialize any shared state here
  }

  return <PromptInputContext.Provider value={value}>{children}</PromptInputContext.Provider>
}

export function usePromptInput(): PromptInputContextValue {
  const context = useContext(PromptInputContext)
  if (context === undefined) {
    throw new Error("usePromptInput must be used within a PromptInputProvider")
  }
  return context
}
