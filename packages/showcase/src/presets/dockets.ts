/**
 * Dockets — Receipt, typewriter, information-dense aesthetic.
 * References: thermal receipts, Bloomberg Terminal, raw HTML, old web.
 *
 * Character: zero border-radius, hairline borders, monospaced font,
 * paper-white background, near-black ink, no shadows, instant transitions.
 * Data is foregrounded — chrome is invisible. Every pixel earns its place.
 *
 * The receipt aesthetic is not retro pastiche. It is disciplined information
 * architecture: every element exists to carry meaning, nothing to decorate.
 *
 * Fonts:
 *   All text — IBM Plex Mono: functional, readable, authoritative.
 *   The mono face makes every character exactly the same width — columns
 *   snap. Numbers align. Structure becomes visible.
 *
 * Requires font import in your root CSS:
 *   @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap");
 */
export const dockets: Record<string, string> = {
  // ── Semantic color tokens ─────────────────────────────────────────────
  "--bg-default": "#FAFAF7FF",
  "--bg-inverse": "#0A0A08FF",
  "--bg-muted": "#F2F2EEFF",
  "--bg-surface-default": "#FAFAF7FF",
  "--bg-surface-info": "#EEF4F8FF",
  "--bg-surface-success": "#EEF5EEFF",
  "--bg-surface-warning": "#FAF4E0FF",
  "--bg-surface-critical": "#FAF0EEFF",
  "--bg-surface-emphasis": "#EEEEF8FF",
  "--bg-surface-inverse": "#3A3A38FF",
  "--bg-surface-transparent": "#0000000A",
  "--bg-surface-brand": "#F8F0EEFF",
  "--bg-surface-hover": "#EDEDE8FF",
  "--bg-fill-default": "#FAFAF7FF",
  "--bg-fill-primary": "#0A0A08FF",
  "--bg-fill-brand": "#5A3E28FF",
  "--bg-fill-info": "#1A3A5AFF",
  "--bg-fill-success": "#1A4A1AFF",
  "--bg-fill-warning": "#5A3C00FF",
  "--bg-fill-critical": "#5A1A0AFF",
  "--bg-fill-emphasis": "#0A0A08FF",
  "--bg-fill-transparent": "#0000000A",
  "--bg-fill-secondary": "#0A0A08FF",
  "--bg-fill-secondary-inverse": "#FAFAF7FF",
  "--text-default": "#0A0A08FF",
  "--text-secondary": "#2A2A28FF",
  "--text-muted": "#6A6A68FF",
  "--text-disabled": "#AAAAA8FF",
  "--text-inverse": "#FAFAF7FF",
  "--text-info": "#0A1E3AFF",
  "--text-success": "#0A2A0AFF",
  "--text-warning": "#3A1E00FF",
  "--text-critical": "#3A0A0AFF",
  "--text-emphasis": "#0A0A2AFF",
  "--text-brand": "#3A1A0AFF",
  "--text-link": "#0A0A08FF",
  "--icon-default": "#0A0A08FF",
  "--icon-secondary": "#2A2A28FF",
  "--icon-disabled": "#CCCCCCFF",
  "--icon-inverse": "#FAFAF7FF",
  "--icon-info": "#1A3A5AFF",
  "--icon-success": "#1A4A1AFF",
  "--icon-warning": "#5A3C00FF",
  "--icon-critical": "#5A1A0AFF",
  "--icon-emphasis": "#1A3A5AFF",
  "--icon-brand": "#5A3E28FF",
  "--border-default": "#8A8A88FF",
  "--border-secondary": "#C8C8C4FF",
  "--border-tertiary": "#B0B0ACFF",
  "--border-disabled": "#D0D0CCFF",
  "--border-inverse": "#FAFAF7FF",
  "--border-focus": "#0A0A08FF",
  "--border-brand": "#5A3E28FF",
  "--border-info": "#1A3A5AFF",
  "--border-success": "#1A4A1AFF",
  "--border-warning": "#5A3C00FF",
  "--border-critical": "#5A1A0AFF",
  "--border-emphasis": "#1A3A5AFF",
  "--chart-1": "#0A0A08FF",
  "--chart-2": "#5A3E28FF",
  "--chart-3": "#4A4A48FF",
  "--chart-4": "#1A4A1AFF",
  "--chart-5": "#1A3A5AFF",

  // ── shadcn / ui compatibility ─────────────────────────────────────────
  "--background": "#FAFAF7FF",
  "--foreground": "#0A0A08FF",
  "--card": "#FAFAF7FF",
  "--card-foreground": "#0A0A08FF",
  "--popover": "#FAFAF7FF",
  "--popover-foreground": "#0A0A08FF",
  "--primary": "#0A0A08FF",
  "--primary-foreground": "#FAFAF7FF",
  "--secondary": "#F2F2EEFF",
  "--secondary-foreground": "#0A0A08FF",
  "--muted": "#F2F2EEFF",
  "--muted-foreground": "#6A6A68FF",
  "--accent": "#EDEDE8FF",
  "--accent-foreground": "#0A0A08FF",
  "--destructive": "#5A1A0AFF",
  "--border": "#8A8A88FF",
  "--input": "#C8C8C4FF",
  "--ring": "#0A0A08FF",
  "--sidebar-background": "#FAFAF7FF",
  "--sidebar-foreground": "#0A0A08FF",
  "--sidebar-primary": "#0A0A08FF",
  "--sidebar-primary-foreground": "#FAFAF7FF",
  "--sidebar-accent": "#F2F2EEFF",
  "--sidebar-accent-foreground": "#0A0A08FF",
  "--sidebar-border": "#8A8A88FF",
  "--sidebar-ring": "#0A0A08FF",

  // ── Dimension tokens ──────────────────────────────────────────────────
  "--spacing": "0.25rem",
  // Hairline borders — the receipt uses thin ruled lines
  "--border-width-base": "0.0625rem",
  // Zero radius — receipts have no rounded corners
  "--radius": "0rem",
  "--font-size-base": "0.8125rem", // 13px — compact information density
  "--leading-base": "1.4",
  "--letter-spacing-base": "0.02em",
  "--opacity-hover": "0.7",
  "--opacity-active": "0.5",
  "--opacity-disabled": "0.4",
  // No decorative shadows — structural honesty
  "--shadow-offset-y": "0px",
  "--shadow-blur": "0px",
  "--shadow-spread": "0px",
  "--shadow-base-color": "rgba(0, 0, 0, 0)",
  "--container-sm": "640px",
  "--container-md": "768px",
  "--container-lg": "1024px",
  "--container-xl": "1280px",
  "--container-2xl": "1400px",
  "--dropdown-offset": "0",
  "--overlay-offset": "0",

  // ── Fonts: IBM Plex Mono — monospaced, columns snap, numbers align ────
  "--font-sans": '"IBM Plex Mono", "Courier New", monospace',
  "--font-heading": '"IBM Plex Mono", "Courier New", monospace',
  "--font-brand": '"IBM Plex Mono", "Courier New", monospace',

  // ── Phase 1a: Component tokens ────────────────────────────────────────
  "--button-radius": "0px",
  "--button-padding-x": "calc(var(--spacing) * 4)",
  "--button-padding-y": "calc(var(--spacing) * 1.5)",
  "--card-radius": "0px",
  "--card-padding": "calc(var(--spacing) * 4)",
  "--nav-height": "calc(var(--spacing) * 12)",
  "--section-padding-y": "calc(var(--spacing) * 16)",
  "--hero-padding-y": "calc(var(--spacing) * 24)",
  "--input-radius": "0px",
  "--input-height": "calc(var(--spacing) * 8)",
  "--badge-radius": "0px",

  // ── Phase 1b: Motion — instant. Receipts don't animate. ───────────────
  "--transition-default": "0ms linear",
  "--transition-fast": "0ms linear",
  "--transition-slow": "0ms linear",
  "--hover-transform": "none",
  "--hover-shadow": "none",
  "--active-scale": "1",

  // ── Phase 1c: Typography — mono at its most functional ───────────────
  "--heading-font-weight": "700",
  "--heading-letter-spacing": "var(--tracking-normal)",
  "--body-letter-spacing": "var(--tracking-normal)",
  "--hero-font-size": "var(--text-4xl)",
  "--hero-font-weight": "700",
  "--hero-letter-spacing": "var(--tracking-normal)",
  "--section-title-size": "var(--text-xl)",
  "--section-title-font-weight": "700",
  "--section-title-letter-spacing": "var(--tracking-normal)",
  "--card-title-size": "var(--text-sm)",
  "--card-title-font-weight": "700",
  "--card-title-letter-spacing": "var(--tracking-normal)",

  // ── Bento layout token ────────────────────────────────────────────────
  // Gap = hairline (same as border-width). Color derives from bg-border.
  // Radius derives from rounded-lg (--radius = 0 in dockets = square corners).
  "--bento-gap": "1px",

  // ── Border style ──────────────────────────────────────────────────────
  "--border-style": "solid",

  // ── Focus ring ────────────────────────────────────────────────────────
  // Dashes suit the receipt / terminal aesthetic over a solid ring.
  "--focus-ring-style": "dashed",

  // ── Macro spacing scale — layout.tsx Section primitives ──────────────
  // Expressed as calc(var(--spacing)*N) so they scale with the spacing token.
  "--space-layout-sm": "calc(var(--spacing) * 6)",
  "--space-layout-md": "calc(var(--spacing) * 12)",
  "--space-layout-lg": "calc(var(--spacing) * 24)",
}

