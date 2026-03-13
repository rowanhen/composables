# @mrshmllw/smores-internal-react

An internal components library for internal tool link applications at Marshmallow.

## Installation

This is a private npm package. To install it, you need to be part of the Marshmallow organization and have access to the private npm registry.

```bash
npm install @mrshmllw/smores-internal-react
```

## Styles Setup (Required)

This library ships with pre-processed CSS that includes all Tailwind utilities, theme variables, and animations. **You must import the styles in your application's entry point:**

```typescript
// In your main entry file (e.g., main.tsx, App.tsx, or _app.tsx)
import '@mrshmllw/smores-internal-react/styles.css'

// Import BEFORE your own CSS if you want to override theme variables
import './index.css' // Your app's CSS
```

### What's included in styles.css

The CSS file contains:
- All Tailwind CSS utilities used by the components
- Theme CSS variables (colors, spacing, border-radius, etc.)
- Dark mode support via `.dark` class
- Animation utilities from tw-animate-css
- Base styles and resets

### Theme Customisation

The library uses CSS custom properties for theming. You can override these in your own CSS:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

### Do I need Tailwind CSS in my project?

**No!** The CSS is fully pre-processed during the library build. You don't need to:
- Install Tailwind CSS
- Configure a `tailwind.config.js`
- Set up PostCSS
- Add content paths to scan the library

The library handles all CSS processing internally and outputs ready-to-use CSS.

### Using Semantic Tokens with Tailwind

The library provides CSS variables for all semantic tokens. To use them as Tailwind utilities:

**Option 1: Copy the example file (recommended)**

Copy `src/tailwind-theme.example.css` from this package to your project and import it:

```css
/* Your app's main CSS file */
@import "./smores-theme.css"; /* copied from tailwind-theme.example.css */
```

This gives you all utilities like `bg-fill-brand`, `text-type-brand`, `text-icon-brand`, `border-stroke-brand`, etc.

Remove any tokens you don't need to reduce bundle size.

**Option 2: Add only what you need**

```css
@import "@mrshmllw/smores-internal-react/styles.css";

@theme inline {
  --color-fill-brand: var(--bg-fill-brand);       /* bg-fill-brand */
  --color-type-brand: var(--text-brand);          /* text-type-brand */
  --color-icon-brand: var(--icon-brand);          /* text-icon-brand, bg-icon-brand */
  --color-stroke-brand: var(--border-brand);      /* border-stroke-brand */
}
```

**Option 3: Use CSS variables directly**

```tsx
<div className="bg-[var(--bg-fill-brand)]">Brand button</div>
```

## Peer Dependencies

The following must be installed in your project:

```bash
npm install react react-dom
```

| Package | Version | Notes |
|---------|---------|-------|
| `react` | `^19` | Required |
| `react-dom` | `^19` | Required |

## Bundled Dependencies (No action needed)

These are included in the library and installed automatically:

| Package | Purpose |
|---------|---------|
| `@base-ui/react` | Headless component primitives |
| `class-variance-authority` | Component variant styling |
| `clsx` | Conditional class composition |
| `tailwind-merge` | Smart Tailwind class merging |
| `lucide-react` | Icons |
| `react-day-picker` | Calendar/date picker |
| `sonner` | Toast notifications |

## Build-Only Dependencies (Not needed downstream)

These packages are used only during the library build and are **NOT required** in consuming applications:

- `tailwindcss` - CSS processing at build time
- `tw-animate-css` - Animation utilities (compiled into CSS)
- `shadcn` - Component tooling (used at build time)
- `@tailwindcss/postcss` - PostCSS plugin for Tailwind
- `postcss` - CSS processing

---

## Overview

This library provides a collection of React components organized into three main categories:

### Components Structure

