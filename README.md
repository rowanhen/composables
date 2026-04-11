# Composables

**An opinionated React component library with a semantic design token system — built on Base UI and Tailwind CSS v4.**

[![npm version](https://img.shields.io/npm/v/@leitware/composables-cli)](https://www.npmjs.com/package/@leitware/composables-cli)
[![CI](https://github.com/rowanhen/composables/actions/workflows/ci.yml/badge.svg)](https://github.com/rowanhen/composables/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is this?

Composables is a React component library with ~76 components across forms, layout, data display, feedback, and navigation — all built on [Base UI](https://base-ui.com/) primitives with a CSS custom property token system and 6 built-in design presets.

It uses a **two-tier architecture**:

- **`opinionated/`** — your API surface. These are the components you import and use day-to-day. They have clean, convenient props and sensible defaults.
- **`_internal/`** — low-level primitives. These are what the opinionated layer is built on. Biome lint rules block you from importing from here directly so that internal refactors don't break your app.

---

## Quick Start

```bash
npm install @leitware/composables-cli
```

Import the styles in your root CSS file:

```css
/* Option A: Full system (with Tailwind v4) */
@import "@leitware/composables-cli/styles.css";

/* Option B: Just the semantic tokens (no Tailwind, standalone) */
@import "@leitware/composables-cli/tokens.css";

/* Option C: A specific preset (standalone, pasteable) */
@import "@leitware/composables-cli/presets/brutalist.css";
```

Then import components:

```tsx
import { Button } from '@leitware/composables-cli'
import { FormInput } from '@leitware/composables-cli'
import { Card } from '@leitware/composables-cli'
```

---

## Design Tokens

The token system is built on CSS custom properties. Everything — colours, spacing, typography, radius, borders, shadows — is expressed as a token that you can override.

### Token Files

```
styles/
├── composable.css              ← Full system (Tailwind + all tokens)
├── tokens.css                  ← Standalone semantic tokens (no Tailwind)
├── tokens/
│   ├── palette.css             ← Primitive color scales
│   ├── semantic.css            ← Semantic tokens (light + dark)
│   ├── components.css          ← Component-level tunables
│   ├── tailwind-theme.css      ← Tailwind utility registrations
│   └── base.css                ← Global base styles
└── presets/
    ├── default.css             ← Each preset is a standalone CSS file
    ├── brutalist.css
    ├── editorial.css
    ├── midnight.css
    ├── soft.css
    └── swiss.css
```

### Customising Tokens

Override tokens in your own CSS:

```css
:root {
  --font-size-base: 15px;
  --radius: 0.75rem;
  --bg-fill-primary: var(--blue-800);
  --font-heading: "Fraunces Variable", serif;
}
```

Key token groups:

| Group | Example tokens |
|-------|----------------|
| Colour palette | `--neutral-100`, `--blue-800`, `--red-950` |
| Background | `--bg-default`, `--bg-fill-primary`, `--bg-surface-success` |
| Text | `--text-default`, `--text-secondary`, `--text-critical` |
| Border | `--border-default`, `--border-focus`, `--border-brand` |
| Icon | `--icon-default`, `--icon-success`, `--icon-critical` |
| Typography | `--font-size-base`, `--leading-base`, `--font-heading` |
| Spacing | `--spacing` (base unit, used in `calc()`) |
| Shape | `--radius`, `--radius-sm`, `--radius-lg` |
| Motion | `--duration-fast`, `--ease-default` |

The entire type scale derives from `--font-size-base` and `--leading-base` — adjust those two tokens to scale all text globally.

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

Six built-in design presets are available as standalone CSS files you can paste into your `index.css`:

| Preset | Vibe | Fonts |
|--------|------|-------|
| **Default** | Clean neutral system, works everywhere | Inter |
| **Brutalist** | Bold, high-contrast, raw aesthetic | Space Grotesk + JetBrains Mono |
| **Editorial** | Elegant serif-driven editorial layout | Fraunces + Source Serif 4 |
| **Midnight** | Dark-first design with deep surfaces | Space Grotesk + Inter |
| **Soft** | Rounded, friendly, warm neutrals | Plus Jakarta Sans + DM Sans |
| **Swiss** | Minimal, grid-disciplined, typographic | Helvetica Neue / system |

```css
/* Use a preset by importing it */
@import "@leitware/composables-cli/presets/midnight.css";
```

Font imports for non-default presets are commented out at the top of `composable.css` — uncomment the one you need.

---

## Lint Rules

Three Biome rule files are shipped with the package:

### `biome-ui-restricted`

Blocks direct imports from `_internal/`. Enforces the two-tier boundary.

```json
// biome.json
{ "extends": ["./src/rules/biome-ui-restricted.json"] }
```

### `biome-no-direct-icons`

Warns when importing icons directly from `lucide-react` instead of using the `Icon` component.

```json
// biome.json
{ "extends": ["./src/rules/biome-no-direct-icons.json"] }
```

### `biome-a11y`

Enhanced accessibility enforcement rules.

```json
// biome.json
{ "extends": ["./src/rules/biome-a11y.json"] }
```

---

## Showcase

Live component demo: **[https://rowanhen.github.io/composables/](https://rowanhen.github.io/composables/)**

---

## Components

### Foundation

| Component | Description |
|-----------|-------------|
| `utils` | Utility functions for className merging and focus ring styles |
| `styles` | Base design system CSS styles and theme tokens |
| `numeric-input` | Numeric input parsing and formatting utilities |

### Hooks

| Component | Description |
|-----------|-------------|
| `use-mobile` | Hook to detect mobile viewport breakpoint |
| `use-numeric-input` | Hook for numeric input handling with sanitization and parsing |

### Layout

| Component | Description |
|-----------|-------------|
| `stack` | Flex-based vertical or horizontal stack layout |
| `grid` | Responsive CSS grid layout component |
| `container` | Centered max-width content wrapper |
| `spacer` | Flexible whitespace component for spacing |
| `separator` | Visual divider line between content sections |
| `layout` | Rigid layout primitives: Section, FlexSpacer, NewspaperGrid |
| `layout-bento` | Bento grid layout with BentoGrid, BentoCell, and composites |
| `resizable` | Resizable split pane panels |
| `scroll-area` | Custom scrollbar container with overflow handling |

### Typography & Display

| Component | Description |
|-----------|-------------|
| `typography` | Polymorphic text component with typographic scale variants |
| `badge` | Small status label with color variants |
| `avatar` | Circular image element with automatic initials fallback |
| `icon` | Icon wrapper with size and color variants |
| `glyph` | Fixed-size square containing a centred character or symbol |
| `skeleton` | Animated placeholder for loading content |
| `progress` | Horizontal progress bar indicator |
| `divider` | Horizontal or vertical divider with solid, dots, and pills variants |

### Feedback & Overlay

| Component | Description |
|-----------|-------------|
| `alert` | Contextual feedback messages with type-based icon mapping |
| `dialog` | Modal dialog overlay with trigger, title, and footer props |
| `alert-dialog` | Modal dialog for important confirmations |
| `sheet` | Slide-out panel from screen edge |
| `popover` | Floating content panel anchored to a trigger |
| `tooltip` | Informational popup on hover or focus |
| `hover-card` | Preview card shown on hover |
| `sonner` | Toast notification system powered by Sonner |

### Navigation

| Component | Description |
|-----------|-------------|
| `tabs` | Tabbed content navigation with items array API |
| `breadcrumb` | Navigation trail with items array API |
| `pagination` | Page navigation with currentPage and totalPages API |
| `sidebar` | Application sidebar with collapsible navigation groups |
| `dropdown-menu` | Contextual menu triggered by a button |

### Data Display

| Component | Description |
|-----------|-------------|
| `table` | Semantic HTML table with styled rows and cells |
| `card` | Bordered content container with title, description, action, and footer props |
| `accordion` | Vertically collapsible content sections with items array API |
| `collapsible` | Expandable and collapsible content panel with trigger prop |
| `item` | Flexible list item with title, description, icon, and actions |
| `empty` | Empty state placeholder with icon, title, and description |
| `carousel` | Horizontally scrollable content slider with items array API |
| `line-item` | Key-value row with dot/solid/pills leader |
| `line-item-header` | Section header label for receipt/list layouts |
| `code-block` | Monospace code display with line numbers |
| `tree-view` | ASCII-art collapsible tree with keyboard navigation |
| `block-loader` | Animated Unicode spinner with 11 sequence modes |
| `list` | Variant list renderer: arrow, bullet |
| `pricing-card` | Pricing card with ledger-style layout and feature list |

### Form Components

| Component | Description |
|-----------|-------------|
| `form-input` | Text input field with label, error, and numeric mode support |
| `form-select` | Select dropdown field with options array API |
| `form-combobox` | Searchable select field with options array API |
| `form-multi-combobox` | Multi-select combobox field with chip display |
| `form-textarea` | Textarea field with label, description, and error handling |
| `form-checkbox` | Checkbox field with label, description, and error handling |
| `form-switch` | Switch toggle field with label and description |
| `form-radiogroup` | Radio group field with options array API |
| `form-slider` | Slider field with label, value display, and error handling |
| `form-input-group` | Input group field with addons, buttons, and numeric support |
| `form-calendar-popover` | Date picker field with calendar popover |
| `form-date-of-birth` | Three-field date of birth input with auto-advance |
| `form-dropzone` | Single file upload field with drag-and-drop |
| `form-multi-dropzone` | Multi-file upload field with drag-and-drop |

### Interactive

| Component | Description |
|-----------|-------------|
| `button` | Clickable button with loading spinner support |
| `toggle` | Pressable toggle button with left and right icon slots |
| `switch` | Toggle switch for on/off states |
| `slider` | Draggable range slider input |
| `checkbox` | Toggle checkbox input with checked state |
| `radio-group` | Group of mutually exclusive radio options |
| `combobox` | Searchable select dropdown with autocomplete |
| `select` | Dropdown select menu with scrollable options |
| `calendar` | Date picker calendar powered by react-day-picker |
| `dropzone` | Drag-and-drop file upload area |

### Tooling Components

| Component | Description |
|-----------|-------------|
| `token-config-panel` | Live token editor with color pickers, sliders, font selector, and preset switcher |
| `theme-injector` | Floating palette button that opens the token editor from any page |

---

## License

MIT — see [LICENSE](LICENSE) for details.
