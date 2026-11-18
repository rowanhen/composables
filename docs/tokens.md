# Authoring tokens

The authored source is one exported variable: [`tokens`](../src/styles/tokens/definitions.ts). Each entry contains its name, purpose, group, Tailwind registrations, guaranteed utility classes and complete values for every theme. The reference and editor show the resulting utility class names, including native scale utilities. `bun run generate:tokens` turns that record into CSS and the [full searchable reference](token-reference.md). The live TokenConfigPanel reads the same record and exposes every token.

There are no authored foundations, system defaults, component defaults, palette indirections or preset overrides to reconcile. The category field groups entries for discovery; it does not establish inheritance. `themes.ts` holds theme names and descriptions, not token values. The small registry/model modules are computed views of the record, not additional registration points. Merge metadata is generated as a small separate module so ordinary components do not bundle the theme catalogue.

## Names that describe a job

| Family                   | Naming                                                   | Example                                       |
| ------------------------ | -------------------------------------------------------- | --------------------------------------------- |
| Canvas and surfaces      | `--bg-{role}`                                            | `--bg-surface-popover`                        |
| Strong fills             | `--bg-fill-{intent}[-{state}]`                           | `--bg-fill-primary-hover`                     |
| Text                     | `--text-{role}`                                          | `--text-on-fill-primary`                      |
| Icon foreground          | `--icon-{intent}`                                        | `--icon-warning`                              |
| Boundary/focus           | `--border-{role}`                                        | `--border-focus`                              |
| Component property       | `--{component}[-{variant}]-{property}[-{state or size}]` | `--button-brand-border-color-hover`           |
| Shared controls          | `--control-{property}[-{state or size}]`                 | `--control-background-disabled`               |
| Native scales            | Tailwind namespace and named step                        | `--radius-lg`, `--text-sm`, `--z-index-modal` |
| Categorical chart series | `--chart-{position}`                                     | `--chart-1`                                   |

Use one `brand` intent for brand identity. There are no `brand-2` through `brand-5` tokens or variants. Use `primary`/`secondary` for action hierarchy, `info`/`success`/`warning`/`critical` for status, and `emphasis` for non-status highlighting. Do not disguise another arbitrary brand slot with a nicer adjective. Chart numbers describe positional series identity, which is a different contract.

Component properties spell out `background`, `foreground`, and `border-color`; state follows the property. Shared semantic `bg`, `text`, `icon` and `border` families remain deliberate, documented namespaces. A text colour is distinct from a font-size token: `text-content-default` versus `text-body`.

## Values are direct

A token's `values` contains all eight named themes. A string applies in both modes; a pair is `[light, dark]`. Values are ordinary concrete CSS: lengths, colours, shadows, gradients, timing functions and so on. No `var()` dependencies, `initial` fallback sentinels, spreads from other themes, or derived base factors belong in the authored record. The generator rejects missing modes, unknown themes, dependencies and duplicate registrations.

For example, the `--card-background` entry owns:

```ts
{
  category: 'component',
  group: 'card',
  description: 'Card root background.',
  tailwind: ['--color-card-surface'],
  utilities: {},
  compat: [],
  values: {
    default: ['#ffffff', '#141414'],
    // Supply concrete values for each other named theme here too.
  },
}
```

This is a shape example, not a complete valid entry. The real entry includes every theme. Its one colocated Tailwind registration generates `bg-card-surface`; there is no second alias file to edit. `utilities` can additionally guarantee exact framework-independent classes, such as a semantic colour or a property Tailwind does not register natively. `compat` is only for the optional legacy bridge and should normally be empty.

Repeated values are intentional: equality is not a dependency. Editing `--card-radius` changes cards; it does not silently change dialogs. Editing `--radius-lg` changes uses of that scale step, not independently declared component roles. The previous base size, shadow factors and transition shorthand knobs have been removed because they would be misleading in this model. Tailwind's `--spacing` remains the unit used by numeric layout utilities such as `p-4`.

