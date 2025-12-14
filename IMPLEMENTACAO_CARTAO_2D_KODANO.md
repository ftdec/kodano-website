# Implementação — Cartão 2D Animado Kodano

## 1. Estrutura de Componentes

```
src/components/home/
├── PaymentCardAnimation.tsx    # Componente principal (hero)
├── PaymentCard.tsx             # Cartão 2D estático + animações
├── ProcessingIndicator.tsx     # Linha animada de processamento
└── SuccessCheckmark.tsx        # Checkmark SVG animado
```

### Hierarquia

```
PaymentCardAnimation (container)
├── PaymentCard (cartão visual)
│   ├── CardChip (SVG)
│   ├── CardNumber (com ProcessingIndicator)
│   ├── CardHolder
│   └── CardExpiry
├── StatusText (texto de status abaixo)
└── SuccessCheckmark (overlay quando aprovado)
```

## 2. Estados da Animação

| Estado | Duração | Descrição |
|--------|---------|-----------|
| `idle` | 0.5s | Cartão parado, pronto para pagar |
| `processing` | 2.0s | Linha animada, pontos fluindo |
| `success` | 1.2s | Checkmark aparece, cor mais viva |
| `reset` | 0.8s | Fade suave, retorna ao idle |

### Ciclo Total: ~4.5s (loop infinito)

### Máquina de Estados

```typescript
type AnimationState = 'idle' | 'processing' | 'success' | 'reset';

const DURATIONS = {
  idle: 500,
  processing: 2000,
  success: 1200,
  reset: 800,
};
```

## 3. Estratégia de First Paint

### Regra Absoluta
O cartão **já existe no HTML** antes de qualquer JavaScript executar.

### Implementação

1. **SSR-first**: O componente renderiza HTML completo no servidor
2. **Zero placeholders**: Nenhum skeleton, shimmer ou loading
3. **CSS-only initial state**: O estado `idle` é puramente CSS
4. **Hydration invisible**: Animação só começa após hydration, mas cartão já visível

```tsx
// O cartão renderiza imediatamente (SSR)
<div className="payment-card">
  <div className="card-chip" />
  <div className="card-number">•••• •••• •••• 9010</div>
  <div className="card-holder">PAYMENT</div>
  <div className="card-expiry">12/28</div>
</div>

// Animação começa após mount (client-only)
useEffect(() => {
  startAnimationCycle();
}, []);
```

## 4. Paleta de Cores

```css
/* Kodano Cyan */
--kodano-cyan-base: #0FA3B1;
--kodano-cyan-light: #1BCAD3;
--kodano-cyan-dark: #0D8A96;

/* Neutros */
--card-text: rgba(255, 255, 255, 0.92);
--card-text-muted: rgba(255, 255, 255, 0.65);

/* Estados */
--success-green: #2FE6C8;  /* Kodano Teal */
```

## 5. Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| Desktop (≥1024px) | Cartão ocupa 75-85% do container |
| Tablet (768-1023px) | Cartão 70% do container |
| Mobile (<768px) | Cartão 90% da largura, menor altura |

### Container

```css
.payment-card-container {
  aspect-ratio: 16 / 10;
  max-width: 640px;
  width: 100%;
}

.payment-card {
  aspect-ratio: 1.586 / 1;  /* Proporção real de cartão */
  width: 80%;
  max-width: 420px;
}
```

## 6. Acessibilidade

### ARIA

```tsx
<div 
  role="img" 
  aria-label="Demonstração de processamento de pagamento Kodano"
  aria-live="polite"
>
  <span className="sr-only">{statusText}</span>
</div>
```

### Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  // Mostrar apenas estado "Pagamento aprovado" estático
  return <StaticSuccessCard />;
}
```

## 7. Performance

### Técnicas

1. **CSS transforms only**: Nenhuma animação em `width`, `height`, `top`, `left`
2. **will-change**: Aplicado em elementos animados
3. **GPU acceleration**: `transform: translateZ(0)` onde necessário
4. **RequestAnimationFrame**: Para sincronização de estados

### Target: 60fps constante

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

## 8. Implementação Técnica

### Framer Motion Variants

```typescript
const cardVariants = {
  idle: { 
    scale: 1,
    boxShadow: '0 25px 50px rgba(15, 163, 177, 0.15)'
  },
  processing: { 
    scale: 1,
    boxShadow: '0 25px 50px rgba(15, 163, 177, 0.20)'
  },
  success: { 
    scale: 1.02,
    boxShadow: '0 30px 60px rgba(47, 230, 200, 0.25)'
  },
};
```

### Linha de Processamento (CSS)

```css
@keyframes processing-line {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.processing-line {
  animation: processing-line 1.5s ease-in-out infinite;
}
```

## 9. Arquivos a Criar/Modificar

### Criar
- `src/components/home/PaymentCardAnimation.tsx`

### Modificar
- `src/components/home/hero-section.tsx` (importar novo componente)

### Remover (após validação)
- `PremiumCardCanvas.tsx` (WebGL)
- `PremiumCardAnimation.tsx` (wrapper 3D)
- `PremiumCardPoster.tsx` (poster estático)

## 10. Checklist de Implementação

- [ ] Criar componente PaymentCardAnimation
- [ ] Implementar máquina de estados (idle → processing → success → reset)
- [ ] Animação de linha de processamento
- [ ] Checkmark SVG animado
- [ ] Texto de status animado
- [ ] Responsividade completa
- [ ] Suporte a reduced-motion
- [ ] Integrar no hero-section
- [ ] Testar first paint (sem flash branco)
- [ ] Validar 60fps no Chrome DevTools
