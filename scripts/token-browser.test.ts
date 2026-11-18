import { afterAll, beforeAll, expect, test } from 'bun:test'
import { chromium, type Browser, type Page } from '@playwright/test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Button } from '../src/_internal/button'
import { Input } from '../src/_internal/input'
import { presetDefinitions } from '../src/styles/presets-data'
import { createPresetCSS } from '../src/styles/tokens/preset'

const root = join(import.meta.dir, '..')
const css = readFileSync(join(root, 'dist/styles.css'), 'utf8')
let browser: Browser
let page: Page
beforeAll(async () => {
	browser = await chromium.launch()
	page = await browser.newPage()
})
afterAll(async () => {
	await browser?.close()
})
const controls = () =>
	renderToStaticMarkup(
		createElement(
			'div',
			{},
			createElement(Button, { id: 'button' }, 'Save'),
			createElement(Input, { id: 'input', placeholder: 'Name' }),
			createElement(Button, { id: 'brand', variant: 'brand' }, 'Brand'),
			createElement(
				Button,
				{ id: 'override', className: 'h-12 bg-fill-critical text-on-fill-primary rounded-full' },
				'Override',
			),
		),
	)
async function computed(id: string, property: string) {
	return page
		.locator(`#${id}`)
		.evaluate((el, property) => getComputedStyle(el).getPropertyValue(property), property)
}
async function resolved(id: string, property: string, variable: string) {
	return page.locator(`#${id}`).evaluate(
		(el, { property, variable }) => {
			const probe = document.createElement('span')
			probe.style.setProperty(property, `var(${variable})`)
			el.appendChild(probe)
			const value = getComputedStyle(probe).getPropertyValue(property)
			probe.remove()
			return value
		},
		{ property, variable },
	)
}

for (const preset of presetDefinitions)
	for (const mode of ['light', 'dark'] as const) {
		test(`${preset.name} ${mode}: actual components consume colour, size, type and caller overrides`, async () => {
			await page.mouse.move(1200, 600)
			await page.setContent(
				`<html class="${mode === 'dark' ? 'dark' : ''}"><head><style>${css}\n${createPresetCSS(preset)}</style></head><body>${controls()}</body></html>`,
			)
			expect(await computed('button', 'background-color')).toBe(
				await resolved('button', 'background-color', '--bg-fill-primary'),
			)
			expect(await computed('button', 'height')).toBe(
				await resolved('button', 'height', '--button-height'),
			)
			expect(await computed('button', 'font-size')).toBe(
				await resolved('button', 'font-size', '--button-font-size'),
			)
			expect(await computed('brand', 'font-weight')).toBe(
				await resolved('brand', 'font-weight', '--button-brand-font-weight'),
			)
			const expectedBorder = await page.locator('#brand').evaluate((el) => {
				const probe = document.createElement('span')
				probe.style.borderColor = 'var(--button-brand-border-color,var(--border-brand))'
				el.appendChild(probe)
				const color = getComputedStyle(probe).borderColor
				probe.remove()
				return color
			})
			expect(await computed('brand', 'border-color')).toBe(expectedBorder)
			await page.locator('#brand').hover()
			const expectedHoverBorder = await page.locator('#brand').evaluate((el) => {
				const probe = document.createElement('span')
				probe.style.borderColor = 'var(--button-brand-border-color-hover,var(--hover-ring-color))'
				el.appendChild(probe)
				const color = getComputedStyle(probe).borderColor
				probe.remove()
				return color
			})
			expect(await computed('brand', 'border-color')).toBe(expectedHoverBorder)

			expect(await computed('input', 'background-color')).toBe(
				await resolved('button', 'background-color', '--control-background'),
			)
			expect(await computed('override', 'background-color')).toBe(
				await resolved('button', 'background-color', '--bg-fill-critical'),
			)
			expect(await computed('override', 'height')).toBe(
				await page.locator('#button').evaluate((el) => {
					const probe = document.createElement('div')
					probe.style.height = 'calc(var(--spacing) * 12)'
					el.appendChild(probe)
					const height = getComputedStyle(probe).height
					probe.remove()
					return height
				}),
			)
		})
	}

test('scoped theme resolves references locally and can switch dark mode', async () => {
	const custom = {
		light: {
			...presetDefinitions[1].light,
			'--bg-fill-primary': '#123456',
			'--control-size-md': '80px',
			'--button-height': 'var(--control-size-md)',
		},
		dark: {
			...presetDefinitions[1].dark,
			'--bg-fill-primary': '#abcdef',
			'--control-size-md': '90px',
			'--button-height': 'var(--control-size-md)',
		},
	}
	await page.setContent(
		`<style>${css}\n${createPresetCSS(custom, '#scope')}</style><div id="scope">${controls()}</div>`,
	)
	expect(await computed('button', 'background-color')).toBe('rgb(18, 52, 86)')
	expect(await computed('button', 'height')).toBe('80px')
	await page.locator('#scope').evaluate((el) => el.classList.add('dark'))
	expect(await computed('button', 'background-color')).toBe('rgb(171, 205, 239)')
	expect(await computed('button', 'height')).toBe('90px')
})

