import { createPresetCSS } from '../../styles/tokens/preset'
import type { Preset } from './types'

export { presets } from './presets-data'

/* ------------------------------------------------------------------ */
/*  Preset helpers                                                      */
/* ------------------------------------------------------------------ */

const PRESET_STYLE_ID = 'composables-preset-overrides'

function buildPresetStyleSheet(preset: Preset): string {
	return createPresetCSS({ light: preset.overrides, dark: preset.darkOverrides })
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