## Component coverage and behaviour

Components need a consistent decision about ownership, not identical lists of unused knobs.

| Family                                                        | Contract                                                                                                                                                                                     |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Card                                                          | Own background, content, description, boundary colour/width, radius, padding, shadow and colour-transition duration; shared body/title typography.                                           |
| Accordion                                                     | Own background, foreground, boundary, radius, padding, shadow and disclosure duration; shared body typography and focus treatment. Its open/closed keyframes implement disclosure mechanics. |
| Button                                                        | Own dimensions, radius, typography, gap, variant paint, images, shadows and hover/active finishes; shared focus and interaction policy.                                                      |
| Input, Textarea, Select, Combobox, InputGroup                 | Shared `control-*` foreground/background, disabled/invalid/boundary states, dimensions and typography; input radius and appropriate component geometry.                                      |
| Checkbox, RadioGroup                                          | Shared choice dimensions and boundary roles; checkbox radius, icon dimensions and checkmark stroke.                                                                                          |
| Switch, Slider, Progress                                      | Shared intent/track colours with component dimensions and explicit thumb/on-state properties where needed.                                                                                   |
| Alert, Badge                                                  | Semantic status/brand background, text, icon and boundary roles; alert boundary/accent widths and badge radius.                                                                              |
| Dialog, AlertDialog, Sheet, Popover, HoverCard, Tooltip, Menu | Shared floating-surface, boundary, elevation and overlay-motion roles; dialog dimensions/radius/boundary, menu hover paint and tooltip foreground/background.                                |
| Tabs                                                          | List/tab shape and dimensions, list/indicator shadow, indicator boundary and shared disclosure/colour motion.                                                                                |
| Sidebar                                                       | Dedicated navigation background, foreground, action, selection, boundary and focus colours.                                                                                                  |
| LayerCard, Flow, ClipboardText, Kbd                           | Dedicated shape, spacing and dimensions, plus elevation/canvas/connector/type roles appropriate to the component.                                                                            |
| Typography, Label                                             | Shared body/title/heading roles and type scales; label size, colour and transform; explicit hero/brand tracking.                                                                             |
| Layout, Stack, Grid, Container, Spacer, AspectRatio           | Structural layout and spacing utilities. No fictitious surface, shadow or animation tokens.                                                                                                  |
| Other composition wrappers                                    | Reuse the contracts of the controls and surfaces they compose. Add a dedicated property only when it is an intentional independent customization point.                                      |

Card does not receive an accordion-style open/close animation simply to make token counts match. A duration token controls a transition that the component actually uses. Reduced-motion and explicit motion policies override those durations, including scoped themes.

When introducing a new independent visual decision, add the definition, consume it in the component and test that changing it affects the rendered property. Do not add catalogue-only knobs. Review shared controls as a family when changing their common contract.

## Adding or changing a token

1. Edit its entry in `src/styles/tokens/definitions.ts`. Include a precise purpose, every theme's values and its utility registration in that same entry.
2. Use the utility in the owning component. Structural classes remain ordinary Tailwind: `flex`, `grid`, `gap-4`, responsive variants and measured layouts.
3. Run `bun run generate:tokens`. This writes complete theme CSS, the Tailwind adapter, precompiled semantic classes, optional compatibility CSS and reference tables.
4. Check the token in the catalogue and test the component's computed property. Run the checks below.

Adding a theme means adding its metadata to `themes.ts` and a value for it to every token. Typecheck and generator validation report missing values. No new preset implementation file is required. `presets-data` is a derived compatibility view for existing imports.

## Enforced authoring rules

`bun run lint` runs Oxlint and both token/utility checks across internal/public components, hooks, helpers, stories and Storybook configuration. CI and pre-commit treat violations as failures. The old advisory arbitrary-value job has been removed.

