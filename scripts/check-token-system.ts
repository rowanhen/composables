import { validateTokenSystem } from './validate-tokens'
import { tokenNames } from '../src/styles/tokens/types'
import { themeValues } from '../src/styles/tokens/model'
import { themes } from '../src/styles/tokens/themes'
import { createPresetCSS } from '../src/styles/tokens/preset'
const errors = validateTokenSystem()
for (const theme of themes) {
	const values = { light: themeValues(theme.name, 'light'), dark: themeValues(theme.name, 'dark') }
	for (const mode of ['light', 'dark'] as const)
		if (Object.keys(values[mode]).length !== tokenNames.length)
			errors.push(`${theme.name}.${mode}: incomplete theme`)
	const css = createPresetCSS(values)
	for (const name of tokenNames)
		if (css.split(`${name}:`).length !== 3)
			errors.push(`${theme.name}: ${name} must be emitted once per mode`)
}
if (errors.length) {
	console.error(errors.join('\n'))
	process.exit(1)
}
console.log(
	`${tokenNames.length} tokens verified across ${themes.length} complete light/dark themes.`,
)
