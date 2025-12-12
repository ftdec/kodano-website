# PRD v2 — Kodano Website: Motion Premium (Stripe / Cloudwalk-level)

## 1) Contexto e Objetivo
O site já possui base sólida de animações (Framer Motion + GSAP + Lenis + 3D/WebGL) e componentes prontos (`GradientMesh`, `CursorSpotlight`, `TextReveal`, `AdvancedButton`, `Card3D`). O objetivo desta entrega é **aplicar e padronizar** esse “motion system” nas páginas e seções mais críticas, elevando o nível visual e de interação para o patamar de **Stripe/Cloudwalk**, sem sacrificar performance e acessibilidade.

## 2) Escopo (este rollout)
- **Homepage (prioridade)**:
  - Hero “premium” com **background WebGL** (com fallback), **spotlight**, **headline com reveal** e CTAs com microinterações.
  - Ajustes de microinterações (hover/focus) em seções principais, com coerência de timings/easings.
- **Transições entre rotas** (App Router):
  - Transição sutil (fade/blur/translate) entre páginas, respeitando `prefers-reduced-motion`.
- **Correções/ajustes no sistema**:
  - Garantir que componentes (ex.: cursor spotlight / button group) estejam corretos e consistentes (sem classes dinâmicas quebrando Tailwind).

## 3) Fora de Escopo (por enquanto)
- Redesenho completo de conteúdo/copy.
- Storytelling scroll “pin/stepper” em todas as páginas internas.
- Rebuild de UI kit inteiro.
- Experimentos pesados (particles complexas, WebGPU, shaders adicionais) sem budget de performance.

## 4) Referências e Benchmark
- **Stripe**: motion “quiet”, gradientes vivos, profundidade por camadas, CTAs com microinterações.
- **Cloudwalk**: sensação de produto premium, detalhes de hover/scroll, 3D sutil (quando faz sentido).
- **Linear/Vercel**: tipografia + blur/opacity como linguagem de transição.

## 5) Requisitos de Produto
- **Qualidade percebida**:
  - Microinterações de hover/tap/focus em elementos clicáveis importantes (CTA, cards).
  - Motion que reforça hierarquia (headline → subheadline → CTAs).
- **Performance**:
  - Alvo: **60fps** nas interações (hover/scroll) em desktop moderno.
  - Evitar animações de layout (priorizar `transform`/`opacity`).
  - WebGL: habilitar de forma progressiva e com fallback.
- **Acessibilidade**:
  - Respeitar `prefers-reduced-motion` (desligar loops e “float” desnecessário).
  - Não usar motion como única forma de transmitir informação.
  - Foco visível e navegação por teclado preservados.

## 6) Requisitos Técnicos
- **Motion tokens**:
  - Reutilizar `src/lib/animations/{constants,easings,variants,hooks}`.
  - Durations padronizadas e easing “snappy” sem parecer “gamer”.
- **Progressive Enhancement**:
  - Se WebGL/capacidade reduzida: fallback para CSS gradients.
- **Sem duplicação**:
  - Preferir componentes existentes (`src/components/animations/*`) ao invés de reimplementar animações locais.

## 7) Mudanças Planejadas (alta prioridade)
### 7.1 Homepage — Hero
- Background: `GradientMesh` (WebGL) + fallback.
- Efeito de profundidade: `CursorSpotlight` (somente desktop + sem reduced motion).
- Texto: `TextReveal`/`TextRevealGradient` para headline.
- CTAs: `AdvancedButton` com ripple/shimmer e link para âncoras.
- Indicador de scroll: `ScrollIndicator`.

### 7.2 Homepage — Seções
- Ajustar hover/focus e entrada no viewport (stagger consistente).
- Garantir que `Card3D` e efeitos de glow sejam condicionados por `isMobile`/`reducedMotion`.

### 7.3 Transições de rota
- Implementar wrapper no `ClientLayout` com `AnimatePresence` keyado por `pathname`.
- Variants leves: fade + blur sutil + translateY pequeno (desligado em reduced motion).

## 8) Critérios de Aceitação (DoD)
- **Hero** usa `GradientMesh`, `CursorSpotlight`, `TextReveal` e `AdvancedButton` (com fallback/reduced-motion).
- **Nenhuma regressão de navegação** (âncoras continuam funcionando; páginas renderizam normalmente).
- **Sem CLS visível** introduzido por motion.
- **Reduced motion**: loops pesados desligados (spotlight/mesh animado reduzido).
- **Build + typecheck + lint** passam.

## 9) Medição / QA
- Checklist manual:
  - Desktop: hover nos CTAs, spotlight suave, headline reveal.
  - Mobile: sem spotlight; motion reduzido, sem travamentos.
  - `prefers-reduced-motion`: hero sem loops/scroll indicator sem bounce.
- Ferramentas:
  - `bun typecheck`, `bun lint`, `bun run build` (quando aplicável).

## 10) Rollout
- Entrega incremental:
  1. Hero premium (alto impacto)
  2. Microinterações em seções (consistência)
  3. Route transitions (polish)


