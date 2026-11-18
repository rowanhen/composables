# Composables

**An opinionated React component library with a semantic design token system, built on Base UI and Tailwind CSS v4.**

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

### Images

`Image` requires `src`, `alt`, and intrinsic pixel `width`/`height`, or explicit `fill` mode. Dimensions reserve space before loading; images shrink to fit their container. Use `alt=""` for decorative images.

```tsx
import { AspectRatio, Image } from '@leitware/composables'

<Image src="/mountains.jpg" alt="Snow on the mountain peaks" width={1200} height={800} />

<AspectRatio ratio={16 / 9}>
	<Image src="/mountains.jpg" alt="Snow on the mountain peaks" fill />
</AspectRatio>
```

`fill` absolutely positions the image inside a positioned parent with a defined size. For a background, use a relatively positioned container, `alt=""`, and place foreground content above the image. `fit="cover"` crops by default; `fit="contain"` shows the entire image against the muted background. `position` controls the focal point. `className`, `style`, and the forwarded ref target the actual image.

Images default to `loading="lazy"` and `decoding="async"`. For an above-the-fold hero, use `loading="eager"` and optionally `fetchPriority="high"`. Native `srcSet`, `sizes`, events, and other image attributes pass through. Supply `sizes` to describe the rendered width when using width-descriptor `srcSet` sources. This is a native browser image component: it does not generate responsive sources or provide Next.js image optimization. Captions and credits can be composed using `figure` and `figcaption`.

Image presentation uses the same CVA variant system as other components: `variant="default"` provides rounded corners and a muted background, `variant="outline"` adds a semantic border, and `variant="plain"` removes rounding and background for edge-to-edge media. The default appearance is unchanged. `imageVariants` is exported for reusing these styles; `className` overrides remain supported.

### Override the theme

Override known semantic variables after the imports. Define both modes when a colour decision should change with the theme:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css';

