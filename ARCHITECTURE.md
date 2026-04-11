# Architecture

A technical deep-dive into how Composables is structured.

---

## Two-Tier Component Model

The library uses a deliberate separation between two layers of components.

### Layer 1: `_internal/`

These are **low-level primitives** — close-to-the-metal wrappers around [Base UI](https://base-ui.com/) components, with Tailwind styling applied. They're composable and flexible, but their APIs can change.

Examples: `button`, `input`, `select`, `combobox`, `field`, `card`, `dialog`.

**You should not import these directly in app code.** A Biome lint rule enforces this.

### Layer 2: `opinionated/`

These are **opinionated wrappers** around the internal primitives. They:

- Consolidate complex assembly patterns into a single, clean component
- Add props like `label`, `description`, `error`, `options`, `loading`, `trigger`, `footer`
- Wire in hooks (e.g. `useNumericInput`) and handle accessibility boilerplate
- Provide sensible defaults so you can drop them in with minimal configuration

Examples: `FormInput` (wraps `field` + `input` + `useNumericInput`), `FormSelect` (wraps `field` + `select`), `Dialog` (wraps `dialog` with trigger/title/footer API).

**This is your API surface.** Import from here.

### Why separate them?

The internal layer can evolve — Base UI updates, API changes, internal refactors — without breaking your app. The opinionated layer mediates those changes. You get:

- **Stability**: your `<FormInput>` won't break if the underlying `input` primitive changes
- **Convenience**: form fields come pre-wired with labels, errors, and accessibility attributes
- **Control**: you can still import internal primitives if you need to compose something custom (just be explicit about it)

### The Lint Boundary

`biome-ui-restricted.json` configures Biome's `noRestrictedImports` rule to error on any import from `@/components/_internal/*` in app code. The rule has an override that allows the opinionated layer itself to import from internal (that's its job).

---

## Token / Theming System

### File Structure

The design system's tokens live in `packages/ui/src/styles/`:

```
styles/
├── composable.css              ← Main entry point (composes all layers)
├── tokens.css                  ← Standalone semantic tokens (no Tailwind needed)
├── tokens/
│   ├── palette.css             ← Primitive color scales (@theme inline)
│   ├── semantic.css            ← Semantic tokens (:root + .dark)
│   ├── components.css          ← Component-level tunables
│   ├── tailwind-theme.css      ← Tailwind utility registrations
│   └── base.css                ← Global base styles
└── presets/
    ├── default.css             ← Standalone preset CSS files
    ├── brutalist.css
    ├── editorial.css
    ├── midnight.css
    ├── soft.css
    └── swiss.css
```

### Three Tiers of Tokens

#### 1. Primitive Palette

Raw colour values from a fixed scale. These don't change between light/dark mode — they're reference values.

```css
--neutral-50: #FDFDFDFF;
--neutral-100: #F9F9F8FF;
/* ... 12 stops per colour × 10 colour families + alpha variants */
--blue-800: #0090FFFF;
--red-950: #CE2C31FF;
```

Colour families: `neutral`, `red`, `amber`, `green`, `blue`, `orange`, `jade`, `sky`, `violet`, `pink` — each with 12 stops (50–1000) and alpha variants.

Source of truth: `scripts/palette.ts` → `scripts/generate-css.ts`.

#### 2. Semantic Tokens

Context-aware tokens that reference the primitive palette. These _do_ change between light and dark mode (the `.dark` class swaps them).

```css
:root {
  --bg-default: #F9F9F8FF;
  --text-default: #21201CFF;
  --bg-fill-primary: #21201CFF;
  --text-inverse: #FFFFFFFF;
  --bg-fill-critical: #E5484DFF;
  --border-default: #CFCECAFF;
  --border-focus: #0D74CEFF;
  --text-success: #203C25FF;
  --bg-surface-critical: #FFF7F7FF;
}

.dark {
  --bg-default: #191918FF;
  --text-default: #EEEEECFF;
  /* ... all semantic tokens remapped for dark */
}
```

#### 3. Component Tokens

