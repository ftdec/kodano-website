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
    title: "AI Assistant",
    greeting:
      "Hello! I'm Forgia, your AI assistant from Kodano. I can help you learn about our AI solutions and schedule a consultation. How can I assist you today?",
    placeholder: "Type your message...",
    thinking: "Thinking...",
    quickActions: {
      solutions: "What solutions do you offer?",
      cost: "How much does it cost?",
      examples: "Show me examples",
      consultation: "Schedule a consultation",
    },
    toolLoadingMessages: {
      checkingAvailability: "Checking availability...",
      bookingMeeting: "Booking your meeting...",
      gettingDate: "Getting date...",
      findingNextAvailability: "Finding next availability...",
    },
  },
}

const ptDictionary: Dictionary = {
  aiWidget: {
    title: "Chat Kodano",
    greeting:
      "Olá! 👋 Bem-vindo à Kodano, a plataforma completa de infraestrutura de pagamentos. Sou consultor comercial e estou aqui para te ajudar. Como posso te auxiliar hoje?",
    placeholder: "Digite sua mensagem...",
    thinking: "Pensando...",
    quickActions: {
      solutions: "O que é a Kodano?",
      cost: "Quais funcionalidades vocês têm?",
      examples: "Como funciona?",
      consultation: "Quero agendar uma demonstração",
    },
    toolLoadingMessages: {
      checkingAvailability: "Verificando disponibilidade...",
      bookingMeeting: "Agendando sua reunião...",
      gettingDate: "Obtendo data...",
      findingNextAvailability: "Buscando próxima disponibilidade...",
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
