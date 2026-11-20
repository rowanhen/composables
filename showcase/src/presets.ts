const stylesheets = import.meta.glob<string>('../../src/styles/presets/*.css', {
	eager: true,
	query: '?raw',
	import: 'default',
})

const presets = new Map(
	Object.entries(stylesheets).map(([path, stylesheet]) => [
		path.split('/').at(-1)!.slice(0, -'.css'.length),
		stylesheet,
	]),
)

export const presetOptions = Array.from(presets.keys(), (value) => ({
	value,
	title: value.replace(/(^|-)([a-z])/g, (_, separator: string, letter: string) =>
		separator ? ` ${letter.toUpperCase()}` : letter.toUpperCase(),
	),
}))

export function applyPresetStyles(name: string, styleId: string) {
	document.getElementById(styleId)?.remove()
	const stylesheet = presets.get(name)
	// The base package stylesheet already includes Default.
	if (name === 'default' || !stylesheet) return

	const style = document.createElement('style')
	style.id = styleId
	style.textContent = stylesheet
	document.head.appendChild(style)
	return style.sheet
}
