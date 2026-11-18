import type { PresetTokens } from '../../styles/tokens/types'
export interface Preset {
	label: string
	description: string
	overrides: PresetTokens
	darkOverrides: PresetTokens
}
