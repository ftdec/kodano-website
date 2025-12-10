# PRD: Kodano Website - Advanced Animations Redesign

## 1. Overview

### 1.1 Objetivo
Transformar o site da Kodano em uma experiência visual de classe mundial, inspirada em sites premium de tech como Stripe, Vercel, Linear e Cloudwalk, mantendo o conteúdo simples e direto, mas elevando a apresentação com animações sofisticadas e interações fluidas.

### 1.2 Inspirações (Referências)
- **Stripe** (stripe.com): Animações de scroll parallax, gradientes animados, micro-interações
- **Vercel** (vercel.com): Transições suaves, blur effects, texto animado
- **Linear** (linear.app): Animações de produto, scroll-triggered animations
- **Cloudwalk** (cloudwalk.io): Animações 3D, efeitos de profundidade
- **Apple** (apple.com): Scroll-based storytelling, product reveals
- **Framer** (framer.com): Smooth transitions, interactive elements

### 1.3 Princípios de Design
1. **Performance First**: 60fps em todas as animações
2. **Progressive Enhancement**: Funciona sem JavaScript, melhora com ele
3. **Accessibility**: Respeita `prefers-reduced-motion`
4. **Mobile-First**: Animações otimizadas para mobile
5. **Content Clarity**: Animações servem o conteúdo, não competem com ele

---

## 2. Análise do Estado Atual

### 2.1 Pontos Fortes Atuais
- ✅ Conteúdo bem estruturado e claro
- ✅ Design limpo e profissional
- ✅ Já usa Framer Motion
- ✅ Já tem alguns efeitos de scroll
- ✅ Performance decente

### 2.2 Oportunidades de Melhoria
- ❌ Animações básicas e genéricas
- ❌ Falta de micro-interações
- ❌ Ausência de scroll storytelling
- ❌ Sem efeitos de profundidade/parallax
- ❌ Transições de página simples
- ❌ Falta de elementos 3D/WebGL
- ❌ Gradientes estáticos
- ❌ Cards sem hover effects avançados

---

## 3. Especificações Técnicas

### 3.1 Hero Section - Animações Avançadas

#### 3.1.1 Background Animado
```typescript
// Gradient animado tipo Stripe
- Mesh gradient animado com ruído Perlin
- Spotlight effect que segue o cursor
- Partículas flutuantes sutis
- Blur backdrop com glassmorphism
```

**Implementação:**
- Usar `@react-three/fiber` + `@react-three/drei` para gradient mesh
- Canvas WebGL em background com fallback estático
- Shader customizado para efeito de noise

#### 3.1.2 Texto Hero
```typescript
// Texto com reveal animado
- Fade in + slide up em cascata por palavra
- Gradiente animado no texto principal
- Cursor blinking effect no CTA
- Glitch effect sutil no hover do logo
```

**Implementação:**
- Split text em palavras/caracteres
- Stagger animation com Framer Motion
- CSS gradient animation para texto
- SVG filters para glitch effect

#### 3.1.3 CTA Buttons
```typescript
// Botões com micro-interações
- Hover: Gradient shift + scale + shadow
- Click: Ripple effect + haptic feedback (mobile)
- Loading: Spinner + progress bar integrados
- Success: Checkmark animation
```

### 3.2 Features Section - Cards 3D

#### 3.2.1 Card Tilt Effect (tipo Apple Card)
```typescript
// 3D tilt baseado na posição do mouse
- Perspectiva 3D no container
- RotateX/Y baseado em mouse position
- Shine effect que segue o cursor
- Shadow dinâmica baseada no ângulo
- Parallax interno (ícone vs texto)
```

**Bibliotecas:**
- `react-tilt` ou implementação custom
- `framer-motion` para smooth transitions
- CSS `transform-style: preserve-3d`

#### 3.2.2 Hover States Avançados
```typescript
// Multi-layer hover effect
1. Border gradient animado
2. Background blur increase
3. Icon bounce/rotate
4. Text gradient shift
5. Shadow expansion
```

### 3.3 Scroll Storytelling - Como Funciona

#### 3.3.1 Scroll-Triggered Animations
```typescript
// Revelar features conforme scroll
- Pin section durante scroll
- Fade out feature anterior
- Fade in próxima feature
- Progress bar lateral
- Ilustração muda baseado no scroll progress
```

