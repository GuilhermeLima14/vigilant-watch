# UBS Watchdog - Design Specifications

## 📋 Overview

Sistema de monitoramento de transações e compliance com estética dark mode premium, efeitos glass morphism e design system consistente.

---

## 🎨 Color Palette

### Primary Colors

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Background | `222 47% 6%` | `#0a0e17` | Fundo principal da aplicação |
| Foreground | `210 40% 98%` | `#f8fafc` | Texto principal |
| Primary | `217 91% 60%` | `#3b82f6` | Ações principais, links, botões primários |
| Secondary | `217 33% 17%` | `#1e293b` | Botões secundários, backgrounds alternativos |
| Accent | `187 92% 45%` | `#06b6d4` | Destaques, gradientes, elementos especiais |

### Semantic Colors

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Success | `142 71% 45%` | `#22c55e` | Estados positivos, confirmações |
| Warning | `38 92% 50%` | `#f59e0b` | Alertas de atenção |
| Destructive | `0 84% 60%` | `#ef4444` | Erros, ações destrutivas, alertas críticos |
| Info | `199 89% 48%` | `#0ea5e9` | Informações, dicas |

### Interface Colors

| Name | HSL | Usage |
|------|-----|-------|
| Card | `222 47% 8%` | Background de cards |
| Border | `217 33% 17%` | Bordas de elementos |
| Muted | `217 33% 14%` | Backgrounds sutis |
| Muted Foreground | `215 20% 55%` | Texto secundário |
| Input | `217 33% 17%` | Background de inputs |
| Ring | `217 91% 60%` | Focus rings |

### Chart Colors

| Name | HSL | Usage |
|------|-----|-------|
| Chart 1 | `217 91% 60%` | Série principal |
| Chart 2 | `187 92% 45%` | Série secundária |
| Chart 3 | `142 71% 45%` | Série terciária |
| Chart 4 | `38 92% 50%` | Série quaternária |
| Chart 5 | `0 84% 60%` | Série de destaque |

---

## 📝 Typography

### Font Family

```css
font-family: 'Inter', sans-serif;
```

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Números grandes, estatísticas |
| 400 | Regular | Texto padrão |
| 500 | Medium | Ênfase leve, labels |
| 600 | Semibold | Títulos de cards, subtítulos |
| 700 | Bold | Títulos principais, destaques |

### Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | 36px (2.25rem) | 1.2 | Bold | Títulos de página |
| H2 | 30px (1.875rem) | 1.25 | Bold | Seções principais |
| H3 | 24px (1.5rem) | 1.3 | Semibold | Subseções |
| H4 | 20px (1.25rem) | 1.4 | Semibold | Títulos de cards |
| Body Large | 18px (1.125rem) | 1.6 | Regular | Descrições importantes |
| Body | 16px (1rem) | 1.6 | Regular | Texto padrão |
| Body Small | 14px (0.875rem) | 1.5 | Regular | Texto secundário |
| Caption | 12px (0.75rem) | 1.4 | Regular | Labels, metadados |

---

## 📐 Spacing System

Baseado em múltiplos de 4px:

| Token | Value | Usage |
|-------|-------|-------|
| 0.5 | 2px | Micro espaçamentos |
| 1 | 4px | Espaçamentos mínimos |
| 2 | 8px | Padding interno pequeno |
| 3 | 12px | Gaps de elementos |
| 4 | 16px | Padding padrão |
| 5 | 20px | Gaps de seção |
| 6 | 24px | Padding de cards |
| 8 | 32px | Margens de seção |
| 10 | 40px | Espaços grandes |
| 12 | 48px | Separações de seção |
| 16 | 64px | Margens de página |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 2px | Elementos pequenos |
| default | 6px | Inputs, botões pequenos |
| md | 8px | Cards menores |
| lg | 12px | Cards, modais |
| xl | 16px | Cards grandes |
| 2xl | 24px | Elementos destacados |
| full | 50% | Avatares, badges circulares |

**CSS Variable:**
```css
--radius: 0.5rem;
```

---

## 🌊 Effects & Shadows

### Glass Morphism

```css
.glass {
  background: hsl(var(--card) / 0.5);
  backdrop-filter: blur(24px);
  border: 1px solid hsl(var(--border) / 0.5);
}
```

### Card Glow

```css
.card-glow {
  box-shadow: 0 0 40px -10px hsl(var(--primary) / 0.3);
}
```

### Gradient Primary

