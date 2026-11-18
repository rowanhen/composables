import { systemDefaults } from './system-tokens'
import { componentDefaults } from './component-tokens'
import { foundationDefaults } from './foundations'
import { parseTokenOverrides, type PresetTokens, type TokenOverrides } from './types'

/** Rebind dependencies at each theme boundary; never inherit another preset's geometry. */
export function resolveTokens(overrides: TokenOverrides): Record<string, string> {
	return {
		...foundationDefaults,
		...systemDefaults,
		...componentDefaults,
		'--radius-base': '0rem',
		...parseTokenOverrides(overrides),
	}
}

export interface ThemePreset {
	light: PresetTokens
	dark: PresetTokens
}

/** Extend a complete preset without duplicating its semantic colour definitions. */
export function definePreset(
	base: ThemePreset,
	overrides: { light?: TokenOverrides; dark?: TokenOverrides },
): ThemePreset {
	return {
		light: { ...base.light, ...parseTokenOverrides(overrides.light ?? {}) },
		dark: { ...base.dark, ...parseTokenOverrides(overrides.dark ?? {}) },
	}
}

/** The same serializer powers generated CSS and the live editor. Selector is trusted application code. */
export function createPresetCSS(preset: ThemePreset, selector = ':root'): string {
	if (/[{};<>]/.test(selector)) throw new Error('Invalid theme selector')
	const block = (values: TokenOverrides) =>
		Object.entries(resolveTokens(values))
			.map(([name, value]) => `\t${name}: ${value};`)
			.join('\n')
	const dark = selector === ':root' ? '.dark' : `${selector}.dark, .dark ${selector}`
	return `${selector} {\n${block(preset.light)}\n}\n${dark} {\n${block({ ...preset.light, ...preset.dark })}\n}\n`
}
