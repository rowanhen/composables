import { themeValues } from './model'
import { parseTokenOverrides, tokenNames, type PresetTokens, type TokenOverrides } from './types'

/** Apply optional caller customizations to a complete default theme. No dependency resolution. */
export function resolveTokens(overrides: TokenOverrides): Record<string, string> {
	return { ...themeValues('default', 'light'), ...parseTokenOverrides(overrides) }
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
	const block = (values: PresetTokens) => {
		const parsed = parseTokenOverrides(values)
		for (const name of tokenNames)
			if (!(name in parsed)) throw new Error(`Incomplete theme: missing ${name}`)
		return Object.entries(parsed)
			.map(([name, value]) => `\t${name}: ${value};`)
			.join('\n')
	}
	const dark = selector === ':root' ? '.dark' : `${selector}.dark, .dark ${selector}`
	return `${selector} {\n${block(preset.light)}\n}\n${dark} {\n${block(preset.dark)}\n}\n`
}
