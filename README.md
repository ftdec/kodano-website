# 🚀 Kodano Website

Site institucional da Kodano - Gateway de Pagamentos B2B

## 📋 Sobre o Projeto

Site institucional moderno e responsivo desenvolvido para a Kodano, uma plataforma de pagamentos B2B inspirada na experiência da Stripe. O site foi construído com foco em **conversão, credibilidade e clareza técnica**.

## ✨ Funcionalidades

### Páginas Implementadas

- ✅ **Home** - Hero section, features, produtos, stats e CTAs
- ✅ **Soluções** - Cases de uso por setor (SaaS, Marketplace, HealthTech, EdTech, B2B)
- ✅ **Produtos** - Detalhamento completo de cada módulo (Payments, Connect, Billing, Checkout, Radar)
- ✅ **Preços** - Planos, tabelas comparativas e FAQ
- ✅ **Desenvolvedores** - Portal técnico com SDKs e documentação
- ✅ **Segurança** - Compliance, certificações e práticas de segurança
- ✅ **Clientes** - Cases de sucesso e depoimentos
- ✅ **Sobre** - Missão, valores e trajetória
- ✅ **Contato** - Formulário e informações de contato

### Recursos Técnicos

- 🎨 **Design System** - Tema customizado com cores da marca Kodano
- 🌓 **Modo Escuro** - Suporte automático ao tema dark/light
- 📱 **Mobile-First** - Totalmente responsivo
- ⚡ **Performance** - Otimizado para velocidade
- 🎯 **SEO** - Meta tags otimizadas em todas as páginas
- 🎭 **Animações** - Microinterações suaves e profissionais

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes:** [shadcn/ui](https://ui.shadcn.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Fontes:** Poppins (títulos) + Inter (texto)
- **Temas:** [next-themes](https://github.com/pacocoursey/next-themes)

## 🎨 Design

### Cores da Marca

- **Primary:** `#003E4E` (Azul-esverdeado escuro)
- **Accent:** `#00A6B4` (Ciano suave)
- **Background:** `#FFFFFF` (Light) / Dark mode adaptativo

### Tipografia

- **Títulos:** Poppins (400, 500, 600, 700, 800)
- **Corpo:** Inter (300, 400, 500, 600)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:3000`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start

# Lint
npm run lint
```

## 📁 Estrutura do Projeto

```
kodano-website/
├── src/
│   ├── app/                      # Páginas e rotas (App Router)
│   │   ├── page.tsx             # Home
│   │   ├── solucoes/            # Página de Soluções
│   │   ├── produtos/            # Página de Produtos
│   │   ├── precos/              # Página de Preços
│   │   ├── desenvolvedores/     # Portal de Desenvolvedores
│   │   ├── seguranca/           # Página de Segurança
│   │   ├── clientes/            # Casos de sucesso
│   │   ├── sobre/               # Sobre a Kodano
│   │   ├── contato/             # Página de Contato
│   │   ├── layout.tsx           # Layout raiz
│   │   └── globals.css          # Estilos globais
│   ├── components/
│   │   ├── layout/              # Componentes de layout
│   │   ├── sections/            # Seções reutilizáveis
│   │   └── ui/                  # Componentes shadcn/ui
│   └── lib/
│       ├── constants/           # Constantes e configurações
│       └── utils.ts
├── public/                      # Assets estáticos
└── package.json
```

## 🎯 Próximos Passos

### Integrações Planejadas

- [ ] Supabase para armazenamento de leads
- [ ] Formulários com captura de UTM
- [ ] Plausible Analytics
- [ ] Blog institucional
- [ ] Tradução PT/EN

## 📊 Métricas de Sucesso

- ✅ Tempo de carregamento < 1.5s
- ✅ SEO Score (Lighthouse) > 90
- ✅ Design responsivo em todos os dispositivos

## 📝 Licença

© 2025 Kodano. Todos os direitos reservados.

## 👥 Time

Desenvolvido pelos fundadores da Kodano:
- **Felipe Caltabiano Távora de Castro** - Co-Founder
- **Marcelo Kodaira de Almeida** - Co-Founder

---

**Status:** ✅ Versão 1.0 concluída
