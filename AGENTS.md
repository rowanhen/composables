# AGENTS.md

Guidance for coding agents working in this repo.

## Shape

Composables is a React component library built on Base UI and Tailwind CSS v4. Public components live in `src/opinionated/`; low-level primitives live in `src/_internal/`. Prefer the opinionated layer for app-facing APIs. The package ships precompiled CSS, so downstream consumers should not need Tailwind config.

## Commands

- Install: `bun install`
- Dev showcase: `bun run dev`
- Lint / format / typecheck: `bun run lint`, `bun run format:check`, `bun run typecheck`
- CSS checks: `bun scripts/generate-css.ts --check`, `bun scripts/generate-preset-css.ts --check`
- AI rules check: `bun scripts/generate-rules.ts --check`
- Token drift check: `bun run test:tokens`
- CSS build/output check: `bun run build:css && bun run test:css`
- Install native Git hooks: `bun run hooks:install`

Hooks live in `.githooks/`, not Husky. Pre-commit runs lint, formatting, typecheck, generated CSS checks, and token drift checks. Commit messages must follow Conventional Commits.

## Tokens

Core token files:

- Palette source: `scripts/palette.ts` -> `src/styles/tokens/palette.css`
- Semantic registry: `src/styles/tokens/registry.ts`
- Semantic runtime CSS: `src/styles/tokens/semantic.css`
- Tailwind aliases/theme: `src/styles/tokens/tailwind-theme.css`
- Component tokens: `src/styles/tokens/components.css`
- Preset data: `src/styles/presets-data/*.ts` -> `src/styles/presets/*.css`

`src/styles/tokens/registry.ts` is the metadata hub for semantic colors, shadcn compatibility aliases, and Tailwind color aliases. The token editor and `scripts/check-token-system.ts` both depend on it.

When adding or renaming a semantic color token, update the registry, `semantic.css`, every preset data file, and `tailwind-theme.css` if a Tailwind class should exist. Then run:

```bash
bun scripts/generate-preset-css.ts
bun run test:tokens
```

Do not add one-off `--color-*` aliases directly to `tailwind-theme.css`; register them in `registry.ts` so drift checks can validate them.

## Tailwind Utilities

Tailwind color utilities come from `--color-*` variables. A registered suffix such as `success` is valid with color prefixes like `bg-success`, `text-success`, `border-success`, `ring-success`, `outline-success`, `fill-success`, and `stroke-success`.

Important semantic suffix groups are:

- Status: `success`, `warning`, `critical`, `info`, `emphasis`
- Brands: `brand`, `brand-2`, `brand-3`, `brand-4`, `brand-5`
- Surfaces: `surface-success`, `surface-warning`, `surface-critical`, `surface-info`, `surface-emphasis`, `surface-brand`, `surface-brand-2` through `surface-brand-5`
- Icons: `icon-success`, `icon-warning`, `icon-critical`, `icon-info`, `icon-emphasis`, `icon-brand`, `icon-brand-2` through `icon-brand-5`
- Borders: `stroke-critical`, `stroke-success`, `stroke-warning`, `stroke-info`, `stroke-emphasis`, `stroke-brand`, `stroke-brand-2` through `stroke-brand-5`
- Layout/compat: `page`, `stroke`, `field`, `focus`, `danger`, `sidebar`, `sidebar-*`, shadcn-compatible aliases, and `chart-1` through `chart-5`

For the exact current list, inspect `tailwindColorAliases` in `src/styles/tokens/registry.ts`. `bun run test:tokens` scans `src/` and `showcase/src/` for semantic-looking color utilities and fails on unregistered aliases.

Other Tailwind theme utilities in `tailwind-theme.css` include tokenized type sizes, tracking, fonts, radius, shadows, z-index, motion, opacity, and container widths. Prefer these over arbitrary Tailwind values.

## Presets

Current presets are registered in `src/styles/presets-data/index.ts`. Preset CSS is generated; add or update preset data in `src/styles/presets-data/`, register it once in `presetDefinitions`, and run `bun run generate:presets` instead of hand-editing `src/styles/presets/*.css`.

## AI Rules

`rules/composables.md` is generated for AI assistants and rule-file workflows. It summarizes package import rules, optional dependencies, public component exports, and the `/ai` entrypoint. Regenerate it with `bun run generate:rules` after changing `README.md`, `package.json`, `src/index.ts`, or `src/opinionated/ai/*`.

## Notes

The a11y oxlint plugin is intentionally disabled. Do not add broad a11y churn unless explicitly requested.
