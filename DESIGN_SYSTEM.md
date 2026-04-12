# Portfolio Design System
> Derived from: vercel.com/cdn · vercel.com/frameworks/nextjs · vercel.com/fluid · vercel.com/products/previews

---

## Philosophy

**Precision Minimalism meets Infrastructure Modernism.**

The design communicates authority through *exclusion* — every element that isn't present is as intentional as every element that is. The aesthetic borrows from terminal interfaces, engineering diagrams, and Swiss typography, elevated into a premium marketing experience. Color is functional, never decorative. Whitespace signals confidence. Typography carries the hierarchy.

**Core tenets:**
1. Function IS form — every visual represents something purposeful
2. Contrast over gradation — clean transitions beat soft blends
3. Restraint at every level — one accent color, one typeface family
4. Dark = powerful/serious, Light = approachable/clear
5. Typography alone should communicate the information architecture
6. Grid is the organizing principle — everything aligns intentionally
7. Performance-first animation — GPU-only, cancelable, purposeful

---

## Color System

### Foundations

```css
/* Dark mode (primary marketing expression) */
--bg-page:       #000000;
--bg-surface:    #0a0a0a;
--bg-elevated:   #111111;
--bg-hover:      #171717;

/* Light mode */
--bg-page-light:    #ffffff;
--bg-surface-light: #fafafa;
--bg-elevated-light:#f5f5f5;

/* Text */
--text-primary-dark:   #ffffff;
--text-secondary-dark: rgba(255, 255, 255, 0.55);
--text-tertiary-dark:  rgba(255, 255, 255, 0.35);

--text-primary-light:   #000000;
--text-secondary-light: #666666;
--text-tertiary-light:  #999999;
```

### 10-Step Gray Scale

| Token | Light Mode | Dark Mode | Role |
|---|---|---|---|
| `--gray-100` | `#fafafa` | `#111111` | Subtlest surface / hover bg |
| `--gray-200` | `#eaeaea` | `#333333` | Dividers, secondary surface |
| `--gray-300` | `#999999` | `#444444` | Placeholder text |
| `--gray-400` | `#888888` | `#555555` | Default border |
| `--gray-500` | `#666666` | `#666666` | Hover border |
| `--gray-600` | `#444444` | `#888888` | Active border |
| `--gray-700` | `#333333` | `#999999` | High-contrast surface |
| `--gray-800` | `#111111` | `#eaeaea` | Near-black / near-white |
| `--gray-900` | `#000000` | `#fafafa` | Secondary text |
| `--gray-1000` | `#000000` | `#ffffff` | Primary text |

### Alpha Borders (dark mode)

```css
--border-subtle:  rgba(255, 255, 255, 0.06);
--border-default: rgba(255, 255, 255, 0.08);
--border-strong:  rgba(255, 255, 255, 0.15);
--border-focus:   rgba(255, 255, 255, 0.20);

/* Light mode */
--border-subtle-light:  rgba(0, 0, 0, 0.04);
--border-default-light: rgba(0, 0, 0, 0.08);
--border-strong-light:  rgba(0, 0, 0, 0.21);
```

### Brand / Functional Colors

```css
/* Primary interactive */
--blue:         #0070f3;
--blue-light:   #3291ff;
--blue-dark:    #0059ab;

/* Status */
--error:        #ee0000;
--warning:      #f5a623;
--success:      #50e3c2;

/* Decorative (use sparingly, < 5% opacity in backgrounds) */
--violet:       #7928ca;
--cyan:         #79ffe1;
--pink:         #ff0080;
--magenta:      #f81ce5;
```

### Atmospheric / Decorative Gradients

```css
/* Hero radial glow (place behind main content) */
--hero-glow: radial-gradient(ellipse at 50% 0%, rgba(0, 112, 243, 0.10) 0%, transparent 60%);

/* Aurora card border (premium highlight) */
--aurora-border: conic-gradient(from 180deg, #ffcade, #e9d3ff, #c8ddff, #e9d3ff, #ffcade);

/* Shimmer border line */
--shimmer-border: linear-gradient(90deg, rgba(40, 140, 249, 0.15) 0%, rgba(227, 44, 107, 0.15) 100%);

/* Gradient text (hero headline accents) */
--text-gradient: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.55) 100%);
```

---

## Typography

### Font Stack

```css
--font-sans: 'Geist', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', 'SFMono-Regular', 'Menlo', monospace;
```

> Install: `npm i geist` — or load from Google Fonts. Self-host WOFF2 for performance.

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Hero / Display | 64–72px | 700 | 1.0–1.05 | -0.04em |
| H1 Page | 48–56px | 600–700 | 1.05–1.1 | -0.03em |
| H2 Section | 40px | 600 | 1.1 | -0.025em |
| H3 Subsection | 32px | 600 | 1.15 | -0.02em |
| H4 Card | 20–24px | 600 | 1.2 | -0.015em |
| H5 Label | 14–16px | 600 | 1.2 | -0.01em |
| Body Large | 18–20px | 400 | 1.6 | -0.01em |
| Body | 16px | 400 | 1.5 | -0.01em |
| Body Small | 14px | 400 | 1.5 | 0em |
| Caption / Meta | 12–13px | 400 | 1.625 | 0em |
| Code Inline | 13–14px mono | 400 | 1.5 | 0em |
| Button | 14–16px | 500 | 1 | 0em |
| Badge / Pill | 11–12px | 500 | 1 | 0.02em |

