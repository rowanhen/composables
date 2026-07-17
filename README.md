# Composables

**An opinionated React component library with a semantic design token system — built on Base UI and Tailwind CSS v4.**

[![npm version](https://img.shields.io/npm/v/@leitware/composables)](https://www.npmjs.com/package/@leitware/composables)
[![CI](https://github.com/rowanhen/composables/actions/workflows/ci.yml/badge.svg)](https://github.com/rowanhen/composables/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is this?

Composables is a React component library with ~70 components across forms, layout, data display, feedback, and navigation. Components are built on [Base UI](https://base-ui.com/) and styled through semantic CSS custom properties, so an application can change its visual language without rewriting component styles.

The downstream contract is deliberately small:

1. Import one stylesheet.
2. Optionally import one alternative preset.
3. Override known semantic tokens when your product needs a local decision.
4. Use public components and documented semantic utility classes.

There is no required `ThemeProvider`, Tailwind installation, or Tailwind configuration.

---

## Quick Start

```bash
npm install @leitware/composables
```

Import the package stylesheet once in your application's root stylesheet (`app.css`, `globals.css`, or equivalent):

```css
@import '@leitware/composables/styles.css';
```

`styles.css` includes the default theme, component styles, and the documented semantic utilities. That is all a default setup needs.

To use a different shipped preset, import exactly one after `styles.css`:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

The order matters: base styles first, optional preset second, application overrides last.

Then import components:

```tsx
import { Button } from '@leitware/composables'
import { FormInput } from '@leitware/composables'
import { Card } from '@leitware/composables'
```

### Override the theme

Override known semantic variables after the imports. Define both modes when a colour decision should change with the theme:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css';

:root {
	--bg-fill-brand: #6d28d9;
	--border-brand: #8b5cf6;
	--radius: 0.75rem;
}

.dark {
	--bg-fill-brand: #a78bfa;
	--border-brand: #8b5cf6;
}
```

Add `class="dark"` to `<html>` (or a subtree) to activate the dark values. A provider is not required.

### Use semantic styling

Documented semantic utility classes are a guaranteed public API and resolve through the same variables as the components:

```tsx
<Card className="bg-surface-success text-success border-stroke-success">Saved successfully</Card>
```

These classes are shipped as ordinary CSS, so they work whether or not the consuming application uses Tailwind. Consumers may use their own Tailwind setup, CSS Modules, plain CSS, or another styling system for layout and composition.

The registry generates only property combinations that match each token's role:

| Semantic token family | Guaranteed class family                       |
| --------------------- | --------------------------------------------- |
| `--bg-*`              | `bg-*`                                        |
| `--text-*`            | `text-*`                                      |
| `--icon-*`            | `text-icon-*`, `fill-icon-*`, `stroke-icon-*` |
| `--border-*`          | `border-stroke-*`                             |
| `--chart-*`           | `fill-chart-*`, `stroke-chart-*`              |

Only the documented semantic utilities are a package API. Layout utilities that happen to appear in the compiled stylesheet because library components use them internally are incidental and may change; do not rely on them as a downstream Tailwind bundle.

### Optional Tailwind v4 adapter

`styles.css` is sufficient for components and the guaranteed semantic class families above. If the consuming application already builds with Tailwind v4 and wants state or responsive variants of those exact public classes, include the optional adapter in its Tailwind CSS entrypoint:

```css
@import 'tailwindcss';
@import '@leitware/composables/tailwind.css';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css'; /* Optional */
```

`tailwind.css` contains exact generated `@utility` definitions for the public semantic class contract. With that adapter imported, variant-prefixed forms such as `hover:bg-surface-hover`, `md:text-success`, and `group-hover:border-stroke-success` are supported when the suffix is an exact documented class. Without it, only the shipped unprefixed semantic classes are guaranteed. The adapter does not expose internal shadcn compatibility aliases, include Tailwind itself, replace `styles.css`, or turn incidental layout classes from the package build into public API.

### One component entrypoint

All non-AI components and their integrations are available from the package root. The package owns those runtime dependencies, so consumers do not need to choose feature packages or remember component-specific import paths:

```tsx
import {
	Button,
	Calendar,
	Carousel,
	FormDropZone,
	ThemeInjector,
	Toaster,
} from '@leitware/composables'
```

AI components are exposed from their own entrypoint:

```tsx
import { AIMessage, AIPromptInput } from '@leitware/composables/ai'
```

The AI libraries remain optional peer dependencies because they are a materially larger, specialised integration surface. Applications that do not import `@leitware/composables/ai` do not need to install or configure them. If you use that entrypoint, install its optional peers; see the table below.

### Consumer agent skill

The npm package includes a `use-composables` agent skill at `skills/use-composables/SKILL.md`. Install or point your coding agent at that directory to give it the package workflow, semantic-styling rules, exact public entrypoints, and optional-dependency guidance. Its utility manifest is generated from the token registry by `bun scripts/generate-css.ts`; its public API manifest is generated from package metadata and public barrels by `bun scripts/generate-rules.ts`. Both generators support `--check`, keeping agent guidance aligned with the shipped contract.

---

## Optional Dependencies

React remains a peer dependency. Normal component integrations such as calendars, carousels, drop zones, resizable panels, toasts, and the token editor are regular dependencies installed with Composables. Only the AI entrypoint and preset fonts require optional packages:

| Install when using… | Import from                   | Optional packages                                                                                                                                                                                          |
| ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI elements         | `@leitware/composables/ai`    | `ai`, `shiki`, `streamdown`, `@streamdown/cjk`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid`, `use-stick-to-bottom`, `nanoid`, `@radix-ui/react-use-controllable-state`, `cmdk`, `motion` |
| Preset typography   | CSS or application entrypoint | The Fontsource packages listed below                                                                                                                                                                       |

These packages are declared as optional peers. Exact missing-peer diagnostics depend on the consuming package manager and bundler.

### Load preset fonts

Fonts are optional peers too. Components and presets still work with their CSS fallback stacks when fonts are not loaded. To reproduce the intended preset typography, install the matching packages and place these imports before `styles.css`.

Default:

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/bricolage-grotesque';
@import '@leitware/composables/styles.css';
```

Brutalist:

```css
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/jetbrains-mono';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

Signal Pop:

```css
@import '@fontsource/ibm-plex-sans/400.css';
@import '@fontsource/ibm-plex-sans/500.css';
@import '@fontsource/ibm-plex-sans/600.css';
@import '@fontsource/ibm-plex-sans/700.css';
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/jetbrains-mono';
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';
@import '@fontsource/ibm-plex-mono/600.css';
@import '@fontsource/ibm-plex-mono/700.css';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css';
```

The variable entrypoints include their preset weight ranges. The explicit IBM Plex files load normal weights 400–700; add italic entrypoints only if your interface uses them. The same package paths can instead be loaded as side-effect imports from an application entry file, for example `import '@fontsource-variable/inter'` or `import '@fontsource/ibm-plex-sans/600.css'`.

---

## Design Tokens

The token system is built on CSS custom properties. Colours, spacing, typography, radius, borders, shadows, and motion are expressed as semantic or component tokens that presets and applications can override.

### Token Files

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

Generated CSS ownership:

| File                                                      | Source of truth                        | Generated by                     |
| --------------------------------------------------------- | -------------------------------------- | -------------------------------- |
| `tokens/palette.css`                                      | `scripts/palette.ts`                   | `bun scripts/generate-css.ts`    |
| `tokens/tailwind-color-adapter.css`                       | `src/styles/tokens/registry.ts`        | `bun scripts/generate-css.ts`    |
| `tokens/tailwind-public-utilities.css`                    | `src/styles/tokens/registry.ts`        | `bun scripts/generate-css.ts`    |
| `tokens/semantic-utilities.css`                           | `src/styles/tokens/registry.ts`        | `bun scripts/generate-css.ts`    |
| `skills/use-composables/references/semantic-utilities.md` | `src/styles/tokens/registry.ts`        | `bun scripts/generate-css.ts`    |
| `skills/use-composables/references/public-api.md`         | `package.json` + public barrels        | `bun scripts/generate-rules.ts`  |
| `presets/*.css`                                           | `src/styles/presets-data/index.ts`     | `bun run generate:presets`       |
| `rules/composables.md`                                    | `README.md` + package barrel exports   | `bun run generate:rules`         |
| `dist/styles.css`                                         | `src/styles/composable.css` + `src`    | `bun run build:css`              |
| `dist/tailwind.css`                                       | `tokens/tailwind-public-utilities.css` | `bun run build:css`              |
| `dist/presets/*.css`                                      | `src/styles/presets/*.css`             | `bun run build:css`              |
| `tokens/semantic.css`                                     | Hand-authored baseline semantic values | Checked by `bun run test:tokens` |
| `tokens/tailwind-theme.css`                               | Hand-authored non-colour theme aliases | Checked by `bun run test:tokens` |

### Customising Tokens

Override public tokens after the package and preset imports. Prefer semantic roles such as `--bg-fill-brand` over palette primitives such as `--violet-800`; this keeps application intent stable when a preset changes.

```css
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

Key token groups:

| Group          | Example tokens                                                                        |
| -------------- | ------------------------------------------------------------------------------------- |
| Colour palette | `--neutral-100`, `--blue-800`, `--red-950` (package/preset implementation)            |
| Background     | `--bg-default`, `--bg-fill-primary`, `--bg-surface-popover`, `--bg-surface-success`   |
| Text           | `--text-default`, `--text-on-fill-primary`, `--text-secondary`, `--text-critical`     |
| Border         | `--border-default`, `--border-input`, `--border-focus`, `--border-brand`              |
| Icon           | `--icon-default`, `--icon-success`, `--icon-critical`                                 |
| Typography     | `--font-size-base`, `--leading-base`, `--font-heading`                                |
| Spacing        | `--spacing` (base unit, used in `calc()`)                                             |
| Shape          | `--radius`, `--radius-sm`, `--radius-lg`                                              |
| Control shape  | `--button-radius`, `--badge-radius`, `--input-radius`, `--card-radius`                |
| Motion         | `--motion-duration-overlay`, `--motion-duration-disclosure`, `--motion-ease-standard` |

The entire type scale derives from `--font-size-base` and `--leading-base` — adjust those two tokens to scale all text globally.

Control rounding is deliberately two-level. `--radius` drives the shared scale (`--radius-sm` … `--radius-4xl`) used by surfaces such as cards, dialogs, and alerts, while the component tokens `--button-radius` and `--badge-radius` decide button and badge corners independently — set `--button-radius: 9999px` for a pill-button theme without distorting anything else. For one-off exceptions, `Button` and `Badge` also accept `shape="pill"` (fully rounded; icon-size buttons become circles).

### Motion Modes

Set a motion mode on `html`, `body`, or any subtree:

```html
<html data-motion="none"></html>
```

Supported modes:

| Mode    | Behaviour                                                       |
| ------- | --------------------------------------------------------------- |
| `none`  | Removes transition and overlay/disclosure animation durations   |
| `color` | Keeps short color transitions, disables movement and overlays   |
| `full`  | Enables the default semantic durations even with reduced motion |

For custom tuning, override the role tokens after importing styles:

```css
:root {
	--motion-duration-color: 120ms;
	--motion-duration-disclosure: 180ms;
	--motion-duration-overlay: 120ms;
}
```

### Live Token Editor

Use the `ThemeInjector` component for a floating palette button that opens a live token editor:

```tsx
import { ThemeInjector } from '@leitware/composables'

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				{children}
				<ThemeInjector />
			</body>
		</html>
	)
}
```

---

## Presets

The default theme is included in `styles.css`. Alternative presets are available as standalone CSS files:

| Preset         | Vibe                                      | Fonts                                          |
| -------------- | ----------------------------------------- | ---------------------------------------------- |
| **Default**    | Clean neutral system, works everywhere    | Inter + Bricolage Grotesque                    |
| **Brutalist**  | Bold, high-contrast, raw aesthetic        | Space Grotesk + JetBrains Mono                 |
| **Signal Pop** | Bright consumer-tech, modular and graphic | IBM Plex Sans + Space Grotesk + JetBrains Mono |

```css
/* Optional: use exactly one alternative preset after styles.css */
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

### Creating a Preset

Add one preset data file, then register it once:

1. Copy `src/styles/presets-data/default.ts` to `src/styles/presets-data/<name>.ts`.
2. Export `<name>` and `<name>Dark` records from that file.
3. Import those records in `src/styles/presets-data/index.ts` and add one entry to `presetDefinitions`.
4. Run `bun run generate:presets`.
5. Run `bun run test:tokens`.

That single registry entry feeds the generated CSS files, the downstream package export, and the `TokenConfigPanel` preset dropdown. During `bun run build:css`, the preset is copied to `dist/presets/<name>.css`, so downstream apps can switch presets by changing the import:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/<name>.css';
```

App-level overrides should come after the preset import.

### Token System Checks

The token system self-regulates through CI checks:

- `bun scripts/generate-css.ts --check` verifies the generated palette, Tailwind colour adapter, and public semantic utilities.
- `bun scripts/generate-preset-css.ts --check` verifies generated preset CSS.
- `bun scripts/generate-rules.ts --check` verifies generated AI usage rules and the consumer skill's public API manifest.
- `bun run test:tokens` verifies semantic token registry coverage, Tailwind aliases, preset keys, and semantic class usage.
- `bun run test:css` verifies the compiled downstream CSS contains required tokens and utilities.

Install local Git hooks to run the same checks before commits:

```bash
bun run hooks:install
```

The repo-owned `.githooks/pre-commit` hook runs linting, formatting, typechecking, generated CSS drift checks, and semantic token checks. `.githooks/commit-msg` enforces Conventional Commits.

---

## Linting

The project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting and [Oxc Formatter](https://oxc.rs/docs/guide/usage/formatter.html) for formatting. A custom script checks for arbitrary Tailwind values to enforce design token usage:

```bash
bun src/scripts/lint-no-arbitrary.ts src showcase/src
```

---

## Showcase

Live component demo: **[https://rowanhen.github.io/composables/](https://rowanhen.github.io/composables/)**

---

## Components

All normal components import from `@leitware/composables`; AI components import from `/ai`. The packaged `use-composables` skill includes a generated, exact entrypoint/export manifest.

### Foundation

| Component       | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `utils`         | Utility functions for className merging and focus ring styles |
| `styles`        | Base design system CSS styles and theme tokens                |
| `numeric-input` | Numeric input parsing and formatting utilities                |

### Hooks

| Component            | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `use-mobile`         | Hook to detect mobile viewport breakpoint                     |
| `use-numeric-input`  | Hook for numeric input handling with sanitization and parsing |
| `direction-provider` | Base UI reading-direction provider with `useDirection`        |

### Layout

| Component      | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `stack`        | Flex-based vertical or horizontal stack layout              |
| `grid`         | Responsive CSS grid layout component                        |
| `container`    | Centered max-width content wrapper                          |
| `spacer`       | Flexible whitespace component for spacing                   |
| `separator`    | Visual divider line between content sections                |
| `layout`       | Rigid layout primitives: Section, FlexSpacer, NewspaperGrid |
| `layout-bento` | Bento grid layout with BentoGrid, BentoCell, and composites |
| `resizable`    | Resizable split pane panels                                 |
| `scroll-area`  | Custom scrollbar container with overflow handling           |

### Typography & Display

| Component    | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `typography` | Polymorphic text component with typographic scale variants          |
| `badge`      | Small status label with color variants                              |
| `avatar`     | Circular image element with automatic initials fallback             |
| `icon`       | Icon wrapper with size and color variants                           |
| `kbd`        | Keyboard shortcut key and key group display                         |
| `skeleton`   | Animated placeholder for loading content                            |
| `progress`   | Horizontal progress bar indicator                                   |
| `divider`    | Horizontal or vertical divider with solid, dots, and pills variants |

### Feedback & Overlay

| Component      | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `alert`        | Contextual feedback messages with type-based icon mapping  |
| `dialog`       | Modal dialog overlay with trigger, title, and footer props |
| `alert-dialog` | Modal dialog for important confirmations                   |
| `sheet`        | Slide-out panel from screen edge                           |
| `popover`      | Floating content panel anchored to a trigger               |
| `tooltip`      | Informational popup on hover or focus                      |
| `hover-card`   | Preview card shown on hover                                |
| `sonner`       | Toast notification system powered by Sonner                |

### Navigation

| Component       | Description                                            |
| --------------- | ------------------------------------------------------ |
| `tabs`          | Tabbed content navigation with items array API         |
| `breadcrumb`    | Navigation trail with items array API                  |
| `pagination`    | Page navigation with currentPage and totalPages API    |
| `sidebar`       | Application sidebar with collapsible navigation groups |
| `dropdown-menu` | Contextual menu triggered by a button                  |

### Data Display

| Component     | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| `table`       | Semantic HTML table with styled rows and cells                               |
| `card`        | Bordered content container with title, description, action, and footer props |
| `accordion`   | Vertically collapsible content sections with items array API                 |
| `collapsible` | Expandable and collapsible content panel with trigger prop                   |
| `item`        | Flexible list item with title, description, icon, and actions                |
| `message`     | Message row primitives for chat, activity, and assistant UIs                 |
| `bubble`      | Message bubble primitives with semantic variants                             |
| `marker`      | Inline metadata marker with icon, separator, and border variants             |
| `empty`       | Empty state placeholder with icon, title, and description                    |
| `carousel`    | Horizontally scrollable content slider with items array API                  |
| `code-block`  | Monospace code display with line numbers                                     |
| `list`        | Variant list renderer: arrow, bullet                                         |

### Form Components

| Component               | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `form-input`            | Text input field with label, error, and numeric mode support |
| `form-select`           | Select dropdown field with options array API                 |
| `native-select`         | Native HTML select with the design-system field treatment    |
| `form-combobox`         | Searchable select field with options array API               |
| `form-multi-combobox`   | Multi-select combobox field with chip display                |
| `form-textarea`         | Textarea field with label, description, and error handling   |
| `form-checkbox`         | Checkbox field with label, description, and error handling   |
| `form-switch`           | Switch toggle field with label and description               |
| `form-radiogroup`       | Radio group field with options array API                     |
| `form-slider`           | Slider field with label, value display, and error handling   |
| `form-input-group`      | Input group field with addons, buttons, and numeric support  |
| `form-calendar-popover` | Date picker field with calendar popover                      |
| `form-date-of-birth`    | Three-field date of birth input with auto-advance            |
| `form-dropzone`         | Single file upload field with drag-and-drop                  |
| `form-multi-dropzone`   | Multi-file upload field with drag-and-drop                   |

### Interactive

| Component      | Description                                             |
| -------------- | ------------------------------------------------------- |
| `button`       | Clickable button with loading spinner support           |
| `toggle`       | Pressable toggle button with left and right icon slots  |
| `toggle-group` | Grouped toggle buttons for single or multiple selection |
| `switch`       | Toggle switch for on/off states                         |
| `slider`       | Draggable range slider input                            |
| `checkbox`     | Toggle checkbox input with checked state                |
| `radio-group`  | Group of mutually exclusive radio options               |
| `combobox`     | Searchable select dropdown with autocomplete            |
| `select`       | Dropdown select menu with scrollable options            |
| `calendar`     | Date picker calendar powered by react-day-picker        |
| `dropzone`     | Drag-and-drop file upload area                          |

### Tooling Components

| Component            | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `token-config-panel` | Live token editor with color pickers, sliders, font selector, and preset switcher |
| `theme-injector`     | Floating palette button that opens the token editor from any page                 |

---

## License

MIT — see [LICENSE](LICENSE) for details.