Per-component tunables exposed in `:root` for preset override support:

```css
:root {
  --radius: 0.5rem;
  --border-width-base: 0.0625rem;
  --font-size-base: 1rem;
  --leading-base: 1.33;
  --font-sans: "Inter Variable", sans-serif;
  --focus-ring-style: solid;
  --bento-gap: var(--border-width-base);
}
```

### Using Tokens

**Full system (with Tailwind):**
```css
@import "@leitware/composables-cli/styles.css";
```

**Just the semantic tokens (no Tailwind, standalone):**
```css
@import "@leitware/composables-cli/tokens.css";
```

**A specific preset (standalone, pasteable):**
```css
@import "@leitware/composables-cli/presets/brutalist.css";
```

### Customising Tokens

Override any token in your own CSS:

```css
/* globals.css or your app's root stylesheet */
:root {
  --font-size-base: 15px;
  --radius: 0.75rem;
  --bg-fill-primary: var(--blue-800);
  --font-heading: "Fraunces Variable", serif;
}
```

### Tailwind v4 Integration

The tokens are registered into Tailwind's theme via `@theme` blocks in `tokens/tailwind-theme.css`, making them available as Tailwind utilities:

```css
@theme {
  --text-sm: calc(var(--font-size-base) * 0.875);
  --font-sans: "Inter Variable", sans-serif;
  --radius-lg: var(--radius);
}
```

This means you can use `text-sm`, `bg-primary`, `rounded-lg` etc. in Tailwind classes, and they'll respond to token overrides at runtime.

---

## Presets

Presets are named sets of token overrides. They're available as standalone CSS files in `styles/presets/` and also embedded in the `TokenConfigPanel` component for runtime switching.

### What a Preset Overrides

A preset typically overrides:

- `--font-sans` / `--font-heading` — typography
- `--font-size-base` / `--leading-base` — scale
- `--radius` — corner rounding
- `--border-width-base` — stroke weight
- `--bg-fill-primary` / `--bg-fill-brand` — brand colours
- `--focus-ring-style` — solid, dashed, etc.
- All semantic colour tokens (background, text, border, icon, chart)

### Built-in Presets

| Preset | Key overrides |
|--------|---------------|
| **Default** | Inter, 1rem, 0.5rem radius, neutral primary |
| **Brutalist** | Space Grotesk + JetBrains Mono, 0 radius, high contrast, hard shadows |
| **Editorial** | Fraunces (headings) + Source Serif 4, generous leading, subtle radius |
| **Midnight** | Space Grotesk + Inter, dark-first, indigo accent, glow shadows |
| **Soft** | Plus Jakarta Sans + DM Sans, 0.75rem radius, lavender tones |
| **Swiss** | Helvetica Neue system stack, 0 radius, 0 shadow, tight leading |

### Creating a Custom Preset

A preset is just CSS. Override tokens in `:root` and `.dark`:

```css
:root {
  --font-heading: "DM Sans", sans-serif;
  --font-sans: "DM Sans", sans-serif;
  --font-size-base: 14px;
  --radius: 0.25rem;
  --bg-fill-primary: #1e40af;
  --text-inverse: white;
}
```

---

## Monorepo Structure

```
composables/
├── packages/
│   ├── ui/                     ← Component library (@leitware/composables-cli)
│   │   ├── src/
│   │   │   ├── _internal/      ← Low-level primitives
│   │   │   ├── opinionated/    ← Opinionated wrappers (public API)
│   │   │   ├── styles/         ← Design tokens, presets, CSS
│   │   │   ├── tailwind/       ← Tailwind v4 preset
│   │   │   ├── lib/            ← Utilities (cn, numeric-input)
│   │   │   ├── hooks/          ← React hooks
│   │   │   └── rules/          ← Biome lint rules
│   │   └── tsup.config.ts
│   └── showcase/               ← Demo site (deployed to GitHub Pages)
├── scripts/                    ← Token generation & palette management
├── biome.json                  ← Root Biome config
└── tsconfig.json               ← Root TypeScript config
```
