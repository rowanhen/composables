import { defaultPreset, defaultPresetDark } from './default'
import { brutalist, brutalistDark } from './brutalist'
import { signalPop, signalPopDark } from './signal-pop'

export { defaultPreset, defaultPresetDark } from './default'
export { brutalist, brutalistDark } from './brutalist'
export { signalPop, signalPopDark } from './signal-pop'

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
	{
		name: 'signal-pop',
		label: 'Signal Pop',
		description:
			'Bright consumer-tech energy: electric modules, capsule controls, hard outlines, and codey labels.',
		light: signalPop,
		dark: signalPopDark,
	},
] satisfies PresetDefinition[]

export const presetDefinitionsByName = Object.fromEntries(
	presetDefinitions.map((preset) => [preset.name, preset]),
) as Record<string, PresetDefinition>
