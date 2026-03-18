/**
 * composables-preset.ts
 *
 * Tailwind CSS v4 preset that maps the Composables design-token CSS
 * custom-properties to Tailwind utility classes.
 *
 * Usage (tailwind.config.ts):
 *   import composablesPreset from "@/tailwind/composables-preset";
 *   export default { presets: [composablesPreset] } satisfies Config;
 *
 * All values reference CSS variables declared in composable.css so they
 * respond to dark-mode and preset swaps at runtime.
 */

import type { Config } from "tailwindcss";

/* ── Helpers ─────────────────────────────────────────────────────────── */

/** Build a scale { 50, 100, …, 1000 } referencing --<prefix>-<step> */
function paletteScale(prefix: string) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000] as const;
  const scale: Record<string, string> = {};
  for (const s of steps) {
    scale[s] = `var(--${prefix}-${s})`;
  }
  return scale;
}

/** Same as paletteScale but for the alpha variants */
function alphaScale(prefix: string) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000] as const;
  const scale: Record<string, string> = {};
  for (const s of steps) {
    scale[s] = `var(--${prefix}-alpha-${s})`;
  }
  return scale;
}

/* ── Palette colours ─────────────────────────────────────────────────── */

const palettes = [
  "neutral",
  "red",
  "amber",
  "green",
  "blue",
  "orange",
  "jade",
  "sky",
  "violet",
  "pink",
] as const;

const paletteColors: Record<string, Record<string, string>> = {};
for (const p of palettes) {
  paletteColors[p] = paletteScale(p);
  paletteColors[`${p}-alpha`] = alphaScale(p);
}

/* ── Semantic colours ────────────────────────────────────────────────── */

const semanticColors = {
  /* Background */
  bg: {
    DEFAULT: "var(--bg-default)",
    inverse: "var(--bg-inverse)",
    muted: "var(--bg-muted)",
  },
  "bg-surface": {
    DEFAULT: "var(--bg-surface-default)",
    info: "var(--bg-surface-info)",
    success: "var(--bg-surface-success)",
    warning: "var(--bg-surface-warning)",
    critical: "var(--bg-surface-critical)",
    emphasis: "var(--bg-surface-emphasis)",
    inverse: "var(--bg-surface-inverse)",
    transparent: "var(--bg-surface-transparent)",
    brand: "var(--bg-surface-brand)",
    hover: "var(--bg-surface-hover)",
  },
  "bg-fill": {
    DEFAULT: "var(--bg-fill-default)",
    primary: "var(--bg-fill-primary)",
    brand: "var(--bg-fill-brand)",
    info: "var(--bg-fill-info)",
    success: "var(--bg-fill-success)",
    warning: "var(--bg-fill-warning)",
    critical: "var(--bg-fill-critical)",
    emphasis: "var(--bg-fill-emphasis)",
    transparent: "var(--bg-fill-transparent)",
    secondary: "var(--bg-fill-secondary)",
    "secondary-inverse": "var(--bg-fill-secondary-inverse)",
  },
  /* Text */
  text: {
    DEFAULT: "var(--text-default)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    disabled: "var(--text-disabled)",
    inverse: "var(--text-inverse)",
    info: "var(--text-info)",
    success: "var(--text-success)",
    warning: "var(--text-warning)",
    critical: "var(--text-critical)",
    emphasis: "var(--text-emphasis)",
    brand: "var(--text-brand)",
    link: "var(--text-link)",
  },
  /* Icon */
  icon: {
    DEFAULT: "var(--icon-default)",
    secondary: "var(--icon-secondary)",
    disabled: "var(--icon-disabled)",
    inverse: "var(--icon-inverse)",
    info: "var(--icon-info)",
    success: "var(--icon-success)",
    warning: "var(--icon-warning)",
    critical: "var(--icon-critical)",
    emphasis: "var(--icon-emphasis)",
    brand: "var(--icon-brand)",
  },
  /* Border */
  "border-token": {
    DEFAULT: "var(--border-default)",
    secondary: "var(--border-secondary)",
    tertiary: "var(--border-tertiary)",
    disabled: "var(--border-disabled)",
    inverse: "var(--border-inverse)",
    focus: "var(--border-focus)",
    brand: "var(--border-brand)",
    info: "var(--border-info)",
    success: "var(--border-success)",
    warning: "var(--border-warning)",
    critical: "var(--border-critical)",
    emphasis: "var(--border-emphasis)",
  },
  /* Chart */
  chart: {
    1: "var(--chart-1)",
    2: "var(--chart-2)",
    3: "var(--chart-3)",
    4: "var(--chart-4)",
    5: "var(--chart-5)",
  },
  /* Overlay */
  overlay: {
    50: "var(--overlays-black-alpha-50)",
    100: "var(--overlays-black-alpha-100)",
    200: "var(--overlays-black-alpha-200)",
    300: "var(--overlays-black-alpha-300)",
    400: "var(--overlays-black-alpha-400)",
    500: "var(--overlays-black-alpha-500)",
    600: "var(--overlays-black-alpha-600)",
    700: "var(--overlays-black-alpha-700)",
    800: "var(--overlays-black-alpha-800)",
    900: "var(--overlays-black-alpha-900)",
    950: "var(--overlays-black-alpha-950)",
    1000: "var(--overlays-black-alpha-1000)",
  },
  /* Base */
  "base-white": "var(--base-white)",
  "base-black": "var(--base-black)",
  /* shadcn compat */
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: {
    DEFAULT: "var(--card)",
    foreground: "var(--card-foreground)",
  },
  popover: {
    DEFAULT: "var(--popover)",
    foreground: "var(--popover-foreground)",
  },
  primary: {
    DEFAULT: "var(--primary)",
    foreground: "var(--primary-foreground)",
  },
  secondary: {
    DEFAULT: "var(--secondary)",
    foreground: "var(--secondary-foreground)",
  },
  muted: {
    DEFAULT: "var(--muted)",
    foreground: "var(--muted-foreground)",
  },
  accent: {
    DEFAULT: "var(--accent)",
    foreground: "var(--accent-foreground)",
  },
  destructive: "var(--destructive)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  sidebar: {
    DEFAULT: "var(--sidebar-background)",
    foreground: "var(--sidebar-foreground)",
    primary: "var(--sidebar-primary)",
    "primary-foreground": "var(--sidebar-primary-foreground)",
    accent: "var(--sidebar-accent)",
    "accent-foreground": "var(--sidebar-accent-foreground)",
    border: "var(--sidebar-border)",
    ring: "var(--sidebar-ring)",
  },
};

