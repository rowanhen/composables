# AGENTS.md

Guidance for coding agents working in this repo.

## Shape

Composables is a React 19 component library built on Keyframery and Tailwind CSS v4. Public components live in `src/opinionated/`. Vendored registry code lives in `src/components/keyframery/`. Prefer the opinionated layer for app-facing APIs. The package ships precompiled CSS, so downstream consumers should not need Tailwind config.

## Commands

- Install: `bun install`
- Dev Storybook: `bun run dev` (port 6006)
- Build Storybook: `bun run build:storybook` (output: `showcase/dist`)
- Lint / format / typecheck: `bun run lint`, `bun run format:check`, `bun run typecheck`
- Token drift check: `bun run test:tokens`
- CSS build/output check: `bun run build:css && bun run test:css`
- Install native Git hooks: `bun run hooks:install`

Hooks live in `.githooks/`, not Husky. Pre-commit runs lint, formatting, typecheck, and preset checks. Commit messages must follow Conventional Commits.

## Styles and presets

- `src/styles/composable.css` holds the shared scales, Tailwind color mappings, base styles, and imports.
- `src/styles/presets/*.css` holds the light and dark preset values. For new Keyframery themes, use Create or install the shadcn registry item in a scratch project. Map shared colors to semantic roles and keep shadcn aliases as references to those roles. Sidebar roles use their own values.
- `src/styles/tailwind.css` defines the public semantic utilities. The lint plugin and token editor derive their color metadata from this CSS. Keep utilities scoped to the CSS properties their roles represent.

The package compiles the Default preset and all public utilities into `styles.css` and copies each preset to its public subpath. Tailwind v4 consumers can import `@leitware/composables/tailwind.css` after Tailwind to generate variants of those utilities. Run `bun run test:tokens` and `bun run build:css && bun run test:css` when changing these styles.

## Package Boundary

All public components, including chat, are exported from the package root. Their runtime integrations are regular dependencies so consumers have one component entrypoint.

## Notes

The a11y oxlint plugin is intentionally disabled. Do not add broad a11y churn unless explicitly requested.

## Storybook

The component gallery uses Storybook with React and Vite. Stories live in `showcase/src/stories/` and reuse the existing demo components. Shared styles, fonts, theme controls, and the toaster are configured in `.storybook/preview.tsx`; aliases and Tailwind are configured in `.storybook/main.ts`. Add stories directly rather than generating routes or maintaining a separate navigation registry.

The build and deploy workflows call `bun run build:storybook` directly.

The gallery's only public deployment is `https://composables.leitware.com`, hosted by the `composables-showcase` Cloudflare Pages project. Keep this project and its custom domain. GitHub Pages is disabled; the Cloudflare Bulk Redirect list `composables_canonical_domain` redirects Pages aliases (including deployment subdomains) to the custom domain. `scripts/prepare-storybook.ts` versions stable runtime script URLs and writes cache headers after the static build.
