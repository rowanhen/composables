import { palettes, steps } from '../src/styles/tokens/palette-data'
import { systemDefaults } from '../src/styles/tokens/system-tokens'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { foundationDefaults } from '../src/styles/tokens/foundations'
import { componentDefaults } from '../src/styles/tokens/component-tokens'
import { componentUtilityAliases } from '../src/styles/tokens/utility-aliases'
import { semanticColorCssVars, sidebarColorCssVars } from '../src/styles/tokens/registry'
import { presetDefinitions } from '../src/styles/presets-data'
import { resolveTokens } from '../src/styles/tokens/preset'

export function validateReferences(
	values: Record<string, string>,
	external: ReadonlySet<string> = new Set(),
): string[] {
	const errors: string[] = []
	const visited = new Set<string>()
	const visiting = new Set<string>()
	function visit(name: string, path: string[]) {
		if (visiting.has(name)) {
			errors.push(`Circular token reference: ${[...path, name].join(' -> ')}`)
			return
		}
		if (visited.has(name)) return
		visiting.add(name)
		for (const [, reference] of values[name].matchAll(/var\(\s*(--[a-z0-9-]+)/g)) {
			if (reference in values) visit(reference, [...path, name])
			else if (!external.has(reference))
				errors.push(`${name} references unknown token ${reference}`)
		}
		visiting.delete(name)
		visited.add(name)
	}
	for (const name of Object.keys(values)) visit(name, [])
	return [...new Set(errors)]
}

export function validateTokenSystem(): string[] {
	const root = join(import.meta.dir, '..')

	const external = new Set<string>([
		...palettes.flatMap((palette) =>
			steps.flatMap((step) => [
				`--palette-${palette.name}-${step}`,
				`--palette-${palette.name}-alpha-${step}`,
			]),
		),
		...steps.map((step) => `--palette-overlays-black-alpha-${step}`),
		'--palette-base-white',
		'--palette-base-black',
		...[
			...readFileSync(join(root, 'node_modules/tailwindcss/theme.css'), 'utf8').matchAll(
				/(--[a-z0-9-]+)\s*:/g,
			),
		].map((match) => match[1]),
	])
	const errors: string[] = []
	const required = [...semanticColorCssVars, ...sidebarColorCssVars]
	for (const preset of presetDefinitions) {
		for (const mode of ['light', 'dark'] as const) {
			for (const key of required)
				if (!(key in preset[mode])) errors.push(`${preset.name}.${mode} missing ${key}`)
			const values = resolveTokens({ ...preset.light, ...preset[mode] })
			errors.push(
				...validateReferences(values, external).map((error) => `${preset.name}.${mode}: ${error}`),
			)
		}
	}
	for (const [alias, target] of Object.entries(componentUtilityAliases)) {
		if (alias === target) errors.push(`Self-referencing utility alias ${alias}`)
		if (alias in foundationDefaults || alias in systemDefaults || alias in componentDefaults)
			errors.push(`Utility alias ${alias} overwrites an owned token`)
	}
	return errors
}
if (import.meta.main) {
	const errors = validateTokenSystem()
	if (errors.length) {
		console.error(errors.join('\n'))
		process.exit(1)
	}
	console.log('All preset dependency graphs are complete and acyclic.')
}
