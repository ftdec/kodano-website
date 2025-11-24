"use client"

import { createContext, useContext, ReactNode } from "react"
import { Dictionary, Locale, getDictionary } from "./dictionaries"

interface I18nContextValue {
  locale: Locale
  dictionary: Dictionary
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

interface I18nProviderProps {
  locale: Locale
  children: ReactNode
}

export function I18nProvider({ locale, children }: I18nProviderProps) {
  const dictionary = getDictionary(locale)

  return <I18nContext.Provider value={{ locale, dictionary }}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
