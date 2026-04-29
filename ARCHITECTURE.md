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

The opinionated layer imports from `_internal/` — app code should not. This boundary keeps internal refactors from breaking your app.

---

## Token / Theming System

### File Structure

The design system's tokens live in `src/styles/`:

```
styles/
├── composable.css              ← Main entry point (composes all layers)
├── tokens/
│   ├── palette.css             ← Primitive color scales (build-time + runtime)
│   ├── semantic.css            ← Semantic role tokens (:root + .dark)
│   ├── components.css          ← Component-level tunables
│   ├── tailwind-theme.css      ← Tailwind utility registrations (@theme)
│   └── base.css                ← Global base styles
├── presets/                    ← Generated standalone preset CSS files
│   ├── default.css
│   ├── brutalist.css
│   ├── editorial.css
│   ├── midnight.css
│   ├── soft.css
│   ├── swiss.css
│   ├── retro.css
│   ├── vapor.css
│   └── nature.css
└── presets-data/               ← Source of truth for preset token values (TS)
```

### Three Tiers of Tokens

#### 1. Primitive Palette

Raw colour values from a fixed scale. `palette.css` contains three blocks from the same data: `@theme inline` (build-time, for Tailwind utilities), `:root` (runtime light), and `.dark` (runtime dark). The build-time block lets Tailwind generate utility classes; the runtime blocks let component code use `var(--blue-800)` etc. and have them swap in dark mode.

```css
--neutral-50: #fdfdfdff;
--neutral-100: #f9f9f8ff;
/* ... 12 stops per colour × 10 colour families + alpha variants */
--blue-800: #0090ffff;
--red-950: #ce2c31ff;
```

Colour families: `neutral`, `red`, `amber`, `green`, `blue`, `orange`, `jade`, `sky`, `violet`, `pink` — each with 12 stops (50–1000) and alpha variants.

Source of truth: `scripts/palette.ts` (light + dark) → `scripts/generate-css.ts` → `tokens/palette.css`.

#### 2. Semantic Tokens

Context-aware tokens that reference the primitive palette. These _do_ change between light and dark mode (the `.dark` class swaps them).

```css
:root {
	--bg-default: #f9f9f8ff;
	--text-default: #21201cff;
	--bg-fill-primary: #21201cff;
	--text-inverse: #ffffffff;
	--bg-fill-critical: #e5484dff;
	--border-default: #cfcecaff;
	--border-focus: #0d74ceff;
	--text-success: #203c25ff;
	--bg-surface-critical: #fff7f7ff;
}

.dark {
	--bg-default: #191918ff;
	--text-default: #eeeeecff;
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
	--font-sans: 'Inter Variable', sans-serif;
	--focus-ring-style: solid;
	--bento-gap: var(--border-width-base);
}
```

### Using Tokens

**Full system (with Tailwind):**

```css
@import 'src/styles/composable.css';
```

**A specific preset (standalone, pasteable):**

```css
@import 'src/styles/presets/brutalist.css';
```

### Customising Tokens

Override any token in your own CSS:

```css
/* globals.css or your app's root stylesheet */
:root {
	--font-size-base: 15px;
	--radius: 0.75rem;
	--bg-fill-primary: var(--blue-800);
	--font-heading: 'Fraunces Variable', serif;
}
```

### Tailwind v4 Integration

The tokens are registered into Tailwind's theme via `@theme` blocks in `tokens/tailwind-theme.css`, making them available as Tailwind utilities:

```css
@theme {
	--text-sm: calc(var(--font-size-base) * 0.875);
	--font-sans: 'Inter Variable', sans-serif;
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

| Preset        | Key overrides                                                         |
| ------------- | --------------------------------------------------------------------- |
| **Default**   | Inter, 1rem, 0.5rem radius, neutral primary                           |
| **Brutalist** | Space Grotesk + JetBrains Mono, 0 radius, high contrast, hard shadows |
| **Editorial** | Fraunces (headings) + Source Serif 4, generous leading, subtle radius |
| **Midnight**  | Space Grotesk + Inter, dark-first, indigo accent, glow shadows        |
| **Soft**      | Plus Jakarta Sans + DM Sans, 0.75rem radius, lavender tones           |
| **Swiss**     | Helvetica Neue system stack, 0 radius, 0 shadow, tight leading        |
| **Retro**     | Monospace, amber phosphor glow, terminal-inspired CRT nostalgia       |
| **Vapor**     | Space Grotesk, neon pink + cyan, deep purple-black vaporwave          |
| **Nature**    | Serif typography, warm greens, rich browns, organic earthy feel       |

### Creating a Custom Preset

A preset is just CSS. Override tokens in `:root` and `.dark`:

```css
:root {
	--font-heading: 'DM Sans', sans-serif;
	--font-sans: 'DM Sans', sans-serif;
	--font-size-base: 14px;
	--radius: 0.25rem;
	--bg-fill-primary: #1e40af;
	--text-inverse: white;
}
```

---

## Project Structure

```
composables/
├── src/
│   ├── _internal/              ← Low-level primitives
│   ├── opinionated/            ← Opinionated wrappers (public API)
│   ├── styles/                 ← Design tokens, presets, CSS
│   │   ├── tokens/             ← Token CSS layers
│   │   ├── presets/            ← Generated preset CSS files
│   │   └── presets-data/       ← Source of truth for preset values (TS)
│   ├── lib/                    ← Utilities (cn, numeric-input)
│   ├── hooks/                  ← React hooks
│   └── index.ts                ← Barrel exports
├── showcase/                   ← Demo site (deployed to Cloudflare Pages)
├── scripts/                    ← Token generation & palette management
│   ├── palette.ts              ← Source of truth for color scales
│   ├── generate-css.ts         ← Regenerates palette.css from palette.ts
│   └── generate-preset-css.ts  ← Regenerates presets/*.css from presets-data/
├── .oxlintrc.json              ← Oxlint config
└── tsconfig.json               ← Root TypeScript config
```
