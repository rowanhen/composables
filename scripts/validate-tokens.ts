import { tokens } from '../src/styles/tokens/definitions'
import { themes } from '../src/styles/tokens/themes'
import type { TokenDefinition } from '../src/styles/tokens/schema'

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

/** Accept a supplied record so mutation tests exercise the same production validator. */
export function validateDefinitions(definitions: Record<string, TokenDefinition>): string[] {
	const errors: string[] = []
	const aliases = new Map<string, string>()
	const utilities = new Set<string>()
	for (const [name, token] of Object.entries(definitions)) {
		if (!/^--[a-z][a-z0-9-]*$/.test(name) || /brand-[2-9]/.test(name))
			errors.push(`Invalid token name ${name}`)
		if (!token.description.trim() || !token.group.trim())
			errors.push(`${name}: missing documentation`)
		for (const theme of themes) {
			const value = token.values[theme.name]
			const modes = typeof value === 'string' ? [value, value] : value
			if (!Array.isArray(modes) || modes.length !== 2) {
				errors.push(`${name}: missing ${theme.name} modes`)
				continue
			}
			for (const item of modes) {
				if (typeof item !== 'string' || !item.trim() || /[;{}<>]|var\(|\binitial\b/.test(item))
					errors.push(`${name}.${theme.name}: expected a concrete CSS value`)
			}
		}
		for (const extra of Object.keys(token.values))
			if (!themes.some((t) => t.name === extra)) errors.push(`${name}: unknown theme ${extra}`)
		for (const alias of token.tailwind) {
			if (aliases.has(alias)) errors.push(`Duplicate Tailwind registration ${alias}`)
			if (alias in definitions) errors.push(`Tailwind registration overwrites token ${alias}`)
			aliases.set(alias, name)
		}
		for (const [utility, declarations] of Object.entries(token.utilities)) {
			if (utilities.has(utility)) errors.push(`Duplicate utility ${utility}`)
			utilities.add(utility)
			for (const value of Object.values(declarations))
				if (value !== `var(${name})`) errors.push(`${utility}: must consume its own token ${name}`)
		}
	}
	return errors
}
export function validateTokenSystem(): string[] {
	return validateDefinitions(tokens)
}
if (import.meta.main) {
	const errors = validateTokenSystem()
	if (errors.length) {
		console.error(errors.join('\n'))
		process.exit(1)
	}
	console.log(
		'Complete, independent token values and collision-free utility registrations verified.',
	)
}