**Signature characteristics:**
- Tight negative letter-spacing (`-0.04em`) on all display headings — the most distinctive Vercel typographic signal
- Tight leading (1.0–1.1) on headlines creates structural mass
- `font-variant-numeric: tabular-nums` on all stats, counters, comparisons
- `font-semibold` (600) is the default heading weight

---

## Spacing System

Base unit: **8px**

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--section-sm:  16px 0;
--section-md:  32px 0;
--section-lg:  90px 0;    /* primary marketing section rhythm */
--section-xl:  120px 0;
```

---

## Border Radius

```css
--radius-xs:   4px;   /* tags, chips */
--radius-sm:   6px;   /* buttons, inputs, small cards */
--radius-md:   8px;   /* standard cards */
--radius-lg:   12px;  /* large cards, modals */
--radius-xl:   16px;  /* feature hero cards */
--radius-pill: 9999px; /* badges, pill buttons, avatars */
--radius-circle: 50%;  /* avatars only */
```

**Nested radius rule:** child elements always use `child_r = parent_r - padding`. Never a larger inner radius than outer.

---

## Shadows & Depth

Depth is achieved through **border contrast and background stepping**, not shadow stacks. Shadows exist primarily in light mode.

```css
/* Layers (dark mode — surfaces step away from black) */
--layer-0:  #000000;   /* page */
--layer-1:  #0a0a0a;   /* subtle elevation */
--layer-2:  #111111;   /* cards */
--layer-3:  #171717;   /* hover state */
--layer-4:  #1f1f1f;   /* overlays, modals */

/* Shadows (light mode / dropdowns) */
--shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.08);
--shadow-md:   0 5px 10px rgba(0, 0, 0, 0.12);
--shadow-lg:   0 8px 30px rgba(0, 0, 0, 0.12);
--shadow-xl:   0 30px 60px rgba(0, 0, 0, 0.12);

/* Two-layer shadow (cards) */
--shadow-card: 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06);
```

---

## Layout & Grid

### Container

```css
--container-max: 1200px;
--container-padding: clamp(16px, 4vw, 48px);
```

### Breakpoints

| Name | Width |
|---|---|
| xs | 0–479px |
| sm | 480–639px |
| md | 640–767px |
| smd | 768–1023px |
| lg | 1024–1279px |
| xl | 1280px+ |

Nav collapse to hamburger: **1150px**

### Layout Patterns

- **Centered single-column** — hero, section headlines, testimonials
- **2-column split** — feature sections (visual + text)
- **3–4 column bento grid** — feature card clusters
- **Full-bleed dark sections** — atmospheric hero, with constrained content inside
- **12-column CSS Grid** at LG+, 4–8 columns at MD, single at SM

---

## Components

### Buttons

```css
/* Primary */
.btn-primary {
  background: #000000;          /* inverted in dark: #ffffff bg, #000 text */
  color: #ffffff;
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  transition: opacity 0.15s ease;
}

