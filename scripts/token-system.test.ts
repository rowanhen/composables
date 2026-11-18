import { tokens } from '../src/styles/tokens/definitions'
import { lintUtilitySource, lintStylesheetSource } from './lint-utilities'
import type { SemanticUtilityClassName } from '../src/styles/tokens/registry'
import { describe, expect, test } from 'bun:test'
import {
	defineTokens,
	parseTokenOverrides,
	tokenVar,
	type TokenOverrides,
} from '../src/styles/tokens/types'
import { definePreset, createPresetCSS, resolveTokens } from '../src/styles/tokens/preset'
import { presetDefinitions } from '../src/styles/presets-data'
import { lintTokenSource } from './lint-tokens'
import { validateReferences, validateDefinitions, validateTokenSystem } from './validate-tokens'
import { cn } from '../src/lib/utils'

// These must remain compile errors. The normal typecheck includes this file.
const typed = defineTokens({ '--button-radius': '1rem' })
// @ts-expect-error unknown token
const typo: TokenOverrides = { '--buton-radius': '1rem' }
// @ts-expect-error compatibility aliases are not authoring tokens
const flat: TokenOverrides = { '--primary': 'red' }
// @ts-expect-error tokenVar does not accept arbitrary strings
tokenVar('--not-a-token')
// @ts-expect-error a background role cannot be used as a text utility
const wrongRole: SemanticUtilityClassName = 'text-surface-success'
void wrongRole
void typo
void flat

describe('typed token API', () => {
	test('references and strict overrides', () => {
		expect(tokenVar('--button-radius')).toBe('var(--button-radius)')
		expect(parseTokenOverrides(typed)).toEqual(typed)
		for (const input of [
			null,
			[],
			{ '--unknown': 'red' },
			{ '--button-radius': 2 },
			{ '--button-radius': '1px; color:red' },
		])
			expect(() => parseTokenOverrides(input)).toThrow()
	})
	test('preset extension keeps both complete modes', () => {
		const base = presetDefinitions[1]
		const preset = definePreset(base, {
			light: { '--button-radius': '9999px' },
			dark: { '--bg-fill-primary': '#abcdef' },
		})
		expect(preset.light['--button-radius']).toBe('9999px')
		expect(preset.light['--text-default']).toBe(base.light['--text-default'])
		expect(preset.dark['--bg-fill-primary']).toBe('#abcdef')
		expect(base.dark['--bg-fill-primary']).not.toBe('#abcdef')
		const css = createPresetCSS(preset, '[data-theme="custom"]')
		expect(css).toContain('[data-theme="custom"].dark, .dark [data-theme="custom"]')
		expect(css).toContain(`--control-background: ${base.light['--control-background']}`)
	})
	test('all presets resolve the same complete key set', () => {
		const keys = Object.keys(resolveTokens(presetDefinitions[0].light)).sort()
		for (const preset of presetDefinitions)
			for (const mode of ['light', 'dark'] as const)
				expect(Object.keys(resolveTokens(preset[mode])).sort()).toEqual(keys)
		expect(validateTokenSystem()).toEqual([])
	})
	test('reference validation rejects missing and cyclic dependencies', () => {
		expect(validateReferences({ '--a': 'var(--missing)' })).toHaveLength(1)
		expect(validateReferences({ '--a': 'var(--b)', '--b': 'var(--a)' })[0]).toContain('Circular')
		expect(validateReferences({ '--a': 'var(--b)', '--b': '1px' })).toEqual([])
	})
	test('authoring lint covers multiline strings, templates, variants and primitive colours', () => {
		expect(
			lintTokenSource('const x = `flex\n hover:bg-primary ${state} text-muted-foreground`'),
		).toHaveLength(2)
		expect(lintTokenSource('const x = "bg-blue-500"')).toHaveLength(1)
		expect(lintTokenSource('const x = "text-content-typo"')).toHaveLength(1)
		expect(lintTokenSource('const x = "bg-content-default"')).toHaveLength(1)
		expect(lintTokenSource('const x = "var(--button-raadius)"')).toHaveLength(1)
		expect(lintTokenSource('const x = "var(--primary)"')).toHaveLength(1)
		expect(
			lintTokenSource('const x = "bg-surface-default text-content-default hover:bg-fill-primary"'),
		).toEqual([])
	})
	test('Tailwind merge distinguishes typography from content colours', () => {
		expect(cn('text-control text-control-content', 'text-body')).toBe(
			'text-control-content text-body',
		)
		expect(cn('rounded-input', 'rounded-full')).toBe('rounded-full')
		expect(cn('h-control-md', 'h-12')).toBe('h-12')
	})
})