:root {
	--bg-fill-brand: #6d28d9;
	--border-brand: #8b5cf6;
	--radius-base: 0.75rem;
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

`tailwind.css` contains exact generated `@utility` definitions for the public semantic class contract. With that adapter imported, variant-prefixed forms such as `hover:bg-surface-hover`, `md:text-success`, and `group-hover:border-stroke-success` are supported when the suffix is an exact documented class. Without it, only the shipped unprefixed semantic classes are guaranteed. The adapter also registers native colour/component-role aliases and button paint recipes, supporting opacity modifiers and readable utilities such as `h-control-md`, `rounded-input` and `text-body`. It does not include Tailwind itself or replace `styles.css`. Generic shadcn aliases are isolated in the optional `@leitware/composables/compat.css` bridge, not included in core or accepted as authoring tokens.

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

The desktop-style preview chrome is also available on its own:

```tsx
import { WindowFrame } from '@leitware/composables'
;<WindowFrame title="Project overview" toolbar={<span>Workspace</span>}>
	<div>Dashboard content</div>
</WindowFrame>
```

### Consumer agent skill

The npm package includes a `use-composables` agent skill at `skills/use-composables/SKILL.md`. Install or point your coding agent at that directory to give it the package workflow, semantic-styling rules, exact public entrypoints, and optional-dependency guidance. Its utility manifest is generated from the token registry by `bun scripts/generate-tokens.ts`; its public API manifest is generated from package metadata and public barrels by `bun scripts/generate-rules.ts`. Both generators support `--check`, keeping agent guidance aligned with the shipped contract.

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

Editorial Grid:

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/bricolage-grotesque';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/editorial-grid.css';
```

**Kumo**

```css
@import '@fontsource-variable/inter';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/kumo.css';
```

Sponder:

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/geist';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/sponder.css';
```

The variable entrypoints include their preset weight ranges. The explicit IBM Plex files load normal weights 400–700; add italic entrypoints only if your interface uses them. The same package paths can instead be loaded as side-effect imports from an application entry file, for example `import '@fontsource-variable/inter'` or `import '@fontsource/ibm-plex-sans/600.css'`.

---

## Design Tokens

The token system is built on CSS custom properties. Colours, spacing, typography, radius, borders, shadows, and motion are expressed as semantic or component tokens that presets and applications can override.

See the [token authoring guide](docs/tokens.md) for the naming strategy, internal component roles, preset API, Tailwind integration, migration notes and enforcement rules. The [generated token reference](docs/token-reference.md) lists every configurable token and its default.

```ts
import { defineTokens, tokenVar, type TokenStyle } from '@leitware/composables/tokens'

const style: TokenStyle = {
	...defineTokens({ '--card-radius': '0.75rem', '--button-radius': '9999px' }),
	color: tokenVar('--text-secondary'),
}
```

Presets and overrides use exact token-name unions. `definePreset` extends complete light/dark themes; `createPresetCSS` emits document or scoped CSS with a complete independent map at each theme boundary. The live editor uses the same serializer and validates JSON imports against the token registry.

Run `bun run generate:tokens` to regenerate every token stylesheet, preset and reference from TypeScript. Run `bun run test:generated` to check drift. Do not edit generated CSS. All authored values and utility registrations live together in `definitions.ts`; obsolete base factors and the separate palette API have been removed.

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

| Preset             | Vibe                                                  | Fonts                                          |
| ------------------ | ----------------------------------------------------- | ---------------------------------------------- |
| **Default**        | Clean neutral system, works everywhere                | Inter + Bricolage Grotesque                    |
| **Brutalist**      | Bold, high-contrast, raw aesthetic                    | Space Grotesk + JetBrains Mono                 |
| **Signal Pop**     | Bright consumer-tech, modular and graphic             | IBM Plex Sans + Space Grotesk + JetBrains Mono |
| **Editorial Grid** | Flat technical catalogue with vivid signals           | Inter + Bricolage Grotesque                    |
| **Kumo**           | Cloudflare-inspired surfaces and highlighted buttons  | Inter                                          |
| **Sponder**        | Warm light and dark slate surfaces with green accents | Inter + Geist                                  |

```css
/* Optional: use exactly one alternative preset after styles.css */
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

Kumo takes its cues from [Cloudflare's Kumo](https://kumo-ui.com/components/button/):
neutral light/dark surfaces, blue primary actions, an orange brand accent, and
solid red destructive buttons. Primary (`variant="default"`) and destructive
buttons have darker borders, vertical gradients, and inset top highlights.
The brand button uses the brand gradient and foreground; status and action variants retain their own meanings. There is one brand intent, without numbered brand variants.

### Token authoring and presets

All values and utility registrations live together in the exported `tokens` record in `src/styles/tokens/definitions.ts`. Each token owns complete light/dark values for all eight themes. There are no authored base/override/preset chains. `bun run generate:tokens` emits the CSS, Tailwind adapter and documentation from that record.

The [token reference](docs/token-reference.md) lists every name, purpose, utility registration and default value. The [authoring guide](docs/tokens.md) explains naming, component coverage, migration, and the exact enforced rules. TokenConfigPanel exposes every token with search, mode switching, reset and complete JSON import/export.

To add a theme, add its metadata in `themes.ts` and its values to every token. Missing values are type and generation errors. Alternative theme imports remain `@leitware/composables/presets/<name>.css`.

### Enforced checks

`bun run lint` rejects raw colours, palette utilities, unknown tokens/classes, constructed classes, wrong semantic roles and untokenized appearance values. Utility validation uses the installed Tailwind compiler with the package stylesheet. Structural layout and documented runtime measurement expressions remain supported.

Run `lint`, `format:check`, `typecheck`, `test:generated`, `test:tokens`, `test:token-api`, `build:css`, `test:css` and `test:tokens:browser`. CI treats these as required checks, including negative lint fixtures and computed-style browser tests. Regenerate public usage rules with `bun run generate:rules` after API or README changes.

Install `.githooks` with `bun run hooks:install`. Pre-commit checks styling, types and generated output; commit messages follow Conventional Commits.

---

## Showcase

Live component demo: **[https://composables.leitware.com](https://composables.leitware.com)**

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

| Component           | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `tabs`              | Tabbed content navigation with items array API                             |
| `breadcrumb`        | Navigation trail with items array API                                      |
| `pagination`        | Page navigation with currentPage and totalPages API                        |
| `sidebar`           | Application sidebar with collapsible navigation groups                     |
| `dropdown-menu`     | Contextual menu triggered by a button                                      |
| `table-of-contents` | Nested section navigation with an active rail and optional scroll tracking |

Tabs default to `variant="segmented"`, with an animated selection surface.
Use `variant="underline"` for the line treatment; the existing `default` and
`line` variant names remain supported as aliases. Labels use semantic text
colours in every preset. Flow uses `--flow-border-width` with a minimum of 1px,
so canvas and node outlines survive a zero global border width.

### Data Display

| Component        | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `table`          | Semantic HTML table with styled rows and cells                               |
| `card`           | Bordered content container with title, description, action, and footer props |
| `accordion`      | Vertically collapsible content sections with items array API                 |
| `collapsible`    | Expandable and collapsible content panel with trigger prop                   |
| `item`           | Flexible list item with title, description, icon, and actions                |
| `message`        | Message row primitives for chat, activity, and assistant UIs                 |
| `bubble`         | Message bubble primitives with semantic variants                             |
| `marker`         | Inline metadata marker with icon, separator, and border variants             |
| `empty`          | Empty state placeholder with icon, title, and description                    |
| `carousel`       | Horizontally scrollable content slider with items array API                  |
| `code-block`     | Monospace code display with line numbers                                     |
| `list`           | Variant list renderer: arrow, bullet                                         |
| `layer-card`     | Layered content surface with recessed header and footer                      |
| `flow`           | Connected workflow steps and parallel branches                               |
| `clipboard-text` | Read-only copy field with success and error feedback                         |

### Kumo-inspired compositions

`LayerCard`, `TableOfContents`, `Flow`, and `ClipboardText` are available from the
package root. They use the same semantic tokens as the rest of the library and
adapt to every preset; Kumo adds its soft layered surfaces and diagram canvas.
Their treatments follow the [Kumo component references](https://kumo-ui.com/components/layer-card/).

```tsx
import { LayerCard, TableOfContents, Flow, ClipboardText } from '@leitware/composables'

<LayerCard title="Next steps" footer="Last updated just now">
  <ClipboardText text="bun add @leitware/composables" />
</LayerCard>

<TableOfContents
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'setup', label: 'Setup', children: [{ id: 'install', label: 'Installation' }] },
  ]}
  trackScroll