**Implementação:**
- `framer-motion` useScroll + useTransform
- ScrollTrigger patterns
- Sticky positioning
- Transform baseado em scroll percentage

#### 3.3.2 Parallax Layers
```typescript
// Diferentes velocidades de scroll
- Background: 0.5x
- Midground: 1x (normal)
- Foreground: 1.5x
- Cria profundidade visual
```

### 3.4 Bento Grid - Features Showcase

#### 3.4.1 Grid Interativo
```typescript
// Grid estilo Apple/Linear
- Hover: Expand card
- Neighboring cards shift suavemente
- Video/Lottie autoplay no hover
- Smooth layout transitions
- Magnetic cursor effect
```

**Implementação:**
- CSS Grid com `auto-fit`
- Framer Motion `layout` prop
- IntersectionObserver para lazy load
- Lottie React para animations

### 3.5 Stats/Números - Animated Counters

#### 3.5.1 Count Up Effect
```typescript
// Números sobem quando visíveis
- Trigger quando entra no viewport
- Easing customizado (expo out)
- Animação de background glow
- Partículas ao redor dos números
```

**Bibliotecas:**
- `react-countup` (já instalado)
- IntersectionObserver
- Framer Motion for glow

### 3.6 Testimonials - Carousel Premium

#### 3.6.1 Carousel Avançado
```typescript
// Carousel com física real
- Drag com inertia (momentum scroll)
- Snap points
- Progress dots animados
- Blur nos cards laterais
- Auto-play pausável
```

**Implementação:**
- `embla-carousel-react` ou Framer Motion drag
- `useSpring` para física
- CSS backdrop-filter para blur

### 3.7 Footer - Interactive Background

#### 3.7.1 Animated Mesh Gradient
```typescript
// Background animado sutil
- Gradient mesh lento
- Hover: Lightning effect
- Links com underline animation
- Social icons com flip effect
```

---

## 4. Efeitos Específicos - Biblioteca de Animações

### 4.1 Micro-Interactions

#### Text Reveals
```typescript
1. Fade Up: opacity 0→1, y: 20→0
2. Blur In: blur(10px)→blur(0)
3. Scale In: scale(0.95)→1
4. Stagger Children: delay incremental
```

#### Button States
```typescript
1. Idle: Subtle gradient animation
2. Hover: Scale 1.05, shadow increase, gradient shift
3. Active: Scale 0.98, haptic feedback
4. Loading: Spinner + disable
5. Success: Checkmark morph
6. Error: Shake animation
```

#### Card Interactions
```typescript
1. Hover: 3D tilt, shine effect, border glow
2. Click: Ripple from click point
3. Focus: Animated border
4. Active: Background shift
```

### 4.2 Scroll Effects

#### Parallax Types
```typescript
1. Simple: Different scroll speeds
2. Rotation: Rotate elements on scroll
3. Scale: Grow/shrink on scroll
4. Opacity: Fade in/out
5. Blur: blur(0)→blur(10px)
```

#### Scroll Reveals
```typescript
1. Fade + Slide: Padrão para seções
2. Stagger Grid: Cards aparecem em sequência
3. Draw SVG: Stroke animation
4. Number Count: Incremento animado
```

### 4.3 Loading States

#### Page Transitions
```typescript
1. Route Change: Blur out→in
2. Skeleton Screens: Shimmer effect
3. Progressive Images: Blur→Sharp
4. Content Load: Fade cascade
```

#### Spinners/Loaders
```typescript
1. Dot Bounce: 3 dots pulando
2. Circular: Spinner circular
3. Progress Bar: Determinate/Indeterminate
4. Skeleton: Content placeholder
```

---

## 5. Implementação Técnica

### 5.1 Stack de Animações

```typescript
Core Libraries:
- framer-motion (já instalado) - Animações React
- @react-three/fiber (já instalado) - 3D/WebGL
- @react-three/drei (já instalado) - Helpers 3D
- lottie-react (já instalado) - Lottie animations
- gsap - Animações complexas scroll

New Libraries to Add:
- @studio-freight/lenis (já instalado) - Smooth scroll
- embla-carousel-react - Carousel
- @tabler/icons-react - Icons animados
- react-intersection-observer (já instalado) - Viewport detection
```

### 5.2 Performance Optimizations

