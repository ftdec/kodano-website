# Kodano - Exemplos de Uso do Gradiente

Este documento mostra como usar o componente `KodanoGradient` em diferentes partes do site.

## Importação

```tsx
import { KodanoGradient } from "@/components/ui/kodano-gradient";
```

## Exemplos de Uso

### 1. Títulos de Seção

```tsx
<h2 className="text-4xl font-bold text-center">
  Transforme sua{" "}
  <KodanoGradient>operação financeira</KodanoGradient>
</h2>
```

### 2. CTAs e Destaques

```tsx
<p className="text-lg">
  Aumente suas taxas de aprovação em até{" "}
  <KodanoGradient variant="premium">40%</KodanoGradient>
</p>
```

### 3. Hero Section

```tsx
<h1 className="text-5xl font-bold">
  <KodanoGradient variant="premium">
    O futuro dos pagamentos
  </KodanoGradient>
  {" "}começa aqui
</h1>
```

### 4. Features

```tsx
<div className="feature-card">
  <h3 className="text-2xl font-semibold">
    <KodanoGradient>APIs Modernas</KodanoGradient>
  </h3>
  <p>Integração rápida e documentação completa</p>
</div>
```

### 5. Pricing

```tsx
<div className="pricing-highlight">
  <span className="text-sm uppercase">A partir de</span>
  <KodanoGradient variant="premium" className="text-6xl font-bold">
    1,99%
  </KodanoGradient>
  <span className="text-sm">por transação</span>
</div>
```

### 6. Stats/Números

```tsx
<div className="stat">
  <KodanoGradient variant="premium" className="text-4xl font-bold">
    +10.000
  </KodanoGradient>
  <p className="text-slate-600">empresas atendidas</p>
</div>
```

## Variantes

### Simple (Padrão)
Ideal para textos menores e destaques sutis.

**Gradiente:** `#002A35 → #00C8DC`

```tsx
<KodanoGradient>texto aqui</KodanoGradient>
```

### Premium
Ideal para títulos principais e elementos de destaque.

**Gradiente:** `#003845 → #005A6A → #00C8DC` (3 cores)

```tsx
<KodanoGradient variant="premium">texto aqui</KodanoGradient>
```

## Classes Customizadas

Você pode adicionar classes Tailwind adicionais:

```tsx
<KodanoGradient
  variant="premium"
  className="text-6xl font-extrabold tracking-tight"
>
  Kodano
</KodanoGradient>
```

## Combinação com Outros Elementos

### Com Ícones

```tsx
<div className="flex items-center gap-2">
  <CheckIcon className="text-[#00C8DC]" />
  <KodanoGradient>Aprovação instantânea</KodanoGradient>
</div>
```

### Em Listas

```tsx
<ul>
  <li>
    <KodanoGradient>✓</KodanoGradient> Taxas competitivas
  </li>
  <li>
    <KodanoGradient>✓</KodanoGradient> Suporte 24/7
  </li>
</ul>
```

### Em Cards

```tsx
<div className="card border-2 border-[#00C8DC]/20 hover:border-[#00C8DC]">
  <h3>
    <KodanoGradient variant="premium">
      Plano Enterprise
    </KodanoGradient>
  </h3>
  <p>Recursos ilimitados para sua empresa</p>
</div>
```

## Acessibilidade

O componente usa `bg-clip-text` que pode causar problemas de contraste. Sempre garanta:

1. **Tamanho mínimo:** Use pelo menos 16px (text-base)
2. **Peso da fonte:** Prefira font-medium ou superior
3. **Contexto:** Não use para textos longos, apenas destaques

## Exemplos Completos

### Hero Premium

```tsx
<section className="hero">
  <h1 className="text-6xl font-bold leading-tight">
    <KodanoGradient variant="premium">
      Subadquirência Digital
    </KodanoGradient>
    <br />
    que impulsiona seu negócio
  </h1>

  <p className="text-xl text-slate-600 mt-4">
    APIs modernas, taxas competitivas e{" "}
    <KodanoGradient>aprovação de até 40% maior</KodanoGradient>
  </p>
</section>
```

### Feature Highlight

```tsx
<div className="feature-grid">
  <div className="feature">
    <KodanoGradient variant="premium" className="text-5xl font-bold">
      1,99%
    </KodanoGradient>
    <p>Taxa por transação</p>
  </div>

  <div className="feature">
    <KodanoGradient variant="premium" className="text-5xl font-bold">
      99,9%
    </KodanoGradient>
    <p>Uptime garantido</p>
  </div>

  <div className="feature">
    <KodanoGradient variant="premium" className="text-5xl font-bold">
      24/7
    </KodanoGradient>
    <p>Suporte especializado</p>
  </div>
</div>
```

### CTA Section

```tsx
<section className="cta bg-slate-50 p-12 rounded-3xl">
  <h2 className="text-4xl font-bold text-center">
    Pronto para{" "}
    <KodanoGradient variant="premium">
      transformar seus pagamentos
    </KodanoGradient>
    ?
  </h2>

  <div className="flex gap-4 justify-center mt-8">
    <Button variant="kodano" size="lg" rounded="full">
      Começar agora
    </Button>
    <Button variant="kodano-outline" size="lg" rounded="full">
      Ver demonstração
    </Button>
  </div>
</section>
```

## Boas Práticas

✅ **Use para:**
- Títulos principais
- Números e estatísticas
- Palavras-chave importantes
- CTAs e destaques

❌ **Não use para:**
- Textos longos (mais de 10 palavras)
- Corpo de texto
- Labels de formulário
- Navegação

## Cores Complementares

Para combinar com o gradiente Kodano:

```tsx
// Backgrounds
bg-slate-50      // Fundo claro
bg-white         // Branco puro
bg-[#002A35]     // Azul-petróleo Kodano

// Textos
text-slate-600   // Texto secundário
text-slate-800   // Texto principal
text-white       // Texto em fundo escuro

// Bordas
border-[#00C8DC]/20   // Borda sutil cyan
border-[#00C8DC]      // Borda destaque cyan
```
