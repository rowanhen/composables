/**
 * Midnight — Dark-first premium theme.
 * References: Raycast, Warp terminal, Arc browser dark mode, Linear dark.
 * Deep navy/charcoal backgrounds — not pure black. Premium feels expensive
 * because it uses depth, not just darkness.
 *
 * Fonts:
 *   Heading — Space Grotesk Variable: slightly mechanical, purposeful,
 *             feels at home in a premium dark UI. Pairs beautifully with
 *             Inter's neutrality at body sizes.
 *   Body    — Inter Variable: the standard bearer for legible UI text.
 *             At small sizes on dark backgrounds, nothing else comes close.
 *
 * Character: deep navy backgrounds, electric violet accent, glow-style
 * shadows (coloured, diffuse), smooth transitions, subtle translateY hover.
 */
export const midnight: Record<string, string> = {
	// ── Semantic color tokens ─────────────────────────────────────────────
	"--bg-default": "#0D1117FF",
	"--bg-inverse": "#E6EDF3FF",
	"--bg-muted": "#161B22FF",
	"--bg-surface-default": "#161B22FF",
	"--bg-surface-info": "#0D1B2EFF",
	"--bg-surface-success": "#0D1F14FF",
	"--bg-surface-warning": "#1A1508FF",
	"--bg-surface-critical": "#1F0D10FF",
	"--bg-surface-emphasis": "#0D1430FF",
	"--bg-surface-inverse": "#8B949EFF",
	"--bg-surface-transparent": "#FFFFFF0A",
	"--bg-surface-brand": "#160D28FF",
	"--bg-surface-hover": "#1F2937FF",
	"--bg-fill-default": "#161B22FF",
	"--bg-fill-primary": "#7C6BCFFF",
	"--bg-fill-brand": "#7C3AEDFF",
	"--bg-fill-info": "#38BDF8FF",
	"--bg-fill-success": "#22C55EFF",
	"--bg-fill-warning": "#F59E0BFF",
	"--bg-fill-critical": "#EF4444FF",
	"--bg-fill-emphasis": "#7C6BCFFF",
	"--bg-fill-transparent": "#FFFFFF0A",
	"--bg-fill-secondary": "#21262DFF",
	"--bg-fill-secondary-inverse": "#0D1117FF",
	"--text-default": "#E6EDF3FF",
	"--text-secondary": "#8B949EFF",
	"--text-muted": "#484F58FF",
	"--text-disabled": "#30363DFF",
	"--text-inverse": "#0D1117FF",
	"--text-info": "#79C0FFFF",
	"--text-success": "#56D364FF",
	"--text-warning": "#E3B341FF",
	"--text-critical": "#F85149FF",
	"--text-emphasis": "#A5D6FFFF",
	"--text-brand": "#D2A8FFFF",
	"--text-link": "#A5D6FFFF",
	"--icon-default": "#E6EDF3FF",
	"--icon-secondary": "#8B949EFF",
	"--icon-disabled": "#21262DFF",
	"--icon-inverse": "#0D1117FF",
	"--icon-info": "#38BDF8FF",
	"--icon-success": "#22C55EFF",
	"--icon-warning": "#F59E0BFF",
	"--icon-critical": "#EF4444FF",
	"--icon-emphasis": "#7C6BCFFF",
	"--icon-brand": "#9D6FE8FF",
	"--border-default": "#21262DFF",
	"--border-secondary": "#30363DFF",
	"--border-tertiary": "#3D444DFF",
	"--border-disabled": "#21262DFF",
	"--border-inverse": "#8B949EFF",
	"--border-focus": "#7C6BCFFF",
	"--border-brand": "#6E3EBDFF",
	"--border-info": "#1158A7FF",
	"--border-success": "#196C2EFF",
	"--border-warning": "#9E6A03FF",
	"--border-critical": "#6E0000FF",
	"--border-emphasis": "#3B52BCFF",
	"--chart-1": "#7C6BCFFF",
	"--chart-2": "#38BDF8FF",
	"--chart-3": "#22C55EFF",
	"--chart-4": "#F59E0BFF",
	"--chart-5": "#D2A8FFFF",

	// ── shadcn / ui compatibility ─────────────────────────────────────────
	"--background": "#0D1117FF",
	"--foreground": "#E6EDF3FF",
	"--card": "#161B22FF",
	"--card-foreground": "#E6EDF3FF",
	"--popover": "#161B22FF",
	"--popover-foreground": "#E6EDF3FF",
	"--primary": "#7C6BCFFF",
	"--primary-foreground": "#FFFFFFFF",
	"--secondary": "#21262DFF",
	"--secondary-foreground": "#E6EDF3FF",
	"--muted": "#21262DFF",
	"--muted-foreground": "#484F58FF",
	"--accent": "#1F2937FF",
	"--accent-foreground": "#E6EDF3FF",
	"--destructive": "#EF4444FF",
	"--border": "#21262DFF",
	"--input": "#21262DFF",
	"--ring": "#7C6BCFFF",
	"--sidebar-background": "#0D1117FF",
	"--sidebar-foreground": "#E6EDF3FF",
	"--sidebar-primary": "#7C6BCFFF",
	"--sidebar-primary-foreground": "#FFFFFFFF",
	"--sidebar-accent": "#1F2937FF",
	"--sidebar-accent-foreground": "#E6EDF3FF",
	"--sidebar-border": "#21262DFF",
	"--sidebar-ring": "#7C6BCFFF",

	// ── Dimension tokens ──────────────────────────────────────────────────
	"--spacing": "0.25rem",
	"--border-width-base": "0.0625rem",
	"--radius": "0.625rem",
	"--font-size-base": "0.9375rem",
	"--leading-base": "1.5",
	"--letter-spacing-base": "0.02em",
	"--opacity-hover": "0.85",
	"--opacity-active": "0.7",
	"--opacity-disabled": "0.3",
	// Glow shadow: diffuse, coloured (violet), low opacity
	"--shadow-offset-y": "4px",
	"--shadow-blur": "24px",
	"--shadow-spread": "0px",
	"--shadow-base-color": "rgba(124, 107, 207, 0.2)",
	"--container-sm": "640px",
	"--container-md": "768px",
	"--container-lg": "1024px",
	"--container-xl": "1280px",
	"--container-2xl": "1400px",
	"--dropdown-offset": "8",
	"--overlay-offset": "8",

	// ── Fonts: Space Grotesk heading × Inter body ─────────────────────────
	"--font-sans": '"Inter Variable", sans-serif',
	"--font-heading": '"Space Grotesk Variable", sans-serif',
	"--font-brand": '"Space Grotesk Variable", sans-serif',

	// ── Phase 1a: Component tokens ────────────────────────────────────────
	"--button-radius": "var(--radius-md)",
	"--button-padding-x": "calc(var(--spacing) * 4)",
	"--button-padding-y": "calc(var(--spacing) * 2.5)",
	"--card-radius": "var(--radius-lg)",
	"--card-padding": "calc(var(--spacing) * 6)",
	"--nav-height": "calc(var(--spacing) * 16)",
	"--section-padding-y": "calc(var(--spacing) * 24)",
	"--hero-padding-y": "calc(var(--spacing) * 40)",
	"--input-radius": "var(--radius-md)",
	"--input-height": "calc(var(--spacing) * 10)",
	"--badge-radius": "var(--radius-2xl)",

	// ── Phase 1b: Motion — smooth, slightly slower than default ───────────
	"--transition-default": "220ms cubic-bezier(0.4, 0, 0.2, 1)",
	"--transition-fast": "120ms cubic-bezier(0.4, 0, 0.2, 1)",
	"--transition-slow": "360ms cubic-bezier(0, 0, 0.2, 1)",
	"--hover-transform": "translateY(-1px)",
	"--hover-shadow": "var(--shadow-lg)",
	"--active-scale": "0.97",

	// ── Phase 1c: Typography — clear hierarchy on dark backgrounds ────────
	"--heading-font-weight": "600",
	"--heading-letter-spacing": "var(--tracking-tight)",
	"--body-letter-spacing": "var(--tracking-normal)",
	"--hero-font-size": "var(--text-5xl)",
	"--section-title-size": "var(--text-3xl)",
	"--card-title-size": "var(--text-lg)",
}

export const midnightDark: Record<string, string> = {
	// Midnight is dark-first. In dark-toggle mode, deepen slightly.
	"--bg-default": "#090D14FF",
	"--bg-muted": "#101520FF",
	"--bg-surface-default": "#101520FF",
	"--bg-surface-hover": "#18222EFF",
	"--background": "#090D14FF",
	"--card": "#101520FF",
	"--popover": "#101520FF",
	"--secondary": "#1A2030FF",
	"--muted": "#1A2030FF",
	"--accent": "#182030FF",
	"--sidebar-background": "#090D14FF",

	// ── Fonts carry over ──────────────────────────────────────────────────
	"--font-sans": '"Inter Variable", sans-serif',
	"--font-heading": '"Space Grotesk Variable", sans-serif',
	"--font-brand": '"Space Grotesk Variable", sans-serif',
}
