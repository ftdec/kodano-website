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
    title: "Kodano Chat",
    greeting:
      "Hi! 👋 Welcome to Kodano. We add security to high-value payments by verifying payer identity before approval. How can I help you?",
    placeholder: "Type your message...",
    thinking: "Thinking...",
    quickActions: {
      solutions: "What does Kodano do?",
      cost: "How does it work?",
      examples: "Who is it for?",
      consultation: "I want to talk to someone",
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
      "Olá! 👋 Bem-vindo à Kodano. Ajudamos empresas a receberem pagamentos de alto valor com mais segurança, verificando a identidade do pagador antes da aprovação. Como posso te ajudar?",
    placeholder: "Digite sua mensagem...",
    thinking: "Pensando...",
    quickActions: {
      solutions: "O que a Kodano faz?",
      cost: "Como funciona?",
      examples: "Para quem é?",
      consultation: "Quero falar com alguém",
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