```typescript
1. GPU Acceleration
   - transform, opacity apenas
   - will-change quando necessário
   - translate3d(0,0,0) para force GPU

2. Lazy Loading
   - Lottie files sob demanda
   - 3D scenes apenas quando visível
   - Images com loading="lazy"

3. Reduced Motion
   - Detectar prefers-reduced-motion
   - Fallback para transições simples
   - Toggle manual para usuário

4. Code Splitting
   - Dynamic imports para animações pesadas
   - Separate bundle para 3D
   - Lazy load sections
```

### 5.3 Estrutura de Componentes

```
src/
├── components/
│   ├── animations/
│   │   ├── text-reveal.tsx
│   │   ├── card-3d.tsx
│   │   ├── gradient-mesh.tsx
│   │   ├── magnetic-button.tsx
│   │   ├── scroll-progress.tsx
│   │   ├── parallax-section.tsx
│   │   └── animated-counter.tsx
│   ├── ui/
│   │   ├── button-advanced.tsx
│   │   ├── card-interactive.tsx
│   │   ├── carousel-premium.tsx
│   │   └── bento-grid.tsx
│   └── sections/
│       ├── hero-advanced.tsx
│       ├── features-3d.tsx
│       ├── scroll-story.tsx
│       └── testimonials-carousel.tsx
├── lib/
│   ├── animations/
│   │   ├── variants.ts (Framer variants)
│   │   ├── easings.ts (Custom easings)
│   │   ├── utils.ts (Animation helpers)
│   │   └── hooks.ts (useScrollProgress, etc)
│   └── three/
│       ├── shaders/ (Custom shaders)
│       └── scenes/ (3D scenes)
└── app/
    └── page.tsx (Updated with new components)
```

---

## 6. Fases de Implementação

### Fase 1: Foundation (Semana 1)
**Objetivo**: Preparar infraestrutura e componentes base

1. Setup de bibliotecas adicionais
2. Criar sistema de variants do Framer Motion
3. Criar hooks de animação reutilizáveis
4. Setup de Lenis smooth scroll
5. Sistema de detecção de reduced motion

**Deliverables**:
- `/lib/animations/variants.ts` com 20+ variants
- `/lib/animations/hooks.ts` com 5+ hooks
- Smooth scroll global funcionando
- Sistema de reduced motion

### Fase 2: Hero Section (Semana 2)
**Objetivo**: Hero impressionante que captura atenção

1. Gradient mesh background (WebGL)
2. Text reveal avançado (split + stagger)
3. CTA buttons com micro-interações
4. Spotlight effect seguindo cursor
5. Scroll indicator animado

**Deliverables**:
- Hero completamente redesenhado
- Performance 60fps garantida
- Mobile otimizado
- Lighthouse score >90

### Fase 3: Features Section (Semana 3)
**Objetivo**: Cards 3D interativos

1. Card tilt 3D effect
2. Hover states multi-layer
3. Icon animations (Lottie)
4. Bento grid layout
5. Magnetic cursor effect

**Deliverables**:
- 4-6 feature cards com 3D
- Hover effects suaves
- Layout responsivo
- Icons animados

### Fase 4: Scroll Storytelling (Semana 4)
**Objetivo**: Experiência de scroll envolvente

1. Pin section durante scroll
2. Feature reveal sequencial
3. Parallax multi-layer
4. Progress indicator
5. Ilustrações interativas

**Deliverables**:
- Seção "Como Funciona" interativa
- Scroll progress bar
- 3-5 steps animados
- Ilustrações que mudam

### Fase 5: Polish & Details (Semana 5)
**Objetivo**: Refinamento e micro-interações

1. Animated counters (stats)
2. Testimonials carousel premium
3. Footer interativo
4. Page transitions
5. Loading states

**Deliverables**:
- Todas as seções polished
- Transições entre páginas
- Loading states consistentes
- Error states animados

### Fase 6: Optimization (Semana 6)
**Objetivo**: Performance e acessibilidade

1. Bundle size optimization
2. Lazy loading otimizado
3. Mobile performance
4. A11y audit completo
5. Browser testing

**Deliverables**:
- Lighthouse score >95
- Bundle size <500kb
- Mobile smooth 60fps
- WCAG AA compliant

---

## 7. Métricas de Sucesso

