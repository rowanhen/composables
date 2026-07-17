# Architecture

A technical deep-dive into how Composables is structured.

---

## Consumer Contract

The package is designed so consuming applications do not need to understand its build pipeline. The normal setup is one root CSS import and imports from the public React entrypoint:

```css
@import '@leitware/composables/styles.css';
```

```tsx
import { Button, Card, FormInput } from '@leitware/composables'
```

`styles.css` contains the default theme, component styles, and documented semantic utilities. It is precompiled, so consumers do not need a `ThemeProvider`, Tailwind installation, or Tailwind configuration.

An application can select exactly one alternative preset by importing it after the base stylesheet, then make product-specific overrides after both imports:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css';

:root {
	--bg-fill-brand: #6d28d9;
	--radius: 0.75rem;
}

.dark {
	--bg-fill-brand: #a78bfa;
}
```

The cascade is the theming mechanism:

```text
styles.css (default theme) → optional preset → application overrides
```

Adding `class="dark"` to `<html>` or a subtree activates dark values. No runtime provider is required.

### Public CSS Boundary

The supported styling API consists of:

- Public semantic CSS variables such as `--bg-surface-success`, `--text-success`, and `--border-success`.
- Public component and system variables such as `--radius`, `--button-radius`, `--badge-radius`, `--font-size-base`, and the semantic motion roles.
- Documented semantic classes such as `bg-surface-success`, `text-success`, and `border-stroke-success`.
- Precompiled styles required by public components.

The semantic classes are emitted as ordinary CSS and are guaranteed independently of downstream Tailwind source scanning. Consumers can use them from plain markup or JSX without constructing arbitrary-value classes such as `bg-[var(--bg-surface-success)]`.

The compiled stylesheet also contains layout and state utilities used by the library's own source. Those incidental classes are implementation details, not a general-purpose Tailwind distribution or downstream API. Applications should use their own Tailwind setup, CSS Modules, plain CSS, or another styling system for layout and composition.

## Two-Tier Component Model

The library uses a deliberate separation between two layers of components.

### Layer 1: `_internal/`

These are **low-level primitives** — close-to-the-metal wrappers around [Base UI](https://base-ui.com/) components, with Tailwind styling applied. They're composable and flexible, but their APIs can change.

Examples: `button`, `input`, `select`, `combobox`, `field`, `card`, `dialog`.

**You should not import these directly in app code.** The repository's lint boundary enforces this.

### Layer 2: `opinionated/`

These are **opinionated wrappers** around the internal primitives. They:

- Consolidate complex assembly patterns into a single, clean component
- Add props like `label`, `description`, `error`, `options`, `loading`, `trigger`, `footer`
- Wire in hooks (e.g. `useNumericInput`) and handle accessibility boilerplate
- Provide sensible defaults so you can drop them in with minimal configuration

Examples: `FormInput` (wraps `field` + `input` + `useNumericInput`), `FormSelect` (wraps `field` + `select`), `Dialog` (wraps `dialog` with trigger/title/footer API).

**This is the app-facing API surface.** Opinionated components are re-exported from `@leitware/composables`.

### Why separate them?

The internal layer can evolve — Base UI updates, API changes, internal refactors — without breaking your app. The opinionated layer mediates those changes. You get:

- **Stability**: your `<FormInput>` won't break if the underlying `input` primitive changes
- **Convenience**: form fields come pre-wired with labels, errors, and accessibility attributes
- **Control**: custom composition stays possible through public component props and application-owned styling without coupling the application to private primitives

### The Lint Boundary

The opinionated layer imports from `_internal/` — app code should not. This boundary keeps internal refactors from breaking your app.

### Package Boundary

All non-AI opinionated components use one public entrypoint: `@leitware/composables`. Integrations for calendars, carousels, drop zones, resizable panels, toasts, and the token editor are normal package dependencies. This deliberately trades a slightly larger install for one obvious import contract and substantially less release, documentation, and consumer complexity.

`scripts/generate-rules.ts` reads `package.json` and the public barrels to generate the consumer skill's exact entrypoint/value/type manifest, preventing documentation from drifting away from the root API.

AI components have a dedicated `@leitware/composables/ai` entrypoint and their integrations are declared as optional peers. This keeps the core import surface separate from AI-specific APIs. It does not create a separate npm package or independent release lifecycle.

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
│   ├── tailwind-color-adapter.css ← Generated Tailwind colour aliases
│   ├── tailwind-public-utilities.css ← Generated optional public Tailwind variants
│   ├── tailwind-theme.css      ← Non-colour Tailwind registrations (@theme)
│   ├── semantic-utilities.css  ← Generated public semantic classes
│   └── base.css                ← Global base styles
├── presets/                    ← Generated standalone preset CSS files
│   ├── default.css
│   ├── brutalist.css
│   └── signal-pop.css
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

`src/styles/tokens/registry.ts` is the source of truth for semantic colour names, metadata, Tailwind colour aliases, and the public semantic utility mapping. Preset data supplies the actual light and dark values. `styles.css` imports the generated default preset after the baseline semantic layer, making that preset the canonical default seen by consumers.

shadcn compatibility variables are generated references to canonical roles rather than preset-owned values. For example, `--popover` resolves to `var(--bg-surface-popover)` and `--primary-foreground` resolves to `var(--text-on-fill-primary)`. Sidebar variables are the deliberate exception: they are independent component roles owned directly by each preset so a sidebar can use a distinct visual scheme.

#### 3. Component Tokens

Per-component tunables exposed in `:root` for preset override support:

```css
:root {
	--radius: 0rem;
	--border-width-base: 0.125rem;
	--font-size-base: 1.15rem;
	--leading-base: 1.3;
	--font-sans: 'IBM Plex Mono', sans-serif;
	--focus-ring-style: solid;
	--bento-gap: var(--border-width-base);
}
```

### Using Tokens

The package ships precompiled CSS (`dist/styles.css`) containing the default token values, public semantic utilities, and styles required by its components. Downstream consumers do not need Tailwind installed.

```css
@import '@leitware/composables/styles.css';
```

To select an alternative preset, import exactly one after `styles.css`:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

Import order is part of the contract: package styles first, optional preset second, application overrides last.

### Build Pipeline

The source CSS (`src/styles/composable.css`) is compiled at build time via `bun run build:css`, which wraps it with `@import 'tailwindcss'` and `@source` directives, then runs `@tailwindcss/cli` to produce `dist/styles.css`. This bakes in all tokens, base styles, and utility classes used by the components.

`bun run build:css` also regenerates source-owned generated CSS first:

| Generated file                                    | Source of truth                     |
| ------------------------------------------------- | ----------------------------------- |
| `src/styles/tokens/palette.css`                   | `scripts/palette.ts`                |
| `src/styles/tokens/tailwind-color-adapter.css`    | `src/styles/tokens/registry.ts`     |
| `src/styles/tokens/tailwind-public-utilities.css` | `src/styles/tokens/registry.ts`     |
| `src/styles/tokens/semantic-utilities.css`        | `src/styles/tokens/registry.ts`     |
| `src/styles/presets/*.css`                        | `src/styles/presets-data/index.ts`  |
| `dist/styles.css`                                 | `src/styles/composable.css` + `src` |
| `dist/tailwind.css`                               | `tailwind-public-utilities.css`     |
| `dist/presets/*.css`                              | `src/styles/presets/*.css`          |

`src/styles/tokens/semantic.css` and the non-colour registrations in `src/styles/tokens/tailwind-theme.css` remain source-owned CSS. The registry is the contract for semantic colour names, compatible Tailwind colour aliases, and public semantic class mappings. `bun run test:tokens` validates these layers together.

Token system drift is checked in CI:

- `bun scripts/generate-css.ts --check` verifies the generated palette, Tailwind colour adapter, and public semantic utilities match their TypeScript sources.
- `bun scripts/generate-preset-css.ts --check` verifies `styles/presets/*.css` matches `styles/presets-data/*.ts`.
- `bun run test:tokens` verifies semantic token registry coverage, Tailwind aliases, preset keys, and semantic Tailwind class usage.
- `bun run test:css` verifies the compiled downstream CSS contains required tokens and utilities.

### Customising Tokens

Override known public tokens in your own CSS after all package imports. Use semantic roles rather than palette primitives so the override communicates intent and stays compatible with different presets.

```css
/* globals.css or your app's root stylesheet */
:root {
	--font-size-base: 15px;
	--radius: 0.75rem;
	--bg-fill-primary: #1e40af;
	--font-heading: 'Fraunces Variable', serif;
}

