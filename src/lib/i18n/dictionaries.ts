export type Locale = "en" | "pt"

export interface Dictionary {
  aiWidget: {
    title: string
    greeting: string
    placeholder: string
    thinking: string
    quickActions: {
      solutions: string
      cost: string
      examples: string
      consultation: string
    }
    toolLoadingMessages: {
      checkingAvailability: string
      bookingMeeting: string
      gettingDate: string
      findingNextAvailability: string
    }
  }
}

const enDictionary: Dictionary = {
  aiWidget: {
    title: "Kodano",
    greeting:
      "Hi. Kodano helps companies receive high-value payments with more security and predictability. What's your business segment?",
    placeholder: "Type here...",
    thinking: "Thinking...",
    quickActions: {
      solutions: "What does Kodano do?",
      cost: "Who is it for?",
      examples: "I want to talk to sales",
      consultation: "Contact form",
    },
    toolLoadingMessages: {
      checkingAvailability: "Checking...",
      bookingMeeting: "Processing...",
      gettingDate: "Loading...",
      findingNextAvailability: "Loading...",
    },
  },
}

const ptDictionary: Dictionary = {
  aiWidget: {
    title: "Kodano",
    greeting:
      "Oi. A Kodano ajuda empresas que recebem pagamentos de alto valor a ter mais segurança e previsibilidade. Qual é o seu segmento?",
    placeholder: "Digite aqui...",
    thinking: "Pensando...",
    quickActions: {
      solutions: "O que a Kodano faz?",
      cost: "Para quem é?",
      examples: "Quero falar com o comercial",
      consultation: "Ir para Fale Conosco",
    },
    toolLoadingMessages: {
      checkingAvailability: "Verificando...",
      bookingMeeting: "Processando...",
      gettingDate: "Carregando...",
      findingNextAvailability: "Carregando...",
    },
  },
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  pt: ptDictionary,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en
}
