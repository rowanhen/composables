# Architecture

A technical deep-dive into how Composables is structured.

---

## Two-Tier Component Model

The library uses a deliberate separation between two layers of components.

### Layer 1: `components/_internal/`

These are **low-level primitives** — close-to-the-metal wrappers around [Base UI](https://base-ui.com/) components, with Tailwind styling applied. They're composable and flexible, but their APIs can change.

Examples: `button`, `input`, `select`, `combobox`, `field`, `card`, `dialog`.

**You should not import these directly in app code.** A Biome lint rule enforces this.

### Layer 2: `components/ui-opinionated/`

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

```json
{
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "patterns": [
              {
                "group": ["@/components/ui/*"],
                "message": "Do not import directly from 'components/ui/'. Import from 'components/ui-opinionated/' instead."
              }
            ]
          }
        }
      }
    }
  }
}
```

---

## Token / Theming System

### CSS Custom Properties

The entire design system is expressed as CSS custom properties defined in `styles/composable.css`. There are three tiers of tokens:

#### 1. Primitive Palette

Raw colour values from a fixed scale. These don't change between light/dark mode — they're reference values.

```css
--neutral-50: #FDFDFDFF;
--neutral-100: #F9F9F8FF;
/* ... 12 stops per colour × 6 colour families + alpha variants */
--blue-800: #0090FFFF;
--red-950: #CE2C31FF;
```

Colour families: `neutral`, `red`, `amber`, `green`, `blue` — each with 12 stops (50–1000) and alpha variants.

#### 2. Semantic Tokens

Context-aware tokens that reference the primitive palette. These _do_ change between light and dark mode (the `.dark` class swaps them).

```css
:root {
  /* Surface colours */
  --background: #F9F9F8FF;
  --foreground: #21201CFF;
  --primary: #21201CFF;
  --primary-foreground: #FFFFFFFF;
  --muted: #F1F0EFFF;
  --muted-foreground: #8D8D86FF;
  --destructive: #E5484DFF;
  --border: #CFCECAFF;
  --ring: #0D74CEFF;

  /* Semantic text colours */
  --text-success: #203C25FF;
  --text-warning: #582D1DFF;
  --text-critical: #641723FF;

  /* Semantic surface colours */
  --bg-surface-success: #EFFEF0FF;
  --bg-surface-critical: #FFF7F7FF;

  /* Semantic border colours */
  --border-success: #94CE9AFF;
  --border-critical: #F4A9AAFF;
}

.dark {
  --background: #111110FF;
  --foreground: #F9F9F8FF;
  /* ... all semantic tokens remapped for dark */
}
```

#### 3. Component Tokens

Per-component tunables exposed in `:root` for preset override support:

```css
:root {
  --radius-base: 0.375rem;
  --border-width-base: 1px;
  --font-size-base: 14px;
  --leading-base: 1.5rem;
  --font-heading: "Inter Variable", sans-serif;
  --font-body: "Inter Variable", sans-serif;
  --focus-ring-style: solid;
  --bento-gap: var(--border-width-base);
}
```

### Tailwind v4 Integration

The tokens are registered into Tailwind's theme via `@theme` blocks, making them available as Tailwind utilities:

```css
@theme {
  --text-sm: calc(var(--font-size-base) * 0.875);
  --color-primary: var(--primary);
  --color-muted: var(--muted);
  --radius-base: var(--radius-base);
}
```

This means you can use `text-primary`, `bg-muted`, `rounded-base` etc. in Tailwind classes, and they'll respond to token overrides.

### Customising Tokens

Override any token in your own CSS:

```css
/* globals.css or your app's root stylesheet */
:root {
  --font-size-base: 15px;        /* scale the entire type system */
  --radius-base: 0.75rem;        /* rounder corners everywhere */
  --primary: var(--blue-800);   /* swap the primary colour */
  --font-heading: "Fraunces Variable", serif;
}
```

---

## Presets

Presets are named sets of token overrides. They're embedded in the `token-config-panel` component and applied by overriding CSS custom properties on `:root`.

### What a Preset Overrides

A preset typically overrides:

- `--font-heading` / `--font-body` — typography
- `--font-size-base` / `--leading-base` — scale
- `--radius-base` / `--radius-sm` / `--radius-lg` — corner rounding
- `--border-width-base` — stroke weight
- `--primary` / `--secondary` / `--accent` — brand colours
- `--focus-ring-style` — solid, dashed, etc.

Presets do _not_ typically override the full primitive palette — they work within the existing colour system by reassigning semantic tokens.

### Built-in Presets

| Preset | Key overrides |
|--------|---------------|
| **Default** | Inter, 14px, 0.375rem radius, neutral primary |
| **Brutalist** | Space Grotesk, larger text, 0 radius, high contrast |
| **Editorial** | Fraunces (headings) + Source Serif 4, generous leading, subtle radius |
| **Midnight** | Space Grotesk, dark-optimised surfaces, reduced border weight |
| **Soft** | Plus Jakarta Sans, 0.75rem radius, warm neutrals |
| **Swiss** | System fonts (Helvetica Neue), tight leading, sharp edges |

### Creating a Custom Preset

A preset is just CSS. Create a class or `data-theme` attribute and override tokens:

```css
[data-theme="corporate"] {
  --font-heading: "DM Sans", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --font-size-base: 14px;
  --radius-base: 0.25rem;
  --primary: #1e40af;
  --primary-foreground: white;
}
```

Apply it to `<html>` or your root element:

```tsx
<html data-theme="corporate">
```

To make it work with the `TokenConfigPanel`'s preset switcher, add it to the `PRESETS` array in `token-config-panel.tsx` (which you own — it's in your project).