```css
--gradient-primary: linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(187 92% 45%) 100%);
```

### Gradient Text

```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎭 Animations

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
```

### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}
```

### Pulse Subtle

```css
@keyframes pulseSoft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.animate-pulse-subtle {
  animation: pulseSoft 2s ease-in-out infinite;
}
```

---

## 🏷️ Status Badges

### Risk Levels

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Low | `success/20` | `success` | `success/50` |
| Medium | `warning/20` | `warning` | `warning/50` |
| High | `destructive/20` | `destructive` | `destructive/50` |

### KYC Status

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Verified | `success/20` | `success` | `success/50` |
| Pending | `warning/20` | `warning` | `warning/50` |
| Expired | `destructive/20` | `destructive` | `destructive/50` |

### Alert Severity

| Severity | Background | Text | Border |
|----------|------------|------|--------|
| Low | `info/20` | `info` | `info/50` |
| Medium | `warning/20` | `warning` | `warning/50` |
| High | `destructive/20` | `destructive` | `destructive/50` |
| Critical | `destructive/30` | `destructive` | `destructive` |

### Alert Status

| Status | Background | Text | Border |
|--------|------------|------|--------|
| New | `primary/20` | `primary` | `primary/50` |
| In Analysis | `warning/20` | `warning` | `warning/50` |
| Resolved | `success/20` | `success` | `success/50` |

### Transaction Types

| Type | Background | Text | Border |
|------|------------|------|--------|
| Deposit | `success/20` | `success` | `success/50` |
| Withdrawal | `warning/20` | `warning` | `warning/50` |
| Transfer | `info/20` | `info` | `info/50` |

---

## 🧩 Components

### Buttons

**Variants:**
- `default` - Background primary, texto primary-foreground
- `secondary` - Background secondary, texto secondary-foreground
- `outline` - Borda, background transparente
- `ghost` - Sem background, hover sutil
- `destructive` - Background destructive
- `link` - Estilo de link

**Sizes:**
- `sm` - height: 36px, padding: 12px
- `default` - height: 40px, padding: 16px
- `lg` - height: 44px, padding: 24px
- `icon` - 40x40px

### Cards

**Base Card:**
```css
background: hsl(var(--card));
border: 1px solid hsl(var(--border));
border-radius: var(--radius);
```

**Stat Card:**
```css
.stat-card {
  @apply glass rounded-xl p-6;
  transition: all 0.3s;
}
.stat-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 40px -10px hsl(var(--primary) / 0.3);
}
```

### Inputs

```css
background: hsl(var(--input));
border: 1px solid hsl(var(--border));
border-radius: var(--radius);
padding: 8px 12px;
font-size: 14px;
```

**Focus State:**
```css
outline: none;
ring: 2px solid hsl(var(--ring));
ring-offset: 2px;
```

---

## 📱 Responsive Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablets |
| lg | 1024px | Desktop pequeno |
| xl | 1280px | Desktop padrão |
| 2xl | 1536px | Desktop grande |

---

## 🖼️ Layout

### Sidebar

- Width: 280px (desktop)
- Background: `--sidebar-background`
- Border: 1px solid `--sidebar-border`

### Main Content

- Padding: 24px
- Max Width: none (fluid)

### Page Header

- Margin Bottom: 24px
- Title: H1 + gradient-text
- Description: text-muted-foreground

---

## 📊 Charts (Recharts)

### Colors

Use as CSS variables `--chart-1` até `--chart-5` para manter consistência.

### Styling

```jsx
<BarChart>
  <Bar 
    fill="hsl(var(--chart-1))" 
    radius={[4, 4, 0, 0]}
  />
  <XAxis 
    stroke="hsl(var(--muted-foreground))"
    fontSize={12}
  />
</BarChart>
```

---

## 🔧 Figma Implementation Tips

1. **Criar Design Tokens** - Configure todos os tokens acima como variáveis no Figma
2. **Componentes Base** - Crie os componentes base (Button, Input, Card, Badge)
3. **Auto Layout** - Use auto layout com gaps de 16px/24px
4. **Grid System** - Configure grid de 12 colunas com gutter de 24px
5. **Dark Mode** - Este design já é dark mode por padrão

---

## 📁 Exported Assets

Para exportar assets do projeto:
- Ícones: Lucide React (https://lucide.dev)
- Fontes: Google Fonts Inter
- Screenshots: Capturar do preview

---

*Documento gerado automaticamente - UBS Watchdog Design System v1.0*