### 7.1 Performance
- Lighthouse Performance: >95
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1
- Frame Rate: 60fps consistente

### 7.2 User Engagement
- Tempo médio na página: +50%
- Scroll depth: +30%
- Click-through rate (CTA): +25%
- Bounce rate: -20%

### 7.3 Technical
- Bundle size: <500kb inicial
- Code coverage: >80%
- Accessibility score: 100
- SEO score: 100
- Best Practices: 100

---

## 8. Biblioteca de Animações - Specs Detalhadas

### 8.1 Text Animations

#### Split Text Reveal
```typescript
// Aparecer palavra por palavra
- Split em palavras/caracteres
- Stagger delay: 50ms
- Easing: easeOut
- Direction: bottom-to-top
- Opacity: 0→1, Y: 20→0
```

#### Gradient Text Animation
```typescript
// Texto com gradiente animado
- background: linear-gradient
- background-size: 200%
- animation: gradient-shift 3s infinite
- background-clip: text
```

#### Scramble Effect
```typescript
// Texto embaralha antes de revelar
- Random characters: 5 iterations
- Duration: 500ms
- Final: real text
- Use case: números, stats
```

### 8.2 Button Animations

#### Magnetic Button
```typescript
// Botão atrai cursor
- Detectar mouse proximity (<100px)
- Translate button: max 10px
- Easing: spring
- Reset quando mouse sai
```

#### Ripple Effect
```typescript
// Ondulação no click
- Criar <span> no click position
- Scale: 0→2
- Opacity: 0.5→0
- Duration: 600ms
- Remove element após animation
```

#### Shimmer Effect
```typescript
// Brilho passa pelo botão
- Linear gradient 45deg
- Translate: -100%→100%
- Duration: 2s
- Loop infinito
- Opacity: 0.3
```

### 8.3 Card Animations

#### 3D Tilt
```typescript
// Inclinação 3D baseada em mouse
- Calculate mouse position relative to card
- RotateX: -10 a 10 deg
- RotateY: -10 a 10 deg
- Perspective: 1000px
- Transition: smooth spring
```

#### Shine Effect
```typescript
// Brilho que segue cursor
- Pseudo-element ::before
- Radial gradient centered on cursor
- Opacity based on cursor proximity
- Blend mode: overlay
```

#### Border Gradient Animation
```typescript
// Borda com gradiente animado
- Gradient posicionado em ::before
- Rotate gradient: 0→360deg
- Duration: 3s infinite
- Border-radius: inherit
```

### 8.4 Scroll Animations

#### Parallax Section
```typescript
// Seção com múltiplas layers
- Layer 1 (bg): speed 0.5
- Layer 2 (content): speed 1.0
- Layer 3 (fg): speed 1.5
- Use: useScroll + useTransform
```

#### Scroll Progress Bar
```typescript
// Barra de progresso do scroll
- Fixed top position
- Width: 0→100% based on scroll
- Color gradient
- Height: 3px
- Z-index: 9999
```

#### Pin Section
```typescript
// Fixar seção durante scroll
- position: sticky
- Calculate scroll progress
- Trigger animations based on progress
- Unpin quando completar
```

### 8.5 Loading Animations

#### Skeleton Loader
```typescript
// Placeholder com shimmer
- Background: gray gradient
- Shimmer: white→transparent
- Animation: shimmer 2s infinite
- Border radius: match content
```

#### Spinner Variants
```typescript
1. Circular: rotate 360deg infinite
2. Dots: 3 dots bounce alternado
3. Pulse: scale + opacity
4. Bar: width 0→100% indeterminate
```

### 8.6 3D/WebGL Effects

#### Mesh Gradient Background
```typescript
// Gradient animado com noise
- Shader: Perlin noise
- Colors: brand colors
- Animation: slow morph
- Intensity: sutil (não distrai)
- Fallback: static gradient
```

#### Particle System
```typescript
// Partículas flutuantes
- Count: 50-100
- Size: 2-4px
- Speed: 0.5-2 px/s
- Direction: random float
- Opacity: 0.2-0.5
- Blur: 1px
```

#### Floating Elements
```typescript
// Elementos flutuando suavemente
- Transform: translateY
- Range: -10px a 10px
- Duration: 3-5s
- Easing: easeInOut
- Infinite alternate
```

---

