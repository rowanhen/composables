# Composables

**A shadcn-style React component library for Leitware projects — install code directly into your project.**

[![npm version](https://img.shields.io/npm/v/@leitware/composables-cli)](https://www.npmjs.com/package/@leitware/composables-cli)
[![CI](https://github.com/rowanhen/composables/actions/workflows/ci.yml/badge.svg)](https://github.com/rowanhen/composables/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is this?

Composables is a **shadcn-style component library**: instead of installing a package that renders components, you use a CLI to copy component source files directly into your project. You own the code. You can read it, modify it, and adapt it to your needs.

It uses a **two-tier architecture**:

- **`components/ui-opinionated/`** — your API surface. These are the components you import and use day-to-day. They have clean, convenient props and sensible defaults.
- **`components/_internal/`** — low-level primitives. These are what the opinionated layer is built on. Biome lint rules block you from importing from here directly so that internal refactors don't break your app.

The library ships ~76 components across forms, layout, data display, feedback, and navigation — all built on [Base UI](https://base-ui.com/) primitives with a CSS custom property token system and 6 built-in design presets.

---

## Quick Start

```bash
# Scaffold directories and install the foundation (CSS tokens, utilities)
bunx @leitware/composables-cli init
# Note: `init` is coming soon. For now, `add` handles dependency resolution automatically.

# Add individual components
bunx @leitware/composables-cli add button
bunx @leitware/composables-cli add form-input

# Add everything at once
bunx @leitware/composables-cli add all

# See what's available
bunx @leitware/composables-cli list
```

Then import from the opinionated layer:

```tsx
import { Button } from '@/components/ui-opinionated/button'
import { FormInput } from '@/components/ui-opinionated/form-input'
import { Card } from '@/components/ui-opinionated/card'
```

---

## Architecture

### Two-Tier Component Model

```
your-project/
└── src/
    └── components/
        ├── ui-opinionated/     ← Import from here
        │   ├── button.tsx
        │   ├── form-input.tsx
        │   └── ...
        └── _internal/          ← Don't import from here directly
            ├── button.tsx
            ├── input.tsx
            └── ...
```

**`ui-opinionated/`** components wrap the internal primitives with:
- Simplified, consolidated prop APIs (e.g. `options={[]}` instead of building `<SelectItem>` trees)
- Loading states, error handling, and label/description wiring
- Sensible defaults so you can drop a `<FormInput label="Email" />` and get a working field

**`_internal/`** components are the building blocks. They're flexible and composable, but their APIs can change. The opinionated layer is your stable surface.

Biome lint rules enforce the boundary — if you accidentally import from `_internal/`, you'll get an error.

### Why this approach?

You get full control (it's your code) with the stability guarantees of an abstraction layer. If we change how the internal `select` primitive works, your `form-select` keeps working because the opinionated layer mediates the change.

---

## CLI Commands

### `init`

Scaffolds the required directory structure and installs the CSS foundation:

```bash
bunx @leitware/composables-cli init
```

Installs:
- `styles/composable.css` — CSS tokens, Tailwind v4 theme, dark mode
- `lib/utils.ts` — className merge utilities (`cn`, `focusRing`)

### `add <component>`

Copies a component (and all its internal dependencies) into your project:

```bash
bunx @leitware/composables-cli add button
bunx @leitware/composables-cli add form-input
bunx @leitware/composables-cli add sidebar
```

Dependencies are resolved automatically. Adding `sidebar` will also install `button`, `input`, `separator`, `sheet`, `skeleton`, `tooltip`, and `use-mobile`.

**Options:**
- `-d, --dest <path>` — destination directory (default: `.`)
- `-y, --yes` — overwrite existing files without prompting
- `--alias <prefix>` — rewrite `@/` imports to a custom alias

### `add all`

Installs every component in the registry:

```bash
bunx @leitware/composables-cli add all
```

### `list`

Lists all available components with their tags and descriptions:

```bash
bunx @leitware/composables-cli list
```

---

## Design Tokens

The token system is built on CSS custom properties. Everything — colours, spacing, typography, radius, borders, shadows — is expressed as a token that you can override.

After running `init`, your `styles/composable.css` contains the full token set. To customise, override tokens in your `:root`:

```css
:root {
  --font-size-base: 15px;
  --radius-base: 0.5rem;
  --primary: var(--blue-800);
  --primary-foreground: white;
}
```

Key token groups:

| Group | Example tokens |
|-------|----------------|
| Colour palette | `--neutral-100`, `--blue-800`, `--red-950` |
| Semantic colours | `--primary`, `--secondary`, `--muted`, `--destructive` |
| Typography | `--font-size-base`, `--leading-base`, `--font-heading` |
| Spacing | `--spacing` (base unit, used in `calc()`) |
| Shape | `--radius-base`, `--radius-sm`, `--radius-lg` |
| Border | `--border-width-base`, `--border` |
| Motion | `--duration-fast`, `--ease-default` |
| Feedback | `--text-success`, `--bg-surface-critical`, `--border-warning` |

The entire type scale derives from `--font-size-base` and `--leading-base` — adjust those two tokens to scale all text globally.

### Live Token Editor

Install the `token-config-panel` or `theme-injector` components for a floating palette button that opens a live token editor in your running app:

```bash
bunx @leitware/composables-cli add theme-injector
```

```tsx
// In your root layout
import { ThemeInjector } from '@/components/ui-opinionated/theme-injector'

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

Six built-in design presets override the default token set. Apply one by copying its token overrides into your `:root` (or use the `TokenConfigPanel` to switch presets live).

| Preset | Vibe | Fonts |
|--------|------|-------|
| **Default** | Clean neutral system, works everywhere | Inter |
| **Brutalist** | Bold, high-contrast, raw aesthetic | Space Grotesk |
| **Editorial** | Elegant serif-driven editorial layout | Fraunces + Source Serif 4 |
| **Midnight** | Dark-first design with deep surfaces | Space Grotesk |
| **Soft** | Rounded, friendly, warm neutrals | Plus Jakarta Sans + DM Sans |
| **Swiss** | Minimal, grid-disciplined, typographic | Helvetica Neue / system |

Font imports for non-default presets are commented out at the top of `composable.css` — uncomment the one you need.

---

## Lint Rules

Three Biome rule files are available via the CLI:

### `biome-ui-restricted`

Blocks direct imports from `components/_internal/`. Use this to enforce the two-tier boundary in your app code.

```bash
bunx @leitware/composables-cli add biome-ui-restricted
```

```json
// biome.json
{
  "extends": ["./src/rules/biome-ui-restricted.json"]
}
```

### `biome-no-direct-icons`

Warns when you import icons directly from `lucide-react` in app code. Encourages you to use the `Icon` component instead, which applies sizing tokens consistently.

```bash
bunx @leitware/composables-cli add biome-no-direct-icons
```

```json
// biome.json
{
  "extends": ["./src/rules/biome-no-direct-icons.json"]
}
```

### `biome-a11y`

Enhanced accessibility enforcement rules.

```bash
bunx @leitware/composables-cli add biome-a11y
```

```json
// biome.json
{
  "extends": ["./src/rules/biome-a11y.json"]
}
```

You can extend multiple rule files:

```json
{
  "extends": [
    "./src/rules/biome-ui-restricted.json",
    "./src/rules/biome-no-direct-icons.json",
    "./src/rules/biome-a11y.json"
  ]
}
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

### Tooling

| Component | Description |
|-----------|-------------|
| `biome-ui-restricted` | Biome lint rule restricting direct `_internal` component imports |
| `biome-no-direct-icons` | Biome lint rule discouraging direct lucide-react imports in app code |
| `biome-a11y` | Biome lint rule set with enhanced accessibility enforcement |

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
| `line-item` | Key-value row with dot/solid/pills leader. Variants: default, fill, bold, compact |
| `line-item-header` | Section header label for receipt/list layouts |
| `code-block` | Monospace code display with line numbers |
| `tree-view` | ASCII-art collapsible tree with keyboard navigation and ARIA semantics |
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