test('motion preferences override complete preset defaults', async () => {
	await page.setContent(
		`<html data-motion="none"><style>${css}</style><body>${controls()}</body></html>`,
	)
	expect(await computed('button', 'transition-duration')).toBe('0s')
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.locator('html').evaluate((el) => el.removeAttribute('data-motion'))
	expect(await computed('button', 'transition-duration')).toBe('0s')
	await page.emulateMedia({ reducedMotion: 'no-preference' })
})

test('scoped motion policy outranks a later imported preset', async () => {
	const presetCSS = readFileSync(join(root, 'dist/presets/kumo.css'), 'utf8')
	await page.setContent(
		`<style>${css}\n${presetCSS}</style><section data-preset="kumo" data-motion="none" class="dark">${controls()}</section>`,
	)
	expect(await computed('button', 'transition-duration')).toBe('0s')
})

test('card and accordion expose independent surface, shape, spacing and motion settings', async () => {
	const { Card, CardDescription } = await import('../src/_internal/card')
	const { Accordion, AccordionItem, AccordionTrigger, AccordionContent } =
		await import('../src/_internal/accordion')
	const markup = renderToStaticMarkup(
		createElement(
			'div',
			{},
			createElement(
				Card,
				{ id: 'card' },
				createElement(CardDescription, { id: 'description' }, 'Details'),
			),
			createElement(
				Accordion,
				{ id: 'accordion', defaultValue: ['one'] },
				createElement(
					AccordionItem,
					{ value: 'one' },
					createElement(AccordionTrigger, { id: 'trigger' }, 'Details'),
					createElement(AccordionContent, {}, 'Panel'),
				),
			),
		),
	)
	const base = presetDefinitions[1]
	const light = {
		...base.light,
		'--card-background': '#123456',
		'--card-content': '#fedcba',
		'--card-border-color': '#abcdef',
		'--card-description': '#aabbcc',
		'--card-radius': '19px',
		'--card-padding': '23px',
		'--card-shadow': '0px 2px 8px #00000040',
		'--card-duration': '321ms',
		'--accordion-background': '#654321',
		'--accordion-radius': '13px',
		'--accordion-padding': '7px',
		'--accordion-duration': '234ms',
	}
	await page.setContent(
		`<style>${css}\n${createPresetCSS({ light, dark: base.dark })}</style>${markup}`,
	)
	for (const [property, token] of [
		['background-color', '--card-background'],
		['color', '--card-content'],
		['border-color', '--card-border-color'],
		['border-radius', '--card-radius'],
		['padding-top', '--card-padding'],
		['transition-duration', '--card-duration'],
	])
		expect(await computed('card', property)).toBe(await resolved('card', property, token))
	expect(await computed('card', 'box-shadow')).toContain(
		await resolved('card', 'box-shadow', '--card-shadow'),
	)
	expect(await computed('description', 'color')).toBe('rgb(170, 187, 204)')
	expect(await computed('accordion', 'background-color')).toBe('rgb(101, 67, 33)')
	expect(await computed('accordion', 'border-radius')).toBe('13px')
	expect(
		await page
			.locator('[data-slot=accordion-trigger]')
			.evaluate((el) => getComputedStyle(el).paddingTop),
	).toBe('14px')
	await page.locator('html').evaluate((el) => (el.dataset.motion = 'none'))
	expect(await computed('card', 'transition-duration')).toBe('0s')
	expect(
		await page
			.locator('[data-slot="accordion-trigger-icon"]')
			.evaluate((el) => getComputedStyle(el).transitionDuration),
	).toBe('0s')
})

test('reduced motion reaches scoped themes and native duration utilities', async () => {
	const themeCSS = readFileSync(join(root, 'dist/presets/kumo.css'), 'utf8')
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.setContent(
		`<style>${css}\n${themeCSS}</style><section data-preset="kumo"><div id="motion" class="duration-normal animate-in fade-in-0">Panel</div>${controls()}</section>`,
	)
	expect(await computed('button', 'transition-duration')).toBe('0s')
	expect(await computed('motion', 'transition-duration')).toBe('0s')
	expect(await computed('motion', 'animation-duration')).toBe('0s')
	await page.locator('section').evaluate((el) => (el.dataset.motion = 'full'))
	expect(await computed('motion', 'transition-duration')).toBe('0.2s')
	await page.emulateMedia({ reducedMotion: 'no-preference' })
})
