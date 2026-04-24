/* ------------------------------------------------------------------ */
/*  Shared helpers for token-config-panel                               */
/* ------------------------------------------------------------------ */

export function getResolvedColor(cssVar: string): string {
	const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
	if (raw.startsWith('#') || raw.startsWith('rgb')) return raw
	const temp = document.createElement('div')
	temp.style.color = `var(${cssVar})`
	document.body.appendChild(temp)
	const resolved = getComputedStyle(temp).color
	document.body.removeChild(temp)
	return rgbToHex(resolved)
}

export function rgbToHex(rgb: string): string {
	const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
	if (!match) return rgb
	const r = Number.parseInt(match[1], 10).toString(16).padStart(2, '0')
	const g = Number.parseInt(match[2], 10).toString(16).padStart(2, '0')
	const b = Number.parseInt(match[3], 10).toString(16).padStart(2, '0')
	return `#${r}${g}${b}`
}

export function getResolvedDimension(cssVar: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
}

export function parseNumericValue(raw: string): number {
	return Number.parseFloat(raw) || 0
}
