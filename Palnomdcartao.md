
---

## 5. HERO STAGE (O “QUADRADO”)

### Dimensões
- Aspect ratio fixo: **16 / 10**
- Border radius: 28–32px
- Overflow: hidden
- Sempre ocupa altura consistente (não colapsa)

### Fundo
**NÃO É branco puro vazio**

Criar fundo premium:
- base: #FFFFFF
- radial-gradient MUITO leve com ciano Kodano
- vignette quase imperceptível
- sombra externa suave (elevação)

Resultado: parece “vidro branco”, não um card vazio.

---

## 6. POSTER (OBRIGATÓRIO)

### O que é
Imagem estática do cartão já renderizado:
- mesma posição
- mesma escala
- mesma perspectiva
- mesmas cores

### Regras
- Renderizado a partir do 3D OU asset manual
- Sempre visível no SSR
- Nunca some até o Canvas assumir
- Nunca aparece sozinho em fundo branco

### Transição
- Canvas entra com fade 150–250ms
- Poster sai suavemente
- Usuário NÃO percebe troca

---

## 7. CARTÃO (DESIGN DEFINITIVO)

### Proibições
❌ Logo Kodano  
❌ “Kodano Demo”  
❌ Texto fake chamativo  
❌ Branding explícito  

> O cartão é **conceito**, não material promocional.

### Visual
- Cor base: **Ciano Kodano**
- Variação sutil de tom (gradiente realista)
- Chip discreto
- Número genérico
- Data genérica
- Sem glow exagerado

### Material (Three.js)
- meshPhysicalMaterial
- roughness moderada
- clearcoat baixo
- reflexão controlada
- ZERO efeito “plástico barato”

---

## 8. ENQUADRAMENTO (PONTO MAIS CRÍTICO)

### Regra
O cartão deve ocupar **sempre** 75–85% do Hero.

### Implementação obrigatória
- Bounding box do modelo
- Fit automático no mount
- Refit no resize
- Margem percentual fixa
- Nunca confiar em escala manual hardcoded

Resultado:
❌ Cartão pequeno = ERRO  
❌ Cartão cortado = ERRO  

---

## 9. CÂMERA

- FOV equilibrado (não wide demais)
- Leve perspectiva premium
- Câmera fixa (sem drift)
- Micro tilt apenas no hover

---

## 10. ANIMAÇÃO (ENTERPRISE)

### Entrada
- Fade + micro movimento
- Nada de “voar”
- Nada de bounce

### Idle
- Quase imperceptível
- Respiração sutil
- 100% opcional

### Mouse
- Tilt máximo: 2–3°
- Clamp rígido
- Sem jitter

---

## 11. LOADING (SEM MOSTRAR LOADING)

### Regra
Se o Poster está visível, **NÃO EXISTE loading visível**

Spinner:
- Só se necessário
- Pequeno
- Ciano Kodano
- Nunca sozinho em branco

---

## 12. PERFORMANCE

- frameloop="demand"
- invalidate apenas quando:
  - hover
  - resize
  - entrada
- Mobile:
  - menos luz
  - mesma escala
- Sem WebGL:
  - Poster fica definitivo
  - UX intacta

---

## 13. QA — CHECKLIST FINAL

### Reprovação automática se:
- aparecer branco vazio
- cartão pequeno
- poster e canvas desalinhados
- cartão “flutua estranho”
- visual parecer demo

### Aprovação só se:
- hard refresh impecável
- throttling 3G impecável
- mobile impecável
- WebGL off impecável

---

## 14. ORDEM DE IMPLEMENTAÇÃO (OBRIGATÓRIA)

1. Criar Hero Stage definitivo
2. Criar Poster perfeito
3. Garantir first paint sólido
4. Só então integrar Canvas
5. Ajustar enquadramento
6. Ajustar material
7. Ajustar animação
8. Testar todos os cenários

---

## 15. DEFINIÇÃO DE SUCESSO

> Se isso fosse apresentado em um pitch para um banco ou big tech,
> ninguém questionaria a maturidade da empresa.

Esse é o nível esperado.
