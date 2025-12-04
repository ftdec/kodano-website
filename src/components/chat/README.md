# Kodano Chat Widget

Sistema completo de chatbot com design premium estilo Stripe/McKinsey, implementado seguindo o PRD Kodano.

## Componentes

### ChatWidget
Componente principal que orquestra todo o sistema de chat.

```tsx
import { ChatWidget } from "@/components/chat";

// Já está integrado no ClientLayout - não precisa importar manualmente
```

### ChatButton
Botão flutuante que abre o chat.

**Características:**
- Posição: bottom-6 right-6
- Cores: bg-[#002A35] com hover bg-[#00C8DC]
- Animações: hover:scale-110, active:scale-95
- Badge pulsante em cyan (#00C8DC)

### ChatPopup
Popup "Fale comigo" que aparece automaticamente.

**Comportamento:**
- Aparece após 1 segundo
- Desaparece após 7 segundos
- Esconde ao clicar no botão do chat

### ChatPanel
Painel de conversa responsivo.

**Mobile:**
- Largura: 100%
- Altura: 70vh
- Aparece da parte inferior da tela

**Desktop:**
- Largura: 560px
- Altura: 560px
- Painel flutuante (bottom-24 right-6)

## Cores Kodano

- **Azul-petróleo:** `#002A35`
- **Cyan Kodano:** `#00C8DC`
- **Branco:** `#FFFFFF`

## Gradiente de Texto Kodano

Componente utilitário para aplicar gradiente de texto Kodano:

```tsx
import { KodanoGradient } from "@/components/ui/kodano-gradient";

// Variante simples (padrão)
<KodanoGradient>
  operação financeira?
</KodanoGradient>

// Variante premium (3 cores)
<KodanoGradient variant="premium">
  operação financeira?
</KodanoGradient>
```

### Variantes

**Simple:**
- Gradiente: `from-[#002A35] to-[#00C8DC]`

**Premium:**
- Gradiente: `from-[#003845] via-[#005A6A] to-[#00C8DC]`

## Estrutura de Arquivos

```
src/components/chat/
├── ChatButton.tsx       # Botão flutuante
├── ChatPopup.tsx        # Popup "Fale comigo"
├── ChatPanel.tsx        # Painel do chat
├── ChatWidget.tsx       # Componente principal
├── index.ts            # Exports
└── README.md           # Esta documentação
```

## Botão "Fale Conosco" (Header)

O botão "Fale Conosco" no header já está configurado com as cores Kodano:

```tsx
<Button
  asChild
  size="sm"
  variant="kodano"
  rounded="full"
  className="hidden lg:flex"
>
  <Link href="/fale-conosco">Fale Conosco</Link>
</Button>
```

### Variante Kodano do Button

Definida em `src/components/ui/button.tsx`:

```tsx
kodano: "bg-[#002A35] hover:bg-[#00C8DC] active:bg-[#00C8DC] text-white shadow-lg shadow-[#002A35]/20 hover:shadow-xl hover:shadow-[#00C8DC]/30 transition-all duration-200 focus-visible:ring-[#00C8DC]/50"
```

## Design System

### Bordas
- Botões: `rounded-full`
- Cards: `rounded-3xl` ou `rounded-2xl`

### Sombras
- Padrão: `shadow-lg`
- Hover: `shadow-xl`
- Premium: `shadow-2xl`

### Transições
- Duração padrão: `duration-300`
- Botões: `duration-200`
- Smooth: `transition-all`

### Cores de Background
- Painel: `bg-white`
- Área de mensagens: `bg-slate-50/60`
- Mensagens bot: `bg-white`
- Mensagens usuário: `bg-[#002A35]`

## Responsividade

### Mobile
- Botão: `w-16 h-16`
- Painel: `w-full h-[70vh]`
- Popup: Ajustado automaticamente

### Desktop (lg:)
- Botão: `sm:w-14 sm:h-14`
- Painel: `lg:h-[560px] max-w-md`
- Popup: Posicionado ao lado do botão

## Implementação Concluída

✅ Botão flutuante com cores Kodano
✅ Popup automático "Fale comigo"
✅ Painel responsivo (mobile + desktop)
✅ Gradiente de texto Kodano
✅ Botão "Fale Conosco" no header
✅ Sem highlights brancos indesejados
✅ UI premium estilo Stripe/McKinsey
✅ Animações e transições fluidas
✅ Build TypeScript sem erros
✅ Integrado no ClientLayout

## Próximos Passos (Opcional)

- Integrar com API real de chat
- Adicionar histórico de conversas
- Implementar typing indicator
- Adicionar suporte a anexos
- Integrar com sistema de tickets
