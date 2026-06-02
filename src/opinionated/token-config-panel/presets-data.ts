import type { Preset } from './types'

import { presetDefinitions } from '../../styles/presets-data'

/* ------------------------------------------------------------------ */
/*  Exported presets map                                                 */
/* ------------------------------------------------------------------ */

export const presets: Record<string, Preset | null> = {
	...Object.fromEntries(
		presetDefinitions.map((preset) => [
			preset.name,
			preset.name === 'default'
				? null
				: {
						label: preset.label,
						description: preset.description,
						overrides: preset.light,
						darkOverrides: preset.dark,
					},
		]),
	),
}
