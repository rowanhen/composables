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
	--radius-base: 0.75rem;
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
- Public component and system variables such as `--radius-base`, `--button-radius`, `--badge-radius`, `--font-size-base`, and the semantic motion roles.
- Documented semantic classes such as `bg-surface-success`, `text-success`, and `border-stroke-success`.
- Precompiled styles required by public components.

The semantic classes are emitted as ordinary CSS and are guaranteed independently of downstream Tailwind source scanning. Consumers can use them from plain markup or JSX without constructing arbitrary-value classes such as `bg-[var(--bg-surface-success)]`.

The compiled stylesheet also contains layout and state utilities used by the library's own source. Those incidental classes are implementation details, not a general-purpose Tailwind distribution or downstream API. Applications should use their own Tailwind setup, CSS Modules, plain CSS, or another styling system for layout and composition.

## Two-Tier Component Model

The library uses a deliberate separation between two layers of components.

### Layer 1: `_internal/`

These **low-level primitives** wrap [Base UI](https://base-ui.com/) components with Tailwind styling. They're composable and flexible, but their APIs can change.

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

The internal layer can evolve through Base UI updates, API changes, and internal refactors without breaking your app. The opinionated layer mediates those changes. You get:

- **Stability**: your `<FormInput>` won't break if the underlying `input` primitive changes
- **Convenience**: form fields come pre-wired with labels, errors, and accessibility attributes
- **Control**: custom composition stays possible through public component props and application-owned styling without coupling the application to private primitives

### The Lint Boundary

The opinionated layer imports from `_internal/`. App code should not. This boundary keeps internal refactors from breaking your app.

### Package Boundary

All non-AI opinionated components use one public entrypoint: `@leitware/composables`. Integrations for calendars, carousels, drop zones, resizable panels, toasts, and the token editor are normal package dependencies. This deliberately trades a slightly larger install for one obvious import contract and substantially less release, documentation, and consumer complexity.

`scripts/generate-rules.ts` reads `package.json` and the public barrels to generate the consumer skill's exact entrypoint/value/type manifest, preventing documentation from drifting away from the root API.

AI components have a dedicated `@leitware/composables/ai` entrypoint and their integrations are declared as optional peers. This keeps the core import surface separate from AI-specific APIs. It does not create a separate npm package or independent release lifecycle.

---

## Token / Theming System

The complete strategy, naming rules, typed API, preset behaviour and Tailwind integration are documented in [docs/tokens.md](docs/tokens.md). The exhaustive generated inventory is [docs/token-reference.md](docs/token-reference.md).

Typed palette, foundation, system and component definitions feed `bun run generate:tokens`. Semantic colour names live in `registry.ts`; complete light/dark values live in `presets-data/`. The default preset also supplies baseline semantic CSS. `createPresetCSS` is shared by generation and the live editor, and emits complete values at theme boundaries to prevent cross-preset leakage.

Internal components consume shared semantic roles and native Tailwind aliases; component paint recipes centralize optional finishes. Runtime measurements remain local. Generic shadcn aliases live in optional compat.css, outside core CSS. Authoring lint, preset dependency validation, TypeScript, generated-output checks, downstream CSS compilation and browser tests enforce this boundary.

## Presets

Eight presets are registered once in `src/styles/presets-data/index.ts`: Default, Gutenberg, Brutalist, Signal Pop, Editorial Grid, Kumo, Oqita and Sponder. Each owns complete light/dark semantic colours and optional geometry/finish overrides. Every generated preset resolves the full foundation/system/component defaults, so switching themes cannot retain the previous theme's omitted settings.

Use `definePreset(base, { light, dark })` for typed customization. Use `createPresetCSS(preset, selector)` for scoped themes. See the [authoring guide](docs/tokens.md) for examples and portal boundaries.

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
├── .storybook/                 ← Storybook configuration and shared preview
├── showcase/                   ← Storybook stories, demo components, and static build
├── scripts/                    ← Token generation & palette management
│   ├── palette.ts              ← Source of truth for color scales
│   ├── generate-css.ts         ← Generates palette, Tailwind colour adapter, and semantic utilities
│   └── generate-preset-css.ts  ← Regenerates presets/*.css from presets-data/
├── .oxlintrc.json              ← Oxlint config
└── tsconfig.json               ← Root TypeScript config
```