| Rejected                                                               | Accepted replacement                                                                  |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `bg-blue-500`, `text-rose-700`                                         | Semantic intent classes such as `bg-fill-critical`, `text-critical`                   |
| `bg-[#123456]`, literal `rgb(...)`, `hsl(...)`, `oklch(...)`           | A value in `definitions.ts`, consumed through its utility                             |
| `style={{ color: 'red' }}` or `style={{ borderRadius: 7 }}`            | Semantic utilities or `tokenVar('--card-radius')`                                     |
| `rounded-[7px]`, `text-[17px]`, `tracking-[-0.02em]`                   | A named appearance token and utility                                                  |
| `made-up`, `hover:made-up`, misspelled utility names                   | A class accepted by the installed Tailwind compiler using the real package stylesheet |
| Constructed class strings such as `` `bg-${intent}` ``                 | A static variant map with complete class names                                        |
| Unknown CSS variables, primitive palette variables, legacy `--primary` | Exact `TokenName` references                                                          |
| Wrong semantic property such as `bg-content-default`                   | A background role such as `bg-surface-default`                                        |

Checks parse TypeScript/TSX, including CSS stylesheets, `className`, `cn`/`cva` calls, variants and shared class constants. Variant labels and conditions are not interpreted as classes. Dynamic caller `className` props remain supported; lint cannot validate code outside this repository. Runtime theme JSON is validated for exact token names, complete modes and safe declaration strings before serialization.

Structural arbitrary grid/measurement expressions and token-backed arbitrary values are allowed. `inherit`, `currentColor` and transparent styling are valid CSS semantics. Group/peer and dark markers are structural Tailwind contracts. The AI Markdown components retain `not-prose` as an explicit integration marker. SVG illustration assets are content, not UI styling; they are outside the TSX style scan. These bounded exceptions do not authorize raw component colours or an unrestricted classname allowlist.

Lint uses the installed Tailwind design system to validate candidates. Its adapter uses an internal Tailwind API; dependency updates must run the negative fixtures and downstream compilation tests. There is no handwritten inventory of all valid Tailwind classes to keep in sync.

## Consumption and customization

Import `@leitware/composables/styles.css` for precompiled component styling. Tailwind v4 consumers additionally import `@leitware/composables/tailwind.css` after Tailwind to generate their own responsive/state/opacity variants. Guaranteed framework-independent classes are listed in the [utility manifest](../skills/use-composables/references/semantic-utilities.md).

```ts
import { themeValues, createPresetCSS, tokenVar } from '@leitware/composables/tokens'

const light = themeValues('default', 'light')
const dark = themeValues('default', 'dark')
light['--card-radius'] = '1rem'
dark['--card-radius'] = '1rem'
const css = createPresetCSS({ light, dark }, '[data-theme="product"]')
const style = { borderRadius: tokenVar('--card-radius') }
```

`themeValues` returns a fresh complete map. `TokenName` is the exact inventory; `PresetTokens` requires every token and `TokenOverrides` is a partial map for caller customization. `definePreset` remains a convenience for copying a complete theme with explicit changes; authored themes never use it. Nested themes write complete maps and cannot inherit another theme's missing settings.

## Checks and migration

Run `bun run lint`, `bun run format:check`, `bun run typecheck`, `bun run test:generated`, `bun run test:tokens`, `bun run test:token-api`, `bun run build:css`, `bun run test:css`, and `bun run test:tokens:browser`. Run `bun run generate:rules` after public API/README changes. Browser tests require Chromium (`bunx playwright install chromium`).

This is a breaking token migration. Remove numbered brand variants and choose a meaningful existing intent. Replace component `*-bg`/`*-text`/`*-fg` with the explicit background/foreground names in the reference, and `*-hover-border`/`*-hover-shadow` with property-before-state names. The raw palette API and unused base-factor knobs are removed. Do not copy the old dependency chain into the new record: set each intended component/shared value explicitly. The token editor supports search, both modes, per-theme reset and complete JSON import/export; it no longer presents sliders for obsolete base factors.