---

## CLI Dependency Resolution

When you run `composables add <component>`, the CLI resolves a complete dependency tree before copying any files.

### `internalDeps`

Each registry entry has an `internalDeps` array listing the internal components it depends on:

```typescript
{
  name: "form-input",
  files: [...],
  deps: ["class-variance-authority"],          // npm packages
  internalDeps: ["field", "input", "use-numeric-input"],  // other registry entries
  tags: ["opinionated", "form"],
}
```

### Resolution Algorithm

The CLI uses a depth-first recursive collector:

```typescript
function collectDeps(names: string[], visited = new Set<string>()): string[] {
  const result: string[] = [];
  for (const name of names) {
    if (visited.has(name)) continue;
    visited.add(name);
    const entry = registry[name];
    // Resolve internal deps first (depth-first)
    if (entry.internalDeps.length > 0) {
      result.push(...collectDeps(entry.internalDeps, visited));
    }
    result.push(name);
  }
  return result;
}
```

This means:
1. Dependencies are always installed before the component that needs them
2. Shared dependencies across multiple components are deduplicated
3. Circular dependencies are handled by the `visited` set

**Example:** `composables add sidebar` resolves to:
```
utils → use-mobile → button → input → separator → sheet → skeleton → tooltip → sidebar
```

### `deps` (npm packages)

The `deps` array lists npm packages needed at runtime. The CLI prints these at the end of installation so you can `npm install` / `bun add` them:

```
npm install @base-ui/react class-variance-authority lucide-react react-resizable-panels
```

---

## Directory Structure After `composables init`

Running `composables init` scaffolds this structure into your project:

```
your-project/src/
├── styles/
│   └── composable.css          ← Design tokens, Tailwind v4 theme, dark mode
└── lib/
    └── utils.ts                ← cn() and focusRing() helpers
```

After adding components:

```
your-project/src/
├── styles/
│   └── composable.css
├── lib/
│   ├── utils.ts
│   └── numeric-input.ts        ← (if form-input or use-numeric-input installed)
├── hooks/
│   ├── use-mobile.ts           ← (if sidebar or use-mobile installed)
│   └── use-numeric-input.ts    ← (if form-input installed)
├── rules/
│   ├── biome-ui-restricted.json    ← (if biome-ui-restricted installed)
│   ├── biome-no-direct-icons.json  ← (if biome-no-direct-icons installed)
│   └── biome-a11y.json             ← (if biome-a11y installed)
└── components/
    ├── _internal/              ← Low-level primitives (don't import from here)
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── select.tsx
    │   ├── dialog.tsx
    │   └── ...
    └── ui-opinionated/         ← Your API surface (import from here)
        ├── button.tsx
        ├── form-input.tsx
        ├── form-select.tsx
        ├── dialog.tsx
        └── ...
```

### Import Alias

Components use `@/` as the import alias root. If your project uses a different alias (e.g. `~/`), pass `--alias ~/` when adding components:

```bash
composables add button --alias ~/
```

The CLI rewrites all `@/` occurrences in the copied files to your chosen prefix.

---

## Monorepo Structure

```
composables/
├── packages/
│   ├── cli/                    ← CLI tool (@leitware/composables-cli)
│   │   ├── src/
│   │   │   ├── cli.ts          ← Commander entry point
│   │   │   ├── registry.ts     ← Component registry (names, files, deps)
│   │   │   └── commands/
│   │   │       ├── add.ts      ← `composables add` implementation
│   │   │       └── list.ts     ← `composables list` implementation
│   │   └── templates/          ← Source files copied into user projects
│   │       ├── styles/
│   │       ├── lib/
│   │       ├── hooks/
│   │       ├── rules/
│   │       ├── ui/             ← Internal primitive templates
│   │       └── ui-opinionated/ ← Opinionated component templates
│   └── showcase/               ← Demo site (deployed to GitHub Pages)
├── biome.json                  ← Root Biome config
└── tsconfig.json               ← Root TypeScript config
```
