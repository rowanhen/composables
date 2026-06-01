import type { Preset } from './types'

import { brutalist, brutalistDark } from '../../styles/presets-data/brutalist'

/* ------------------------------------------------------------------ */
/*  Exported presets map                                                 */
/* ------------------------------------------------------------------ */

export const presets: Record<string, Preset | null> = {
	default: null,
	brutalist: {
		label: 'Brutalist',
		description:
			'Architectural restraint — zero radius, hard shadows, JetBrains Mono body, editorial red',
		overrides: brutalist,
		darkOverrides: brutalistDark,
	},
}