/* ── Spacing ─────────────────────────────────────────────────────────── */

const spacing = {
  "space-xxs": "var(--space-xxs)",
  "space-xs": "var(--space-xs)",
  "space-sm": "var(--space-sm)",
  "space-md": "var(--space-md)",
  "space-lg": "var(--space-lg)",
  "space-xl": "var(--space-xl)",
  "space-xxl": "var(--space-xxl)",
  "space-layout-sm": "var(--space-layout-sm)",
  "space-layout-md": "var(--space-layout-md)",
  "space-layout-lg": "var(--space-layout-lg)",
};

/* ── Border radius ───────────────────────────────────────────────────── */

const borderRadius = {
  token: "var(--radius)",
  "token-sm": "var(--radius-sm)",
  "token-md": "var(--radius-md)",
  "token-lg": "var(--radius-lg)",
  "token-xl": "var(--radius-xl)",
  "token-2xl": "var(--radius-2xl)",
  "token-full": "var(--radius-full)",
};

/* ── Font size ───────────────────────────────────────────────────────── */

const fontSize: Record<string, [string, { lineHeight: string; letterSpacing: string }]> = {
  "token-xs": ["var(--font-size-xs)", { lineHeight: "var(--line-height-xs)", letterSpacing: "var(--letter-spacing-xs)" }],
  "token-sm": ["var(--font-size-sm)", { lineHeight: "var(--line-height-sm)", letterSpacing: "var(--letter-spacing-sm)" }],
  "token-md": ["var(--font-size-md)", { lineHeight: "var(--line-height-md)", letterSpacing: "var(--letter-spacing-md)" }],
  "token-lg": ["var(--font-size-lg)", { lineHeight: "var(--line-height-lg)", letterSpacing: "var(--letter-spacing-lg)" }],
  "token-xl": ["var(--font-size-xl)", { lineHeight: "var(--line-height-xl)", letterSpacing: "var(--letter-spacing-xl)" }],
  "token-2xl": ["var(--font-size-2xl)", { lineHeight: "var(--line-height-2xl)", letterSpacing: "var(--letter-spacing-2xl)" }],
  "token-3xl": ["var(--font-size-3xl)", { lineHeight: "var(--line-height-3xl)", letterSpacing: "var(--letter-spacing-3xl)" }],
};

/* ── Font family ─────────────────────────────────────────────────────── */

const fontFamily = {
  sans: "var(--font-sans)",
  heading: "var(--font-heading)",
  brand: "var(--font-brand)",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

/* ── Shadows ─────────────────────────────────────────────────────────── */

const boxShadow = {
  "token-xs": "var(--shadow-xs)",
  "token-sm": "var(--shadow-sm)",
  "token-md": "var(--shadow-md)",
  "token-lg": "var(--shadow-lg)",
  "token-xl": "var(--shadow-xl)",
};

/* ── Z-index ─────────────────────────────────────────────────────────── */

const zIndex = {
  dropdown: "var(--z-dropdown)",
  sticky: "var(--z-sticky)",
  overlay: "var(--z-overlay)",
  modal: "var(--z-modal)",
  popover: "var(--z-popover)",
  toast: "var(--z-toast)",
  tooltip: "var(--z-tooltip)",
};

/* ── Transition ──────────────────────────────────────────────────────── */

const transitionDuration = {
  fast: "var(--duration-fast)",
  normal: "var(--duration-normal)",
  slow: "var(--duration-slow)",
};

const transitionTimingFunction = {
  default: "var(--ease-default)",
  in: "var(--ease-in)",
  out: "var(--ease-out)",
  linear: "var(--ease-linear)",
};

/* ── Container ───────────────────────────────────────────────────────── */

const containers = {
  sm: "var(--container-sm)",
  md: "var(--container-md)",
  lg: "var(--container-lg)",
  xl: "var(--container-xl)",
  "2xl": "var(--container-2xl)",
};

/* ── Opacity ─────────────────────────────────────────────────────────── */

const opacity = {
  disabled: "var(--opacity-disabled)",
};

/* ── Preset ──────────────────────────────────────────────────────────── */

const composablesPreset = {
  theme: {
    extend: {
      colors: {
        ...paletteColors,
        ...semanticColors,
      },
      spacing,
      borderRadius,
      fontSize,
      fontFamily,
      boxShadow,
      zIndex,
      transitionDuration,
      transitionTimingFunction,
      opacity,
      maxWidth: containers,
    },
  },
} satisfies Config;

export default composablesPreset;
