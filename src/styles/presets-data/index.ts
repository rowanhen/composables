import type { PresetTokens } from '../tokens/types'
export { gutenberg, gutenbergDark } from './gutenberg'

export { defaultPreset, defaultPresetDark } from './default'
export { brutalist, brutalistDark } from './brutalist'
export { signalPop, signalPopDark } from './signal-pop'
export { editorialGrid, editorialGridDark } from './editorial-grid'
export { kumo, kumoDark } from './kumo'
export { oqita, oqitaDark } from './oqita'
export { sponder, sponderDark } from './sponder'

export interface PresetDefinition {
	name: string
	label: string
	description: string
	light: PresetTokens
	dark: PresetTokens
}

import { themes } from '../tokens/themes'
import { themeValues } from '../tokens/model'
export const presetDefinitions = themes.map((theme) => ({
	...theme,
	light: themeValues(theme.name, 'light'),
	dark: themeValues(theme.name, 'dark'),
}))

export type PresetName = (typeof presetDefinitions)[number]['name']

export const presetDefinitionsByName = Object.fromEntries(
	presetDefinitions.map((preset) => [preset.name, preset]),
) as Record<PresetName, PresetDefinition>
