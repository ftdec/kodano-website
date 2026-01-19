export const BRAND = {
  name: "Kodano",
  tagline: "Mais segurança para pagamentos de alto valor",
  description:
    "A Kodano participa do fluxo de pagamento para trazer mais segurança a transações de alto valor, confirmando a identidade de quem está pagando antes da aprovação.",
  url: "https://kodano.com.br",
  email: "contato@kodano.com.br",
  phone: "+55 11 98222-5822",
  phoneFormatted: "(11) 98222-5822",
  // Institutional Information
  legalName: "Kodano Tecnologia da Informação LTDA",
  cnpj: "63.611.170/0001-22",
  address: {
    street: "Rua Oscar Freire, 1437",
    floor: "6º andar — Conjuntos 61 ao 66",
    city: "São Paulo",
    state: "SP",
    full: "Rua Oscar Freire, 1437, 6º andar — Conjuntos 61 ao 66, São Paulo – SP"
  }
} as const;

export const COLORS = {
  tealDark: "#002A35",      // Azul-petróleo escuro (forma angular)
  tealLight: "#00C8DC",     // Azul-petróleo claro/ciano brilhante (forma curva)
  cyan: "#00D4E8",          // Ciano vibrante
  white: "#FFFFFF",
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/kodano",
  twitter: "https://twitter.com/kodano",
  github: "https://github.com/kodano",
  instagram: "https://instagram.com/kodano",
} as const;

export const KEY_FEATURES = [
  {
    title: "Segurança de nível bancário",
    description:
      "Compliance total com PCI-DSS, certificações internacionais e proteção avançada contra fraudes.",
    icon: "shield-check",
  },
  {
    title: "Tecnologia escalável",
    description:
      "Processe milhões de transações com latência ultra-baixa.",
    icon: "trending-up",
  },
  {
    title: "Integração em minutos",
    description:
      "SDKs completos, documentação clara e APIs RESTful para começar rapidamente.",
    icon: "zap",
  },
  {
    title: "Custos transparentes",
    description:
      "Sem taxas ocultas, modelo white-label disponível e preços competitivos.",
    icon: "dollar-sign",
  },
  {
    title: "Developer Experience",
    description:
      "Webhooks, sandbox completo, logs em tempo real e suporte técnico dedicado.",
    icon: "code",
  },
] as const;
