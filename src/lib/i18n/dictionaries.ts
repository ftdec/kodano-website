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
      "Hi. Kodano helps B2B companies receive high-value payments with more security, predictability, and control. What is your business segment?",
    placeholder: "Type your message...",
    thinking: "Thinking...",
    quickActions: {
      solutions: "What does Kodano do?",
      cost: "Who is it for?",
      examples: "I want to schedule a call",
      consultation: "Talk to someone",
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
    title: "Kodano",
    greeting:
      "Olá. A Kodano ajuda empresas B2B a receberem pagamentos de alto valor com mais segurança, previsibilidade e controle. Qual é o segmento do seu negócio?",
    placeholder: "Digite sua mensagem...",
    thinking: "Pensando...",
    quickActions: {
      solutions: "O que a Kodano faz?",
      cost: "Para quem é?",
      examples: "Quero agendar uma conversa",
      consultation: "Falar com alguém",
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