/* Secondary / Outlined */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-pill);
  padding: 10px 20px;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.btn-secondary:hover {
  border-color: var(--border-strong);
  background: rgba(255, 255, 255, 0.04);
}
```

### Cards

```css
.card {
  background: var(--bg-elevated);     /* #111111 dark / #ffffff light */
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);    /* 12px */
  padding: var(--space-6);            /* 24px */
  transition: border-color 0.15s ease, background 0.15s ease;
}
.card:hover {
  border-color: var(--border-strong);
  background: var(--bg-hover);
}
```

### Navbar

```css
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  background: rgba(0, 0, 0, 0.80);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-default);
  z-index: 100;
}
```

### Badges / Pills

```css
.badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
```

### Gradient Text (hero accent)

```css
.gradient-text {
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Motion & Animation

### Principles
- Animate **`transform` and `opacity` only** — GPU-accelerated, no reflow
- Never `transition: all` — always list explicit properties
- Animations must be **cancelable by user input**
- Full `prefers-reduced-motion` support — always provide static fallbacks

### Timing Tokens

```css
--duration-fast:    150ms;
--duration-default: 200ms;
--duration-medium:  300ms;
--duration-slow:    400ms;

--ease-default: ease;
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);   /* expo out — snappy, elegant */
--ease-spring:  cubic-bezier(0.075, 0.82, 0.165, 1);
--ease-modal:   cubic-bezier(0.5, 0.25, 0.35, 1);
```

### Keyframe Patterns

```css
/* Scroll reveal (primary pattern) */
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Modal appear */
@keyframes modal-enter {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Marquee / ticker */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Usage Guidelines

- **Scroll reveals:** `opacity: 0 → 1` + `translateY(20px → 0)`, 300–400ms, `ease-out`
- **Hover states:** 150ms ease — border, background, opacity changes only
- **Arrow nudge on CTAs:** `translateX(0 → 4px)` on hover, 150ms
- **Skeleton loading delay:** 150–300ms before showing (prevents flash)
- **Minimum skeleton visible:** 300–500ms (prevents flicker)
- **Ambient/background animations:** ≥ 1.5s, `linear infinite` — never distracting
- **Reduced motion:** wrap all animations in `@media (prefers-reduced-motion: reduce)`

---

## Visual Language

### Icons
- Custom SVG line icons (Geist icon set: `vercel.com/geist/icons`)
- Style: 1.5–2px stroke, rounded caps, 24×24px base size
- Monochromatic — always `currentColor`, never decorative color fill
- No third-party icon libraries

### Illustrations / Diagrams
- **Technical/schematic style** — not artistic illustration
- Flat, geometric, grid-aligned SVGs
- Theme-adaptive: provide separate light/dark SVG variants
- Color in diagrams: `#0070f3` blue for active/featured state, gray for inactive/legacy
- No stock photography, no lifestyle imagery, no people (unless product UI mockups with small avatars)

### Decorative Elements
- Thin `1px` hairline dividers
- Conic gradient halos on premium elements (very subtle, aurora colors)
- Vercel logo mark as graphic element in sparse sections
- No patterns, no noise textures, no gradients as decoration (only as atmosphere at < 10% opacity)

---

## Atmosphere Recipes

### Dark Hero Section
```css
.section-hero-dark {
  background: #000000;
  position: relative;
  overflow: hidden;
}
.section-hero-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% -10%, rgba(0, 112, 243, 0.10) 0%, transparent 55%);
  pointer-events: none;
}
```

### Aurora Card (premium highlight)
```css
.card-premium {
  position: relative;
}
.card-premium::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(from 180deg, #ffcade, #e9d3ff, #c8ddff, #e9d3ff, #ffcade);
  opacity: 0.4;
  z-index: -1;
}
```

### Frosted Glass Overlay
```css
.glass {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-default);
}
```

---

## Accessibility

- Use **APCA** contrast ratios (preferred over WCAG 2 for perceived accuracy)
- All interactive states: hover > rest contrast, active > hover contrast
- `:focus-visible` only (not `:focus`) for focus rings
- Minimum touch targets: 24px desktop, 44px mobile
- Input font-size: ≥ 16px on mobile (prevents iOS auto-zoom)
- `translate="no"` on brand names, technical identifiers, code
- `scroll-margin-top` on all anchor-targeted headings
- Skip navigation link (`#skip-nav`)
- Semantic HTML first, ARIA only when no semantic equivalent exists
- `prefers-reduced-motion` respected with no-op fallbacks on all animations
- `prefers-color-scheme` + class-based (`light-theme`/`dark-theme`) dual support

---

## CSS Variables Starter Kit

```css
:root {
  /* Fonts */
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'SFMono-Regular', monospace;

  /* Colors - dark mode defaults */
  --bg:             #000000;
  --bg-surface:     #111111;
  --bg-hover:       #171717;
  --text:           #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.55);
  --text-tertiary:  rgba(255, 255, 255, 0.35);
  --border:         rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(255, 255, 255, 0.15);
  --accent:         #0070f3;

  /* Spacing */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-6: 24px; --sp-8: 32px; --sp-12: 48px; --sp-16: 64px;
  --sp-20: 80px; --sp-section: 90px;

  /* Radius */
  --r-sm: 6px; --r-md: 8px; --r-lg: 12px; --r-pill: 9999px;

  /* Animation */
  --dur-fast: 150ms;
  --dur-base: 200ms;
  --dur-slow: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

.light-theme {
  --bg:             #ffffff;
  --bg-surface:     #fafafa;
  --bg-hover:       #f5f5f5;
  --text:           #000000;
  --text-secondary: #666666;
  --text-tertiary:  #999999;
  --border:         rgba(0, 0, 0, 0.08);
  --border-hover:   rgba(0, 0, 0, 0.21);
}
```

---

## Implementation Checklist

- [ ] Load `Geist` + `Geist Mono` from npm or Google Fonts
- [ ] Set `background: #000` on `<html>` for dark mode
- [ ] Apply `-0.04em` letter-spacing to all display headings
- [ ] Use `rgba` borders, never opaque border colors in dark mode
- [ ] Gate all animations with `@media (prefers-reduced-motion: reduce)`
- [ ] Only animate `transform` and `opacity`
- [ ] Nested border-radius: children ≤ parent
- [ ] `tabular-nums` on all numeric data
- [ ] `backdrop-filter: blur(12px)` on sticky navbar
- [ ] Section padding: `90px 0` at desktop minimum
- [ ] Single accent: `#0070f3` — links, CTAs, highlights only
- [ ] Provide theme-adaptive assets (light/dark SVG variants)
- [ ] `prefers-color-scheme` + class-based theme system
