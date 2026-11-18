# Token system

Composables has four authored layers, one typed generator, and eight complete light/dark presets. The [generated reference](token-reference.md) lists every configurable role and its default value. `tokenCatalog` exposes the same inventory to tooling.

## Ownership and naming

| Layer              | Source                              | Responsibility                                                                                                                                |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Palette            | `src/styles/tokens/palette-data.ts` | Ten light/dark colour scales, alpha ramps, white/black and overlays. Names start `--palette-`; never use raw palette utilities in components. |
| Foundation         | `foundations.ts`                    | Tailwind-native type, radius, shadow, spacing, font, duration, container, opacity and stacking scales.                                        |
| Semantic colour    | `registry.ts` + `presets-data/*.ts` | Registry owns names and allowed utility roles; each preset owns colour values. `default.ts` is also the generated baseline.                   |
| Shared system      | `system-tokens.ts`                  | Scale inputs and shared control, typography, focus, selection, motion and layout decisions.                                                   |
| Component          | `component-tokens.ts`               | Independent button, input, card, menu, dialog, tooltip, choice, slider, switch, tab, flow and other component settings.                       |
| Authoring adapters | `utility-aliases.ts`, `recipes.ts`  | Native Tailwind namespaces and typed paint recipes. No independent theme values.                                                              |

Names express a category and a role: `--bg-surface-popover`, `--text-on-fill-primary`, `--border-focus`. Component names express component, optional variant/size/state, and property: `--button-brand-2-hover-shadow`, `--control-size-md`. Numbered brand and chart slots identify independent categories, not brightness levels.

The root radius input is `--radius-base`. `--spacing` is the intentional Tailwind base-unit exception. `--primary`, `--background`, and the other shadcn aliases exist only in the optional `@leitware/composables/compat.css` bridge. They are absent from the core stylesheet. They are forbidden in authored components and preset inputs.

## Choosing a role

- Background: `--bg-default` is the page canvas; `--bg-muted` is subdued canvas. `surface-*` covers containers, status areas and fields. `fill-*` covers actions, selected elements and strong emphasis. `surface-field` is a solid field/track tone; `surface-input` is the editable control wash.
- Text: default, secondary, muted and disabled describe emphasis. `on-fill-*` and `on-surface-*` are paired foregrounds; choose the pair together. Status text is separate from status fill and icon colour.
- Icons: use `icon-*` for independent status or decorative glyphs. Icons intended to match adjacent copy may inherit `currentColor`.
- Borders: use `border-*` roles for boundaries, validation and focus. Do not take an arbitrary background colour to draw a boundary.
- Shared controls: Input, Textarea, Select, Combobox and InputGroup share `control-*` colour, size and typography roles. Their geometry uses the spacing/type scales. Buttons share that sizing foundation but own their paint and shape.
- Typography: use body, title, heading, label or control roles in reusable components. Their presets select scale steps. Use ordinary scale utilities for deliberate editorial/display layouts.
- Motion: select colour, interaction, disclosure or overlay duration by behaviour. Motion preferences override preset values.
- Structure: flex/grid, placement, overflow and content-specific layout stay ordinary Tailwind utilities. Runtime measurements supplied by Base UI, Sonner, charts or local layout are not design tokens.

A new token needs an owner, a role, and a real variation point. Prefer a shared system role when several primitives need the same decision; create a component token when a preset must vary one component independently. Do not add a root alias merely to shorten a name.

## Tailwind 4.3 authoring

```tsx
<div className="bg-surface-default text-content-default border border-stroke-default rounded-card p-card-inset">
	<p className="text-body">Running copy</p>
	<input className="h-control-md rounded-input text-control bg-control-surface text-control-content" />
</div>
```

`text-body` is font size; `text-content-default` is colour. The `content-` prefix prevents the text/background namespace collisions that names like `text-muted` introduce. Existing status names such as `text-success` remain concise and unambiguous.

Native `@theme inline` aliases keep references in the utility declaration, so `h-control-md` becomes `height: var(--control-size-md)`. Inline does **not** mean a runtime CSS variable is frozen at build time. `@theme static` keeps the complete foundation scale in shipped CSS. Stacking uses Tailwind’s `--z-index-*` namespace; durations use `--transition-duration-*`. Names outside those namespaces do not generate the intended utilities. `tailwind-merge` is configured from the same alias registry, so caller classes override sizes, type, shadows and radii correctly.

Button paint recipes (`button-primary`, `button-brand`, their hover variants) centralize fallback chains and finishes. They contain paint only; layout and behaviour remain ordinary classes. Optional finish tokens use `initial` to activate a semantic fallback at the component, rather than binding a fallback prematurely at an ancestor.

Downstream apps import `@leitware/composables/styles.css`. Tailwind apps additionally import `@leitware/composables/tailwind.css` after Tailwind; it includes semantic colour aliases, component-role aliases, recipes and exact public semantic utilities. Native opacity and responsive/state variants work. Precompiled, framework-independent colour classes are the exact list in `skills/use-composables/references/semantic-utilities.md`; incidental layout classes are not a public CSS bundle.

