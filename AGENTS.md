# AGENTS.md

Guidance for coding agents working in this repo.

## Shape

Composables is a React component library built on Base UI and Tailwind CSS v4. Public components live in `src/opinionated/`; low-level primitives live in `src/_internal/`. Prefer the opinionated layer for app-facing APIs. The package ships precompiled CSS, so downstream consumers should not need Tailwind config.

## Commands

- Install: `bun install`
- Dev Storybook: `bun run dev` (port 6006)
- Build Storybook: `bun run build:storybook` (output: `showcase/dist`)
- Lint / format / typecheck: `bun run lint`, `bun run format:check`, `bun run typecheck`
- CSS checks: `bun run test:generated`
- AI rules check: `bun scripts/generate-rules.ts --check`
- Token drift check: `bun run test:tokens`
- CSS build/output check: `bun run build:css && bun run test:css`
- Install native Git hooks: `bun run hooks:install`

Hooks live in `.githooks/`, not Husky. Pre-commit runs lint, formatting, typecheck, generated CSS/rules checks, and token drift checks. Commit messages must follow Conventional Commits.

## Tokens and Tailwind

Read `docs/tokens.md` before changing the token model. `docs/token-reference.md` is the generated inventory. Sources live in `src/styles/tokens/`: palette-data.ts, foundations.ts, system-tokens.ts, component-tokens.ts, registry.ts, utility-aliases.ts and recipes.ts. Preset values live in `src/styles/presets-data/`.

Run `bun run generate:tokens` for **all** token CSS, presets and references. `bun run test:generated` verifies drift. Never hand-edit generated CSS or manifests. `default.ts` owns baseline semantic colours; there is no handwritten semantic.css source.

Use exact `TokenName`, `TokenOverrides` and `PresetTokens` types. Complete presets require every semantic/sidebar colour in both modes. Partial fragments use `TokenOverrides`. The runtime editor and generator share `createPresetCSS`; preserve complete dependency rebinding at theme boundaries.

Internal components use semantic classes and native role utilities (`text-body`, `h-control-md`, `rounded-input`). Primitive palette classes, unknown variables and generic compatibility aliases are rejected by `scripts/lint-tokens.ts`. Shared controls use `control-*` roles. Button paint lives in typed recipes; structural layout stays Tailwind. Add legitimate runtime measurement contracts explicitly to lint's local-variable list.

The public framework-independent colour utility contract is `publicSemanticUtilities` in registry.ts. Downstream consumers import styles.css; Tailwind v4 consumers additionally import tailwind.css for variants, opacity modifiers, native component roles and paint recipes. Keep native aliases collision-free and update tailwind-merge namespace coverage if a new utility category needs it.

Required checks: lint, format:check, typecheck, test:generated, test:tokens, test:token-api, build:css, test:css and test:tokens:browser. Browser tests need `bunx playwright install chromium` once locally. Update documentation and run generate:rules after changing the public API or README.

## Package Boundary

All non-AI opinionated components are exported from the package root. Their runtime integrations are regular dependencies so consumers have one component entrypoint. AI components remain isolated behind `/ai` with optional peers.

## AI Rules and Skill Manifests

`bun run generate:rules` generates both `rules/composables.md` and `skills/use-composables/references/public-api.md`. They cover package imports, optional dependencies, public exports, and the `/ai` entrypoint. Regenerate them after changing `README.md`, `package.json` exports, `src/index.ts`, or `src/opinionated/ai/*`. The semantic utility skill manifest is generated separately by `bun scripts/generate-tokens.ts` from `publicSemanticUtilities`.

## Notes

The a11y oxlint plugin is intentionally disabled. Do not add broad a11y churn unless explicitly requested.

## Storybook

The component gallery uses Storybook with React and Vite. Stories live in `showcase/src/stories/` and reuse the existing demo components. Shared styles, fonts, theme controls, and the toaster are configured in `.storybook/preview.tsx`; aliases and Tailwind are configured in `.storybook/main.ts`. Add stories directly rather than generating routes or maintaining a separate navigation registry.

`showcase/vite.config.ts` is only a compatibility bridge for existing build/deploy commands: `bunx vite build showcase` delegates to `bun run build:storybook`. Keep that entrypoint working while workflows still use it.

The gallery's only public deployment is `https://composables.leitware.com`, hosted by the `composables-showcase` Cloudflare Pages project. Keep this project and its custom domain. GitHub Pages is disabled; the Cloudflare Bulk Redirect list `composables_canonical_domain` redirects Pages aliases (including deployment subdomains) to the custom domain. `scripts/prepare-storybook.ts` versions stable runtime script URLs and writes cache headers after the static build.