#### `components/ui`
Primitive components built on [Base UI](https://base-ui.com/). These are the base building blocks that provide maximum flexibility. Use these when you need full control over component composition and styling.

#### `components/ui-extended`
Opinionated abstractions built on top of the primitive components. These components provide sensible defaults and common patterns, so you don't have to build every component from the primitives each time you use them. They're designed to speed up development while maintaining consistency across applications.

#### `components/ui-feature`
More involved feature components that are still product-agnostic. These components combine multiple primitives and extended components to create reusable feature-level functionality that can be used across different internal tools.

## Folder Structure

```
src/
├── components/
│   ├── ui/              # Primitive components
│   ├── ui-extended/     # Opinionated abstractions
│   └── ui-feature/      # Feature-level components
├── hooks/               # Reusable React hooks
├── lib/                 # Utility functions
└── index.ts             # Main entry point
```

## Usage

### Primitive UI Components

Primitive components can be accessed via the `ui-primitive` export path:

```typescript
import { Button } from '@mrshmllw/smores-internal-react/ui-primitive/button'
import { Dialog, DialogTrigger, DialogContent } from '@mrshmllw/smores-internal-react/ui-primitive/dialog'
```

### Extended Components

Extended components can be accessed via the `ui-extended` export path:

```typescript
import { Button } from '@mrshmllw/smores-internal-react/ui-extended/button'
import { FormInput } from '@mrshmllw/smores-internal-react/ui-extended/form-input'
import { Card } from '@mrshmllw/smores-internal-react/ui-extended/card'
```

### Feature Components

Feature components can be accessed via the `ui-feature` export path:

```typescript
import { PostcodeLookup } from '@mrshmllw/smores-internal-react/ui-feature/postcode-lookup'
```

### Hooks

Hooks can be accessed via the `hooks` export path:

```typescript
import { useMobile } from '@mrshmllw/smores-internal-react/hooks/use-mobile'
```

### Utilities

Utility functions can be accessed via the `lib` export path:

```typescript
import { cn } from '@mrshmllw/smores-internal-react/lib/utils'
```

## Quick Start Example

```typescript
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. Import library styles first
import '@mrshmllw/smores-internal-react/styles.css'

// 2. Import your app styles (can override theme variables)
import './index.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

```typescript
// App.tsx
import { Button } from '@mrshmllw/smores-internal-react/ui-extended/button'
import { Card } from '@mrshmllw/smores-internal-react/ui-extended/card'

export default function App() {
  return (
    <Card>
      <Button variant="default">Click me</Button>
    </Card>
  )
}
```

## Troubleshooting

### Styles not applying

1. **Check the CSS import** - Make sure you have `import '@mrshmllw/smores-internal-react/styles.css'` in your entry file
2. **Check import order** - Library CSS should be imported before your app's CSS if you want to override variables
3. **Check for CSS conflicts** - If you have your own Tailwind setup, there may be conflicting utilities

### Dark mode not working

The library uses the `.dark` class on a parent element for dark mode. Add this class to your `<html>` or `<body>` element:

```typescript
document.documentElement.classList.add('dark') // Enable dark mode
document.documentElement.classList.remove('dark') // Disable dark mode
```

## Local Development with Yalc

[Yalc](https://github.com/wclr/yalc) allows you to test local changes to this library in consuming applications without publishing to npm.

### Initial Setup (Testing Locally)

Install yalc globally (one-time setup):

```bash
npm install -g yalc
```

### Publishing Locally

In this repository (smores-internal), build and publish to your local yalc store:

```bash
npm run yalc:publish
```

### Adding to Your Project

In your consuming application:

```bash
yalc add @mrshmllw/smores-internal-react
```

This adds the package from your local yalc store and updates your `package.json` with a `file:.yalc/...` reference.

### Updating Changes

After making changes to the library, push updates to all linked projects:

```bash
npm run yalc:push
```

This rebuilds the library and automatically updates all projects that have it linked via yalc.

### Removing Yalc Link

When you're done testing, remove the yalc link and restore the npm package:

```bash
yalc remove @mrshmllw/smores-internal-react
npm install
```

### Notes

- The `.yalc` folder and `yalc.lock` file will be created in your consuming project. Consider adding these to `.gitignore`
- Yalc copies files rather than symlinking, which avoids many issues with npm/yarn link
- Use `yalc:push` for rapid iteration - it automatically updates all linked projects
