export function cssVariables(css: string) {
	return new Map(
		Array.from(css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g), ([, name, value]) => [
			name,
			value.trim(),
		]),
	)
}

export function semanticUtilities(css: string) {
	return Array.from(
		css.matchAll(/@utility ([\w-]+)\s*\{\s*([\w-]+):\s*var\((--[\w-]+)\);\s*\}/g),
		([, name, property, token]) => ({ name, property, token }),
	)
}

export function derivedColorAliases(preset: string, tokens: ReadonlySet<string>) {
	return new Map(
		[...cssVariables(preset)].filter(([, value]) => {
			const reference = /^var\((--[\w-]+)\)$/.exec(value)
			return reference && tokens.has(reference[1])
		}),
	)
}
