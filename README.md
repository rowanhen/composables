# Composables

**An opinionated React component library with a semantic design token system — built on Base UI and Tailwind CSS v4.**

[![npm version](https://img.shields.io/npm/v/@leitware/composables-cli)](https://www.npmjs.com/package/@leitware/composables-cli)
[![CI](https://github.com/rowanhen/composables/actions/workflows/ci.yml/badge.svg)](https://github.com/rowanhen/composables/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is this?

Composables is a React component library with ~70 components across forms, layout, data display, feedback, and navigation — all built on [Base UI](https://base-ui.com/) primitives with a CSS custom property token system and 2 built-in design presets.

It uses a **two-tier architecture**:

- **`opinionated/`** — your API surface. These are the components you import and use day-to-day. They have clean, convenient props and sensible defaults.
- **`_internal/`** — low-level primitives. These are what the opinionated layer is built on. Lint rules block you from importing from here directly so that internal refactors don't break your app.

---

## Quick Start

```bash
npm install @leitware/composables-cli
```

Import the styles in your root CSS file:

```css
@import '@leitware/composables-cli/styles.css';

/* Optional: apply one preset after the base styles */
@import '@leitware/composables-cli/presets/brutalist.css';
```

The CSS is pre-compiled — no Tailwind installation or configuration needed downstream.

Then import components:

```tsx
import { Button } from '@leitware/composables-cli'
import { FormInput } from '@leitware/composables-cli'
import { Card } from '@leitware/composables-cli'
```

Optional AI components are exposed from their own entrypoint:

```tsx
import { AIMessage, AIPromptInput } from '@leitware/composables-cli/ai'
```

---

## Optional Dependencies

Only the core (layout, forms, typography, feedback) is installed by default. Components that depend on heavier libraries require you to install the relevant package:

| Install when using…                             | Package                                                                                                                                                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Calendar`, `FormCalendarPopover`               | `react-day-picker`                                                                                                                                                                       |
| `Carousel`                                      | `embla-carousel-react`                                                                                                                                                                   |
| `Dropzone`, `FormDropzone`, `FormMultiDropzone` | `react-dropzone`                                                                                                                                                                         |
| `ResizablePanels`                               | `react-resizable-panels`                                                                                                                                                                 |
| `Sonner` (toasts)                               | `sonner`                                                                                                                                                                                 |
| AI elements from `@leitware/composables-cli/ai` | `ai`, `shiki`, `streamdown`, `@streamdown/cjk`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid`, `use-stick-to-bottom`, `nanoid`, `@radix-ui/react-use-controllable-state` |
| `ThemeInjector` / `TokenConfigPanel`            | `react-colorful`                                                                                                                                                                         |
| Default preset fonts                            | `@fontsource-variable/inter`                                                                                                                                                             |
| Brutalist preset fonts                          | `@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`                                                                                                              |

If you use a component without its optional dependency installed, you'll get a clear module-not-found error at build time telling you exactly what to add.

---

## Design Tokens

The token system is built on CSS custom properties. Everything — colours, spacing, typography, radius, borders, shadows — is expressed as a token that you can override.

### Token Files

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
│   └── brutalist.css
└── presets-data/               ← Source of truth for preset token values (TS)
```

Generated CSS ownership:

| File                        | Source of truth                     | Generated by                     |
| --------------------------- | ----------------------------------- | -------------------------------- |
| `tokens/palette.css`        | `scripts/palette.ts`                | `bun run generate:palette`       |
| `presets/*.css`             | `src/styles/presets-data/index.ts`  | `bun run generate:presets`       |
| `dist/styles.css`           | `src/styles/composable.css` + `src` | `bun run build:css`              |
| `dist/presets/*.css`        | `src/styles/presets/*.css`          | `bun run build:css`              |
| `tokens/semantic.css`       | Hand-authored semantic mappings     | Checked by `bun run test:tokens` |
| `tokens/tailwind-theme.css` | Hand-authored Tailwind aliases      | Checked by `bun run test:tokens` |

### Customising Tokens

Override tokens in your own CSS:

```css
:root {
	--font-size-base: 15px;
	--radius: 0.75rem;
	--bg-fill-primary: var(--blue-800);
	--font-heading: 'Fraunces Variable', serif;
}
```

Key token groups:

| Group          | Example tokens                                                                        |
| -------------- | ------------------------------------------------------------------------------------- |
| Colour palette | `--neutral-100`, `--blue-800`, `--red-950`                                            |
| Background     | `--bg-default`, `--bg-fill-primary`, `--bg-surface-success`                           |
| Text           | `--text-default`, `--text-secondary`, `--text-critical`                               |
| Border         | `--border-default`, `--border-focus`, `--border-brand`                                |
| Icon           | `--icon-default`, `--icon-success`, `--icon-critical`                                 |
| Typography     | `--font-size-base`, `--leading-base`, `--font-heading`                                |
| Spacing        | `--spacing` (base unit, used in `calc()`)                                             |
| Shape          | `--radius`, `--radius-sm`, `--radius-lg`                                              |
| Motion         | `--motion-duration-overlay`, `--motion-duration-disclosure`, `--motion-ease-standard` |

The entire type scale derives from `--font-size-base` and `--leading-base` — adjust those two tokens to scale all text globally.

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
import { ThemeInjector } from '@leitware/composables-cli'

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

Two built-in design presets are available as standalone CSS files you can paste into your `index.css`:

| Preset        | Vibe                                   | Fonts                          |
| ------------- | -------------------------------------- | ------------------------------ |
| **Default**   | Clean neutral system, works everywhere | Inter + Bricolage Grotesque    |
| **Brutalist** | Bold, high-contrast, raw aesthetic     | Space Grotesk + JetBrains Mono |

```css
/* Use exactly one shipped preset by importing it after styles.css */
@import '@leitware/composables-cli/presets/brutalist.css';
```

Font imports for non-default presets are commented out at the top of `composable.css` — uncomment the one you need.

### Creating a Preset

Add one preset data file, then register it once:

1. Copy `src/styles/presets-data/default.ts` to `src/styles/presets-data/<name>.ts`.
2. Export `<name>` and `<name>Dark` records from that file.
3. Import those records in `src/styles/presets-data/index.ts` and add one entry to `presetDefinitions`.
4. Run `bun run generate:presets`.
5. Run `bun run test:tokens`.

That single registry entry feeds the generated CSS files, the downstream package export, and the `TokenConfigPanel` preset dropdown. During `bun run build:css`, the preset is copied to `dist/presets/<name>.css`, so downstream apps can switch presets by changing the import:

```css
@import '@leitware/composables-cli/styles.css';
@import '@leitware/composables-cli/presets/<name>.css';
```

App-level overrides should come after the preset import.

### Token System Checks

The token system self-regulates through CI checks:

- `bun scripts/generate-css.ts --check` verifies generated palette CSS.
- `bun scripts/generate-preset-css.ts --check` verifies generated preset CSS.
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
