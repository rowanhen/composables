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

Hooks live in `.githooks/`, not Husky. Pre-commit runs lint, formatting, typecheck, generated CSS/rules checks, and token drift checks. Commit messages must follow Conventional Commits.

## Tokens

Core token files:

- Palette source: `scripts/palette.ts` -> `src/styles/tokens/palette.css`
- Semantic registry: `src/styles/tokens/registry.ts`
- Semantic runtime CSS: `src/styles/tokens/semantic.css`
- Internal Tailwind colour aliases (generated): `src/styles/tokens/tailwind-color-adapter.css`
- Public Tailwind utilities (generated): `src/styles/tokens/tailwind-public-utilities.css`
- Framework-independent public utilities (generated): `src/styles/tokens/semantic-utilities.css`
- Non-colour Tailwind theme: `src/styles/tokens/tailwind-theme.css`
- Component tokens: `src/styles/tokens/components.css`
- Preset data: `src/styles/presets-data/*.ts` -> `src/styles/presets/*.css`

`src/styles/tokens/registry.ts` is the metadata hub for semantic colours, derived shadcn compatibility aliases, internal Tailwind colour aliases, and the exact category-safe `publicSemanticUtilities` contract. The token editor, CSS generators, skill manifest, and `scripts/check-token-system.ts` depend on it.

When adding or renaming a semantic colour token, update the registry, `semantic.css`, and every preset data file. Then regenerate both token and preset outputs and run their checks:

```bash
bun scripts/generate-css.ts
bun scripts/generate-preset-css.ts
bun scripts/generate-css.ts --check
bun scripts/generate-preset-css.ts --check
bun run test:tokens
```

Never hand-edit generated token utilities, adapters, manifests, or `src/styles/presets/*.css`. Do not add one-off `--color-*` aliases to `tailwind-theme.css`; register justified internal aliases in `registry.ts` so generation and drift checks remain authoritative.

Preset data owns canonical semantic tokens and independent `--sidebar-*` component roles. shadcn compatibility aliases are derived references only: do not define or override them independently in preset data.

## Tailwind Utilities

Internal library code can use the `--color-*` aliases in `tailwindColorAliases` with Tailwind colour property combinations. That adapter exists for local component authoring and shadcn compatibility; it is not the downstream semantic utility contract.

The public contract is the exact `publicSemanticUtilities` allowlist in `registry.ts`, also generated into the consumer skill manifest. It deliberately maps categories only to suitable properties: backgrounds to `bg-*`, text to `text-*`, icons to `text-icon-*`/`fill-icon-*`/`stroke-icon-*`, borders to `border-stroke-*`, and charts to `fill-chart-*`/`stroke-chart-*`. Do not infer other public token/property combinations.

Downstream consumers import `@leitware/composables/styles.css`; no Tailwind setup is required. Tailwind v4 consumers may additionally import `@leitware/composables/tailwind.css` after Tailwind to generate state or responsive variants of those exact public utilities.

Other Tailwind theme utilities in `tailwind-theme.css` include tokenized type sizes, tracking, fonts, radius, shadows, z-index, motion, opacity, and container widths. Prefer these over arbitrary Tailwind values.

## Presets

Current presets are registered in `src/styles/presets-data/index.ts`. Preset CSS is generated; add or update preset data in `src/styles/presets-data/`, register it once in `presetDefinitions`, and run `bun run generate:presets` instead of hand-editing `src/styles/presets/*.css`.

## Package Boundary

All non-AI opinionated components are exported from the package root. Their runtime integrations are regular dependencies so consumers have one component entrypoint. AI components remain isolated behind `/ai` with optional peers.

## AI Rules and Skill Manifests

`bun run generate:rules` generates both `rules/composables.md` and `skills/use-composables/references/public-api.md`. They cover package imports, optional dependencies, public exports, and the `/ai` entrypoint. Regenerate them after changing `README.md`, `package.json` exports, `src/index.ts`, or `src/opinionated/ai/*`. The semantic utility skill manifest is generated separately by `bun scripts/generate-css.ts` from `publicSemanticUtilities`.

## Notes

The a11y oxlint plugin is intentionally disabled. Do not add broad a11y churn unless explicitly requested.
