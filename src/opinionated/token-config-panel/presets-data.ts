import type { Preset } from './types'

import { editorial, editorialDark } from '../../styles/presets-data/editorial'
import { brutalist, brutalistDark } from '../../styles/presets-data/brutalist'
import { soft, softDark } from '../../styles/presets-data/soft'
import { swiss, swissDark } from '../../styles/presets-data/swiss'
import { midnight, midnightDark } from '../../styles/presets-data/midnight'
import { retro, retroDark } from '../../styles/presets-data/retro'
import { vapor, vaporDark } from '../../styles/presets-data/vapor'
import { nature, natureDark } from '../../styles/presets-data/nature'

/* ------------------------------------------------------------------ */
/*  Exported presets map                                                 */
/* ------------------------------------------------------------------ */

export const presets: Record<string, Preset | null> = {
	default: null,
	editorial: {
		label: 'Editorial',
		description:
			'Sophisticated magazine aesthetic — Fraunces headings, Source Serif 4 body, warm palette',
		overrides: editorial,
		darkOverrides: editorialDark,
	},
	brutalist: {
		label: 'Brutalist',
		description:
			'Architectural restraint — zero radius, hard shadows, JetBrains Mono body, editorial red',
		overrides: brutalist,
		darkOverrides: brutalistDark,
	},
	soft: {
		label: 'Soft',
		description: 'Warm and approachable — Plus Jakarta Sans, lavender tones, generous radius',
		overrides: soft,
		darkOverrides: softDark,
	},
	swiss: {
		label: 'Swiss',
		description:
			'International Typographic Style — Helvetica Neue, zero radius, zero shadow, red accent',
		overrides: swiss,
		darkOverrides: swissDark,
	},
	midnight: {
		label: 'Midnight',
		description:
			'Dark-first premium — deep navy, violet accent, glow shadows, Space Grotesk headings',
		overrides: midnight,
		darkOverrides: midnightDark,
	},
	retro: {
		label: 'Retro',
		description:
			'Warm CRT nostalgia — amber phosphor glow, monospace everything, terminal-inspired',
		overrides: retro,
		darkOverrides: retroDark,
	},
	vapor: {
		label: 'Vapor',
		description: 'Dreamy vaporwave — neon pink meets cool cyan on deep purple-black',
		overrides: vapor,
		darkOverrides: vaporDark,
	},
	nature: {
		label: 'Nature',
		description:
			'Organic and earthy — warm greens, rich browns, serif typography, forest-cabin warmth',
		overrides: nature,
		darkOverrides: natureDark,
	},
}
