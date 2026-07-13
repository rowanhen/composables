---
name: use-composables
description: Build, style, theme, or review React interfaces that consume @leitware/composables. Use when adding Composables components, configuring styles or presets, overriding semantic tokens for light and dark modes, choosing semantic utility classes, resolving optional peer dependencies, or checking consumer code for design-system code smells.
---

# Use Composables

Treat the package's public components, semantic CSS variables, documented semantic classes, and presets as the design-system API. Keep palette primitives, Tailwind adapter variables, and internal components behind that boundary.

## Follow the consumer workflow

1. Inspect the installed package version and the consuming application's existing root CSS, theme selector, package manager, and verification scripts.
2. Import `@leitware/composables/styles.css` once in the root CSS entrypoint.
3. Import at most one `@leitware/composables/presets/<name>.css` after `styles.css` when selecting a non-default preset.
4. Read the generated [public API manifest](references/public-api.md) before importing components. Import normal components, values, and types from `@leitware/composables`; import AI components only from `/ai`. Never import from `src/`, `_internal/`, or unpublished paths.
5. Prefer a public component's props and variants before adding consumer styling. The manifest proves that a name is public, but it does not document props; inspect the installed package source or TypeScript declarations before using an unfamiliar component API.
6. Use documented semantic classes for colour roles. Read [semantic-styling.md](references/semantic-styling.md) before adding or changing theme values, colour classes, token overrides, or Tailwind variants. Consult the generated [semantic utility manifest](references/semantic-utilities.md) as the exact base-class allowlist.
7. Add application-specific token overrides after all package imports in the designated root theme CSS. Define light values in `:root` and dark values in `.dark`, or preserve the application's established equivalent selector.
8. Read [optional-dependencies.md](references/optional-dependencies.md) before using the AI entrypoint, preset fonts, or when resolving a missing-module error.
9. Run the consuming repository's relevant lint, typecheck, test, and build scripts. Run any package-provided Composables or semantic-token verification command when available. Report commands that could not be found or run.

## Enforce the design-system boundary

- Keep raw colour literals inside explicitly designated theme CSS only, where they assign semantic custom properties.
- Reject raw colours in components, CSS modules, inline styles, and arbitrary utility values.
- Reject primitive palette classes and variables such as `bg-blue-500` and `var(--blue-800)`.
- Reject direct use of internal Tailwind adapter variables such as `--color-*`.
- Reject direct semantic-variable utility syntax when a documented class exists, such as `bg-[var(--bg-surface-success)]`.
- Preserve semantic intent: use a surface role for backgrounds, a text role for text, an icon role for icons, and a stroke role for border colour. Do not infer public ring or outline colour utilities.
- Do not invent a raw value, primitive class, direct-variable class, or misleading existing role when the system lacks the needed semantic role. Report the missing role and propose a reusable semantic token instead.

## Review changes

Check that the result:

- imports styles once and no more than one preset;
- imports normal values and types from the root entrypoint and AI components from `/ai`;
- keeps light and dark overrides together at the theme boundary;
- uses documented semantic roles consistently across states;
- installs optional peers only for AI features or preset fonts that require them;
- introduces no design-system escape hatch outside an intentional theme override;
- passes the consuming repository's available verification commands.
