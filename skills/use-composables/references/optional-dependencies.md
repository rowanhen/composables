# Optional dependencies reference

Use this reference before adding AI components, loading preset fonts, or resolving a missing-module error. Install only the peers needed by the selected optional surface, using the consuming repository's package manager.

## Component dependencies

All non-AI components—including Calendar, Carousel, DropZone, Resizable, Toaster, ThemeInjector, and TokenConfigPanel—are imported from `@leitware/composables`. Their runtime integrations are installed with the package and require no feature subpath or separate peer installation.

AI components are the deliberate exception. Import them from `@leitware/composables/ai` and install the optional peers required by that entrypoint: `ai`, `shiki`, `streamdown`, `@streamdown/cjk`, `@streamdown/code`, `@streamdown/math`, `@streamdown/mermaid`, `use-stick-to-bottom`, `nanoid`, `@radix-ui/react-use-controllable-state`, `cmdk`, and `motion`. Do not install this dependency set in applications that do not import AI components.

## Preset fonts

Core styles render with system fallbacks when optional fonts are not installed or loaded. To reproduce a preset's intended typography, install only its packages and load the listed entrypoints before the package styles. In a CSS entrypoint use `@import`; in a JavaScript or TypeScript application entrypoint use the same package paths with side-effect `import` statements.

| Preset     | Font packages                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Default    | `@fontsource-variable/inter`, `@fontsource-variable/bricolage-grotesque`                                                              |
| Brutalist  | `@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`                                                           |
| Signal Pop | `@fontsource/ibm-plex-sans`, `@fontsource-variable/space-grotesk`, `@fontsource-variable/jetbrains-mono`, `@fontsource/ibm-plex-mono` |

Inspect the selected preset and current package documentation for its exact font requirements before installing. Do not install every optional font package pre-emptively.

### Default font loading

```css
@import '@fontsource-variable/inter';
@import '@fontsource-variable/bricolage-grotesque';
@import '@leitware/composables/styles.css';
```

The variable entrypoints contain the weight ranges used by the preset.

### Brutalist font loading

```css
@import '@fontsource-variable/space-grotesk';
@import '@fontsource-variable/jetbrains-mono';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

### Signal Pop font loading

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

The explicit IBM Plex imports load the normal weights used by common body, control, and brand text. The Space Grotesk and JetBrains Mono variable entrypoints cover their preset weight ranges. Load italic entrypoints separately only when the consuming interface actually uses italics.

Equivalent application-entry imports are valid:

```ts
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource-variable/space-grotesk'
```

## Resolve missing modules

1. Identify the imported public component or subpath that reaches the missing package.
2. Confirm that the feature is actually used and cannot be removed or replaced by a core component.
3. Check the installed `@leitware/composables` version's peer dependency range.
4. Install a compatible version with the application's existing package manager.
5. Re-run typecheck and the relevant build or test command.

Do not import unpublished source paths to bypass an optional dependency. Do not move an optional package into application production dependencies unless the application actually ships the corresponding feature.
