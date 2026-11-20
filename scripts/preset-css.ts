import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'

import { cssVariables } from '../src/styles/theme'

export function readPresetStyles(directory: string) {
	return readdirSync(directory)
		.filter((file) => file.endsWith('.css'))
		.map((file) => {
			const css = readFileSync(join(directory, file), 'utf-8')
			const blocks = new Map(
				Array.from(css.matchAll(/^(:root|\.dark)\s*\{([^}]*)\}/gm), ([, selector, block]) => [
					selector,
					Object.fromEntries(cssVariables(block)),
				]),
			)
			const light = blocks.get(':root')
			const dark = blocks.get('.dark')
			if (!light || !dark) throw new Error(`${file} must declare :root and .dark preset rules`)
			return { name: basename(file, '.css'), file, css, light, dark }
		})
}