## Typed customization

```ts
import {
	defineTokens,
	tokenVar,
	definePreset,
	createPresetCSS,
	presetDefinitions,
	type TokenStyle,
} from '@leitware/composables/tokens'

const overrides = defineTokens({
	'--radius-base': '0.75rem',
	'--control-size-md': 'calc(var(--spacing) * 11)',
	'--button-radius': '9999px',
})
const style: TokenStyle = { ...overrides, color: tokenVar('--text-secondary') }

const base = presetDefinitions.find((preset) => preset.name === 'default')!
const product = definePreset(base, {
	light: { ...overrides, '--bg-fill-primary': '#123456' },
	dark: { ...overrides, '--bg-fill-primary': '#abcdef' },
})
const css = createPresetCSS(product, '[data-theme="product"]')
```

Token names, overrides, preset completeness, editor fields, recipe references, utility namespaces and targets are checked by TypeScript. `SemanticUtilityClassName` is an exact category-safe class-name union for application variant maps. Values remain CSS strings so `calc()`, `color-mix()`, gradients and application font stacks remain usable. This is not a type-level CSS parser. JSON imports reject unknown keys, non-string values and declaration-breaking characters. Build validation also rejects missing references and cycles in preset dependency graphs.

For a one-off override, put known custom properties on the component. For a whole subtree, use `createPresetCSS` with a trusted selector: it re-emits the complete dependency graph at that boundary. CSS custom properties resolve where declared; changing a foundation only on an arbitrary child cannot retroactively change a derived token inherited from its parent.

Standalone preset CSS sets the document theme and also includes `[data-preset="name"]` selectors for scoped use. A `.dark` class on the scope or its ancestor selects the dark values. Importing several standalone presets changes the document theme to the last import; use the typed serializer when you need only scoped themes. Components rendered through portals must have the theme applied to their portal container or document root.

## Generation and enforcement

```sh
bun run generate:tokens
bun run test:generated
bun run typecheck
bun run lint
bun run test:tokens
bun run test:token-api
bun run build:css
bun run test:css
bun run test:tokens:browser
```

`generate-tokens.ts` is the only command needed to regenerate palette, baseline semantic CSS, component/system CSS, Tailwind theme and aliases, public utility manifests, the token reference and every preset. Its two implementation stages share the typed inputs. `--check` is read-only and detects drift. The old palette/preset commands remain stage-specific entrypoints for existing development workflows.

Lint parses multiline TypeScript/TSX literals and template fragments. It rejects generic compatibility classes, raw palette colour utilities and unknown token references across internal components, opinionated components, support code, Storybook and the showcase. Local measurement and third-party variable contracts are explicitly listed in the lint rule. Dependency validation checks every preset in both modes. Browser tests verify actual components, caller overrides, scope rebinding and motion preferences; CSS tests compile every public semantic hover variant.

Generated CSS and manifests are never edited directly. Adding a semantic colour requires a registry entry and complete light/dark values in presets. Adding a system/component role requires a typed default, an actual consumer and, where useful, a native utility alias. Run the generator, then the checks above.

## Migration

| Previous spelling                       | Authoring replacement                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| `--radius`                              | `--radius-base`                                                              |
| `--blue-800`, `--neutral-100`           | `--palette-blue-800`, `--palette-neutral-100` in palette implementation only |
| `bg-primary`, `text-primary-foreground` | `bg-fill-primary`, `text-on-fill-primary`                                    |
| `bg-card`, `bg-popover`                 | `bg-surface-default`, `bg-surface-popover`                                   |
| `text-foreground`, `text-default`       | `text-content-default`                                                       |
| `text-muted-foreground`                 | `text-content-muted`                                                         |
| `text-inverse`                          | `text-content-inverse`                                                       |
| `h-(--control-size-md)`                 | `h-control-md`                                                               |
| `text-(length:--body-font-size)`        | `text-body`                                                                  |
| `rounded-(--input-radius)`              | `rounded-input`                                                              |

Palette and radius renames are intentional breaking changes for custom CSS. Generic shadcn variables can be restored by importing `@leitware/composables/compat.css` after the main stylesheet (or after Tailwind for legacy utility generation). They are derived references, not a second configurable theme.

## Design references

The architecture borrows intent rather than copying token vocabularies:

- [Radix Themes colour system](https://www.radix-ui.com/themes/docs/theme/color): separate light/dark and alpha scales, purposeful accent roles, independently usable tokens.
- [Panda token system](https://panda-css.com/docs/theming/tokens): primitive/semantic separation and typed references. Composables keeps CSS as its runtime and Tailwind as its utility layer.
- [Chakra semantic shadows](https://chakra-ui.com/docs/theming/shadows): non-colour semantic decisions can vary with the theme too.
- [Tailwind theme variables](https://tailwindcss.com/docs/theme): native namespaces and `inline` reference resolution. We use that API rather than inventing a separate class grammar.
