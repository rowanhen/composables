import type { Preset } from './types'

export { presets } from './presets-data'

/* ------------------------------------------------------------------ */
/*  Preset helpers                                                      */
/* ------------------------------------------------------------------ */

const PRESET_STYLE_ID = 'composables-preset-overrides'

function buildPresetStyleSheet(preset: Preset): string {
	const lightLines = Object.entries(preset.overrides)
		.map(([k, v]) => `  ${k}: ${v};`)
		.join('\n')
	const darkLines = Object.entries(preset.darkOverrides)
		.map(([k, v]) => `  ${k}: ${v};`)
		.join('\n')
	return `:root {\n${lightLines}\n}\n.dark {\n${darkLines}\n}`
}

export function injectPresetStyle(preset: Preset) {
	removePresetStyle()
	const style = document.createElement('style')
	style.id = PRESET_STYLE_ID
	style.textContent = buildPresetStyleSheet(preset)
	document.head.appendChild(style)
}

export function removePresetStyle() {
	document.getElementById(PRESET_STYLE_ID)?.remove()
}