export const docketsDark: Record<string, string> = {
  // ── Dark: thermal paper inverted — dark bg, bright text ──────────────
  "--bg-default": "#0A0A08FF",
  "--bg-inverse": "#FAFAF7FF",
  "--bg-muted": "#141412FF",
  "--bg-surface-default": "#0A0A08FF",
  "--bg-surface-info": "#0A1828FF",
  "--bg-surface-success": "#0A1A0AFF",
  "--bg-surface-warning": "#1E1408FF",
  "--bg-surface-critical": "#1E0A08FF",
  "--bg-surface-emphasis": "#0A0A1EFF",
  "--bg-surface-inverse": "#606060FF",
  "--bg-surface-transparent": "#FFFFFF0A",
  "--bg-surface-brand": "#1E1008FF",
  "--bg-surface-hover": "#1A1A18FF",
  "--bg-fill-default": "#0A0A08FF",
  "--bg-fill-primary": "#FAFAF7FF",
  "--bg-fill-brand": "#8A6A48FF",
  "--bg-fill-info": "#4A7AAAFF",
  "--bg-fill-success": "#4A8A4AFF",
  "--bg-fill-warning": "#AA7A00FF",
  "--bg-fill-critical": "#AA4A2AFF",
  "--bg-fill-emphasis": "#FAFAF7FF",
  "--bg-fill-transparent": "#FFFFFF0A",
  "--bg-fill-secondary": "#FAFAF7FF",
  "--bg-fill-secondary-inverse": "#0A0A08FF",
  "--text-default": "#FAFAF7FF",
  "--text-secondary": "#C8C8C4FF",
  "--text-muted": "#8A8A88FF",
  "--text-disabled": "#444442FF",
  "--text-inverse": "#0A0A08FF",
  "--text-info": "#AACCFFFF",
  "--text-success": "#AAFFAAFF",
  "--text-warning": "#FFDDAAFF",
  "--text-critical": "#FFAAAAFF",
  "--text-emphasis": "#CCCCFFFF",
  "--text-brand": "#DDBBAAFF",
  "--text-link": "#C8C8C4FF",
  "--icon-default": "#FAFAF7FF",
  "--icon-secondary": "#C8C8C4FF",
  "--icon-disabled": "#383836FF",
  "--icon-inverse": "#0A0A08FF",
  "--icon-info": "#4A7AAAFF",
  "--icon-success": "#4A8A4AFF",
  "--icon-warning": "#AA7A00FF",
  "--icon-critical": "#AA4A2AFF",
  "--icon-emphasis": "#4A7AAAFF",
  "--icon-brand": "#8A6A48FF",
  "--border-default": "#6A6A68FF",
  "--border-secondary": "#3A3A38FF",
  "--border-tertiary": "#4A4A48FF",
  "--border-disabled": "#2A2A28FF",
  "--border-inverse": "#FAFAF7FF",
  "--border-focus": "#FAFAF7FF",
  "--border-brand": "#8A6A48FF",
  "--border-info": "#4A7AAAFF",
  "--border-success": "#4A8A4AFF",
  "--border-warning": "#AA7A00FF",
  "--border-critical": "#AA4A2AFF",
  "--border-emphasis": "#4A7AAAFF",
  "--chart-1": "#FAFAF7FF",
  "--chart-2": "#8A6A48FF",
  "--chart-3": "#8A8A88FF",
  "--chart-4": "#4A8A4AFF",
  "--chart-5": "#4A7AAAFF",

  // ── shadcn / ui compatibility ─────────────────────────────────────────
  "--background": "#0A0A08FF",
  "--foreground": "#FAFAF7FF",
  "--card": "#0A0A08FF",
  "--card-foreground": "#FAFAF7FF",
  "--popover": "#141412FF",
  "--popover-foreground": "#FAFAF7FF",
  "--primary": "#FAFAF7FF",
  "--primary-foreground": "#0A0A08FF",
  "--secondary": "#1A1A18FF",
  "--secondary-foreground": "#FAFAF7FF",
  "--muted": "#1A1A18FF",
  "--muted-foreground": "#8A8A88FF",
  "--accent": "#1A1A18FF",
  "--accent-foreground": "#FAFAF7FF",
  "--destructive": "#AA4A2AFF",
  "--border": "#6A6A68FF",
  "--input": "#3A3A38FF",
  "--ring": "#FAFAF7FF",
  "--sidebar-background": "#0A0A08FF",
  "--sidebar-foreground": "#FAFAF7FF",
  "--sidebar-primary": "#FAFAF7FF",
  "--sidebar-primary-foreground": "#0A0A08FF",
  "--sidebar-accent": "#1A1A18FF",
  "--sidebar-accent-foreground": "#FAFAF7FF",
  "--sidebar-border": "#6A6A68FF",
  "--sidebar-ring": "#FAFAF7FF",

  // ── Fonts carry over ──────────────────────────────────────────────────
  "--font-sans": '"IBM Plex Mono", "Courier New", monospace',
  "--font-heading": '"IBM Plex Mono", "Courier New", monospace',
  "--font-brand": '"IBM Plex Mono", "Courier New", monospace',

  // ── Bento layout token (dark) ─────────────────────────────────────────
  "--bento-gap": "1px",

  // ── Border style ──────────────────────────────────────────────────────
  "--border-style": "solid",

  // ── Focus ring ────────────────────────────────────────────────────────
  "--focus-ring-style": "dashed",

  // ── Macro spacing scale — layout.tsx Section primitives ──────────────
  "--space-layout-sm": "calc(var(--spacing) * 6)",
  "--space-layout-md": "calc(var(--spacing) * 12)",
  "--space-layout-lg": "calc(var(--spacing) * 24)",
}