.dark {
	--bg-fill-primary: #93c5fd;
}
```

### Tailwind v4 Integration

Tailwind is a maintainer implementation tool, not a downstream requirement. Theme aliases in `tokens/tailwind-theme.css` let library source use concise semantic candidates:

```css
@theme {
	--text-sm: calc(var(--font-size-base) * 0.875);
	--font-sans: 'IBM Plex Mono', sans-serif;
	--radius-lg: var(--radius);
}
```

Those aliases keep local source readable (`bg-surface-success` instead of `bg-[var(--bg-surface-success)]`) and allow Tailwind to generate responsive, state, and variant combinations used by components.

The public semantic classes are generated separately as ordinary CSS. Their availability therefore does not depend on a class appearing in library source or in a consuming application's Tailwind scan. Both outputs resolve to the same semantic variables:

```text
semantic token contract
├── public semantic CSS classes
└── Tailwind theme aliases used by library source
```

Consumers with Tailwind can continue using their own configuration for layout. Importing `styles.css` supplies the documented semantic classes without turning every incidental Tailwind class in the package build into a supported API.

Tailwind v4 applications that need state or responsive variants of the exact public semantic classes can opt into the generated public utility adapter:

```css
@import 'tailwindcss';
@import '@leitware/composables/tailwind.css';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css'; /* Optional */
```

The exported `tailwind.css` contains one exact `@utility` definition per public semantic class. Variant-prefixed forms are supported only when the adapter is imported, and the utility suffix must remain an exact public class; variants do not authorize new token/property combinations. The adapter deliberately does not expose the internal shadcn colour aliases, bundle Tailwind, duplicate the component stylesheet, or expose the package's non-colour internal theme registrations.

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
- `--motion-duration-overlay` / `--motion-duration-disclosure` — semantic motion roles
- `--focus-ring-style` — solid, dashed, etc.
- All semantic colour tokens (background, text, border, icon, chart)

### Built-in Presets

| Preset         | Key overrides                                                                    |
| -------------- | -------------------------------------------------------------------------------- |
| **Default**    | Inter + Bricolage Grotesque, 1rem base, soft radius, neutral primary             |
| **Brutalist**  | Space Grotesk + JetBrains Mono, 0 radius, high contrast, hard shadows            |
| **Signal Pop** | IBM Plex Sans + Space Grotesk + JetBrains Mono, bright modules and hard outlines |

### Creating a Custom Preset

For app-only use, a preset is just CSS. Override tokens in `:root` and `.dark` after importing `styles.css` (and any shipped preset):

```css
:root {
	--font-heading: 'DM Sans', sans-serif;
	--font-sans: 'DM Sans', sans-serif;
	--font-size-base: 14px;
	--radius: 0.25rem;
	--bg-fill-primary: #1e40af;
	--motion-duration-overlay: 0ms;
	--text-inverse: white;
}

.dark {
	--bg-fill-primary: #93c5fd;
	--text-inverse: #172554;
}
```

For a shipped package preset, add it to the registry:

1. Create `src/styles/presets-data/<name>.ts` with `<name>` and `<name>Dark` token records.
2. Add one `presetDefinitions` entry in `src/styles/presets-data/index.ts`.
3. Run `bun run generate:presets`.
4. Run `bun run test:tokens`.

The registry entry automatically drives `src/styles/presets/<name>.css`, `dist/presets/<name>.css` during build, and the `TokenConfigPanel` dropdown. Downstream consumers use a different shipped preset by swapping the second import:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/<name>.css';
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
│   ├── generate-css.ts         ← Generates palette, Tailwind colour adapter, and semantic utilities
│   └── generate-preset-css.ts  ← Regenerates presets/*.css from presets-data/
├── .oxlintrc.json              ← Oxlint config
└── tsconfig.json               ← Root TypeScript config
```
