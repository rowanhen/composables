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
import { validateReferences, validateTokenSystem } from './validate-tokens'
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
		expect(css).toContain('--control-bg: var(--bg-surface-input)')
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