/>

<Flow
  steps={[
    { id: 'request', label: 'Request' },
    { id: 'parallel', branches: [
      [{ id: 'cache', label: 'Cache lookup' }],
      [{ id: 'worker', label: 'Worker' }, { id: 'validate', label: 'Validate' }],
    ] },
    { id: 'response', label: 'Response' },
  ]}
/>
```

LayerCard exposes `.Root`, `.Primary`, and `.Secondary` for custom composition.
TableOfContents exposes `.Title`, `.List`, `.Item`, and `.Group`; items support
Base UI's `render` prop for router links. `activeId` and `onActiveIdChange` support
controlled selection. Optional `trackScroll` follows matching document section
IDs with `scrollOffset` for sticky headers. `useTableOfContentsActiveId` also
supports a custom scroll root.

Flow exposes `.Node`, `.Parallel`, `.List`, and `.Anchor`. Use `orientation="vertical"`
for a top-to-bottom diagram, `align="center"` for centered branches, or `canvas={false}`
for an inline diagram. Connectors update when nodes, anchors, or the viewport
resize. The canvas supports native scrolling and mouse dragging; node controls
retain their normal interactions. Node IDs should be unique within the document.

ClipboardText supports `sm`, `default`, and `lg` sizes, `textToCopy` for a value
that differs from the display, optional tooltips, localized `labels`, and
`onCopy` / `onCopyError` callbacks. Feedback resets after `feedbackDuration`
(default 1500ms). Failed clipboard writes never display a success state.

Component tokens include `--layer-card-radius`, `--layer-card-padding`,
`--layer-card-shadow`, `--clipboard-text-height` (and `-sm` / `-lg`),
`--clipboard-text-radius`, `--flow-gap`, `--flow-branch-gap`, `--flow-node-radius`,
`--flow-node-shadow`, and the `--flow-canvas-*` controls.

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

| Component            | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `token-config-panel` | Searchable complete token catalogue with theme/mode editing and JSON import/export |
| `theme-injector`     | Floating palette button that opens the token editor from any page                  |

---

## License

MIT. See [LICENSE](LICENSE) for details.

## Component gallery

The gallery runs in Storybook. Existing component and AI demos are available as simple showcase stories, with the theme and token editor available in the preview.

```bash
bun install
bun run dev              # Storybook at http://localhost:6006
bun run build:storybook  # Static gallery in showcase/dist
```

Stories live in `showcase/src/stories/`; add a `.stories.tsx` file there to extend the gallery. The existing `bunx vite build showcase` command also builds Storybook for compatibility with current build and deployment workflows.

The production gallery is [composables.leitware.com](https://composables.leitware.com). Deploy with `bun run deploy:showcase`. Cloudflare Pages hosts that custom domain; the `composables_canonical_domain` Bulk Redirect list sends the Pages domain and its deployment subdomains to the production gallery, preserving paths and query strings. GitHub Pages is disabled.

The static build versions Storybook's otherwise unversioned runtime script URLs and emits cache headers in `scripts/prepare-storybook.ts`, so browsers load matching scripts after each deployment.