describe('enforced authoring contract', () => {
	test('rejects unknown, raw, constructed and untokenized classes', () => {
		for (const source of [
			'<div className="made-up" />',
			'const shared = "made-up"; const alias = shared; const element = <div className={alias} />',
			'const element = <div className={cn({"made-up": active})} />',
			'<div className="hover:made-up" />',
			'<div className="bg-[#abcdef]" />',
			'<div className="bg-black" />',
			'<svg fill="red" />',
			'<div style={{color: "rgb(1,2,3)"}} />',
			'<div style={{color: "red"}} />',
			'<div style={{borderRadius: 7}} />',
			'<div className="rounded-[7px]" />',
			'<div className="text-[17px]" />',
			'<div className={`bg-${color}`} />',
			'<div className={"bg-" + color} />',
			'const button = cva("flex", { variants: { intent: { brand: "made-up" } } })',
		])
			expect(lintUtilitySource(source), source).not.toEqual([])
	})
	test('accepts compiled utilities, static variants, structural layout and token appearance', () => {
		for (const source of [
			'<div className="flex md:grid grid-cols-[1fr_auto] hover:bg-fill-primary text-body rounded-card" />',
			'<div style={{color: "var(--text-default)"}} />',
			'<div className={active ? "bg-fill-primary" : "bg-surface-default"} />',
			'const button = cva("flex", { variants: { intent: { brand: "bg-fill-primary" } }, defaultVariants: { intent: "brand" } })',
		])
			expect(lintUtilitySource(source), source).toEqual([])
	})
	test('missing modes, hidden dependencies and duplicate utilities fail the generator validator', () => {
		const copy = () =>
			structuredClone(tokens) as unknown as Record<
				string,
				import('../src/styles/tokens/schema').TokenDefinition
			>
		const missing = copy()
		delete (missing['--card-radius'].values as Record<string, unknown>).default
		expect(validateDefinitions(missing).join()).toContain('missing default')
		const dependent = copy()
		;(dependent['--card-radius'].values as Record<string, string>).default = 'var(--radius-lg)'
		expect(validateDefinitions(dependent).join()).toContain('concrete CSS value')
		const duplicate = copy()
		duplicate['--card-padding'].tailwind = ['--radius-card']
		expect(validateDefinitions(duplicate).join()).toContain('Duplicate Tailwind')
	})
})

test('ordinary component bundles do not pull in the theme catalogue', async () => {
	const result = await Bun.build({
		entrypoints: ['src/_internal/button.tsx'],
		packages: 'external',
		target: 'browser',
	})
	expect(result.success).toBe(true)
	const output = await result.outputs[0].text()
	expect(output).not.toContain('gutenberg')
	expect(output).not.toContain('signal-pop')
	expect(output).not.toContain('values:')
})

test('authored CSS cannot bypass colour or utility enforcement', () => {
	expect(lintStylesheetSource('[data-slot=card] { color: #123456; }')).not.toEqual([])
	expect(lintStylesheetSource('.custom-card { color: var(--text-default); }')).not.toEqual([])
	expect(lintStylesheetSource('@utility custom-card { color: var(--text-default); }')).toEqual([])
})
