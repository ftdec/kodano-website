# PRD — Home “Signature Animation”: Kodano Flow Rail (Stripe-level sem travar)

## 1) Objetivo
Criar **uma única animação assinatura** na Home que comunique “produto premium” no nível Stripe/Cloudwalk, mantendo o site **fluido**. A animação deve ser memorável, sofisticada e “quiet”, sem virar ruído visual nem degradar performance em máquinas medianas/fracas.

## 2) Conceito (o que será visto)
**Kodano Flow Rail**: um “trilho” (ribbon/rail) abstrato que representa o fluxo de orquestração.
- Um **path curvo** com stroke em gradiente (paleta Kodano).
- **Pulsos** (packets) viajando no trilho (movimento orgânico e contínuo).
- **Nodes** fixos (pontos) no trilho com “activation” sutil.
- Movimento responde levemente ao **scroll** e ao **cursor** (desktop).

## 3) Onde entra (layout)
**Escolha A (aprovada)**: fica **atrás do texto do Hero**, sutil, com legibilidade preservada.

## 4) Requisitos de UX
- A animação deve:
  - parecer “custom-built”, não template;
  - reforçar “precisão e orquestração”;
  - ser elegante e discreta (quiet motion).
- Não competir com CTA/copy (prioridade é conversão).

## 5) Requisitos de Performance (não travar)
### 5.1 Regra de ouro
- Evitar custo por frame:
  - **sem** `filter: blur()` animado;
  - **sem** `setState` em loop de scroll/RAF;
  - **preferir** `transform` + `opacity`.

### 5.2 Gating automático (“modo performance”)
- **Reduced motion** (`prefers-reduced-motion`):
  - Sem loops contínuos; apenas estático.
- **Low-end** (heurística):
  - Desligar pulsos; manter rail estático.
- **Viewport / visibilidade da aba**:
  - O loop (RAF) só roda quando o rail está visível e quando a aba está ativa.

### 5.3 Orçamento
- Desktop bom: rail + ~6 pulsos.
- Low-end: rail estático + nodes.

## 6) Requisitos Técnicos
### 6.1 Stack
- **SVG** + **Framer Motion MotionValues** + `requestAnimationFrame` (somente quando habilitado).

### 6.2 Arquitetura
- Componente: `src/components/home/kodano-flow-rail.tsx`
- Integração: `src/components/home/hero-section.tsx`
- Hooks existentes:
  - `useReducedMotion()`
  - `useIsLowEndDevice()`

### 6.3 Implementação do movimento
- O path é um `<path>` único dentro do SVG.
- Pulsos usam:
  - `path.getTotalLength()` + `getPointAtLength()` para amostrar posições.
  - MotionValues (`x`,`y`) atualizados no RAF (sem re-render React).
- O RAF:
  - inicia apenas quando `enabled === true` e `inViewport === true` e `document.visibilityState === "visible"`;
  - para automaticamente quando não cumprir.

## 7) Critérios de Aceitação
- Visual premium perceptível no Hero (desktop).
- Em low-end/reduced-motion: sem loop e sem engasgos.
- `npm run build` passa.

## 8) Plano de Execução
1. Criar `KodanoFlowRail` com gating e RAF eficiente.
2. Integrar no Hero (camada atrás do conteúdo).
3. Ajustar opacidade e overlays para legibilidade perfeita.
4. Validar `lint/build`.


