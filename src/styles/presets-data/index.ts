import { defaultPreset, defaultPresetDark } from './default'
import { brutalist, brutalistDark } from './brutalist'

export { defaultPreset, defaultPresetDark } from './default'
export { brutalist, brutalistDark } from './brutalist'

export interface PresetDefinition {
	name: string
	label: string
	description: string
	light: Record<string, string>
	dark: Record<string, string>
}

export const presetDefinitions = [
	{
		name: 'default',
		label: 'Default',
		description: 'Clean, neutral, Inter-based. The "no opinion" starting point.',
		light: defaultPreset,
		dark: defaultPresetDark,
	},
	{
		name: 'brutalist',
		label: 'Brutalist',
		description:
			'Raw, architectural, uncompromising. Structural honesty: things look exactly like what they are.',
		light: brutalist,
		dark: brutalistDark,
	},
] satisfies PresetDefinition[]

export const presetDefinitionsByName = Object.fromEntries(
	presetDefinitions.map((preset) => [preset.name, preset]),
) as Record<string, PresetDefinition>