## 9. Design Tokens - Animações

### 9.1 Durations
```typescript
export const durations = {
  instant: 100,      // Micro-interactions
  fast: 200,         // Hover states
  normal: 300,       // Default
  slow: 500,         // Emphasis
  slower: 800,       // Major transitions
  slowest: 1200,     // Page transitions
}
```

### 9.2 Easings
```typescript
export const easings = {
  // Standard
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],

  // Custom
  spring: { type: "spring", stiffness: 300, damping: 30 },
  bounce: { type: "spring", stiffness: 400, damping: 10 },
  smooth: [0.25, 0.1, 0.25, 1],
  expo: [0.87, 0, 0.13, 1],
}
```

### 9.3 Variants Library
```typescript
// Arquivo: /lib/animations/variants.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

// ... 20+ more variants
```

---

## 10. Accessibility & Performance

### 10.1 Reduced Motion Support
```typescript
// Detectar preferência
const prefersReducedMotion = useReducedMotion()

// Variants condicionais
const variants = prefersReducedMotion
  ? { animate: { opacity: 1 } }
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }

// Toggle manual
<AnimationToggle /> // Componente para desabilitar
```

### 10.2 Performance Budgets
```typescript
// Limites por seção
Hero: 100kb (3D + images)
Features: 50kb (Lottie files)
Testimonials: 30kb (images)
Footer: 20kb

Total JavaScript: <400kb
Total CSS: <50kb
Total Fonts: <100kb
```

### 10.3 Loading Strategy
```typescript
// Critical: Load imediato
- Hero section
- Navigation
- Critical CSS

// Deferred: Load após TTI
- Scroll sections
- Testimonials
- Footer

// Lazy: Load on visibility
- 3D scenes
- Lottie animations
- Heavy images
```

---

## 11. Testing & QA

### 11.1 Animation Testing
- [ ] 60fps em todas as animações
- [ ] Funciona sem JavaScript (progressive enhancement)
- [ ] Reduced motion respeitado
- [ ] Mobile performance OK
- [ ] Sem layout shift (CLS)

### 11.2 Browser Testing
- [ ] Chrome (desktop/mobile)
- [ ] Safari (desktop/mobile)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

### 11.3 Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile (414x896)

---

## 12. Referências e Inspiração

### 12.1 Sites para Estudar
1. **stripe.com** - Gradient mesh, scroll effects
2. **vercel.com** - Text animations, blur effects
3. **linear.app** - Product animations, smooth transitions
4. **apple.com** - Scroll storytelling, 3D
5. **framer.com** - Interactive elements
6. **lenis.darkroom.engineering** - Smooth scroll showcase
7. **awwwards.com/websites/animation/** - Curadoria

### 12.2 Recursos Técnicos
- Framer Motion Docs: framer.com/motion
- GSAP ScrollTrigger: greensock.com/scrolltrigger
- Three.js Journey: threejs-journey.com
- WebGL Fundamentals: webglfundamentals.org

### 12.3 Design Systems com Animações
- Vercel Design System
- Stripe Design System
- Linear Design System
- Radix UI Primitives

---

## 13. Timeline & Milestones

### Sprint 1 (Semana 1-2): Foundation + Hero
- Setup libraries
- Animation system
- Hero section completo
- **Demo**: Hero impressionante

### Sprint 2 (Semana 3-4): Features + Scroll
- Features cards 3D
- Scroll storytelling
- Bento grid
- **Demo**: Features interativas

### Sprint 3 (Semana 5-6): Polish + Launch
- Testimonials
- Footer
- Optimizations
- Testing
- **Launch**: Site completo

---

## 14. Notas Finais

### 14.1 Princípios
- **Menos é mais**: Animações servem o conteúdo
- **Performance > Estética**: Se não roda 60fps, simplificar
- **Mobile First**: 70% dos users estão em mobile
- **Accessibility**: Nunca comprometer a11y por animação

### 14.2 Inspiração Final
> "As melhores animações são aquelas que você quase não nota conscientemente, mas que tornam a experiência deliciosa." - Stripe Design Team

### 14.3 Success Story
Queremos que visitantes do site digam:
- "Caramba, esse site é suave!"
- "Nunca vi um site de fintech assim"
- "Parece um produto premium"
- "A Kodano deve ser muito boa se o site é assim"
