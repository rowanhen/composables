# Semantic styling reference

Use this reference when choosing semantic classes, applying a preset, overriding tokens, or reviewing styling.

## Import order

Import the base stylesheet once from the application's root CSS:

```css
@import '@leitware/composables/styles.css';
```

Select no more than one optional preset and place it immediately after the base import:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';
```

Place application overrides after both imports. Do not copy package CSS into the application and do not require downstream Tailwind configuration merely to render package components.

## Use semantic variants with Tailwind v4

Base classes in the generated utility manifest work without Tailwind. A Tailwind v4 application that needs state, responsive, group, or other variants of those exact classes must use this import order:

```css
@import 'tailwindcss';
@import '@leitware/composables/tailwind.css';
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/signal-pop.css'; /* Optional */
```

With `tailwind.css` present, variant-prefixed forms of an exact manifest class are permitted:

```tsx
<div className="bg-surface-success hover:bg-surface-hover md:text-success" />
```

The suffix after all variants must exactly match a manifest class. The adapter does not make inferred combinations such as `ring-stroke-focus`, `outline-stroke-focus`, or `bg-icon-success` public. Without `tailwind.css`, use only the shipped unprefixed classes; do not assume Tailwind can generate their variants.

## Override semantic roles

Treat the root theme stylesheet as the only raw-value boundary. Assign application values to public semantic variables in both modes when the value should change with the theme:

```css
@import '@leitware/composables/styles.css';
@import '@leitware/composables/presets/brutalist.css';

:root {
	--bg-fill-brand: #4f46e5;
	--border-focus: #3730a3;
}

.dark {
	--bg-fill-brand: #818cf8;
	--border-focus: #a5b4fc;
}
```

Preserve an established dark-mode selector when the application intentionally uses an equivalent such as `[data-theme='dark']`. Keep overrides after package imports so normal CSS cascade order applies.

Override semantic roles, not primitive palette values or Tailwind adapter aliases:

```css
/* Correct theme-boundary override */
:root {
	--bg-surface-brand: oklch(0.95 0.04 280);
}

/* Incorrect: modifies a palette primitive */
:root {
	--violet-200: oklch(0.95 0.04 280);
}

/* Incorrect: targets the Tailwind adapter */
:root {
	--color-surface-brand: oklch(0.95 0.04 280);
}
```

## Choose a semantic class

Use the package's generated [semantic utility manifest](semantic-utilities.md) as the exact class allowlist. Do not infer that every token supports every CSS property. A class name can be syntactically plausible while still being outside the public contract.

Choose by role:

| Intent                    | Prefer                                                                        | Avoid                                                    |
| ------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| Page or component surface | documented `bg-*` or `bg-surface-*` class                                     | `bg-white`, `bg-neutral-100`, `bg-[#fff]`                |
| Text content or status    | documented `text-*` class                                                     | `text-red-600`, `text-[var(--text-critical)]`            |
| Icon colour               | documented `text-icon-*`, `fill-icon-*`, or `stroke-icon-*` class             | a palette class or raw SVG colour                        |
| Border colour             | documented `border-stroke-*` class plus consumer-owned border width/style     | `border-gray-300`, raw colour, unrelated text token      |
| Ring or outline colour    | report a missing public utility; prefer an existing component focus treatment | inferred `ring-stroke-*` or `outline-stroke-*` class     |
| Chart series              | documented `fill-chart-*` or `stroke-chart-*` class                           | inferred `text-chart-*` or an arbitrary palette sequence |

Common semantic families include:

- surfaces and fills: default, muted, inverse, transparent, status, emphasis, and brand roles;
- content: default, secondary, muted, disabled, inverse, link, status, emphasis, and brand roles;
- icons: default, secondary, disabled, inverse, status, emphasis, and brand roles;
- border colours: `border-stroke-*` roles for default, secondary, input, tertiary, disabled, inverse, focus, status, emphasis, and brand;
- charts: numbered `fill-chart-*` and `stroke-chart-*` roles.

The current public manifest does not expose ring-colour or outline-colour classes. Treat that as a design-system gap when a component's existing focus treatment is insufficient; do not translate `--border-focus` into an invented ring or outline utility.

Use status roles only for their meaning. Do not use `critical` merely because it happens to be red or `success` merely because it happens to be green. Use brand roles for branded emphasis rather than as general-purpose decoration.

## Distinguish semantic classes from Tailwind internals

Write the concise semantic class exposed by the package:

```tsx
<div className="bg-surface-success text-success border-stroke-success" />
```

Do not spell the same intent through an arbitrary value or adapter variable:

```tsx
<div className="bg-[var(--bg-surface-success)] text-[--text-success]" />
```

The consuming application may use its own layout, responsive, and non-colour utilities. Treat `--color-*` aliases and incidental Tailwind output found in package CSS as implementation details, not public tokens.

## Handle missing roles

Stop and report a design-system gap when no documented role accurately expresses the intent. Include:

1. the UI purpose and interaction state;
2. why existing roles are semantically wrong;
3. a proposed reusable role name and affected CSS property;
4. whether both light and dark values are needed;
5. components or consumers likely to share the role.

Do not hide the gap with a one-off literal, a primitive palette class, or a misleading semantic token.
