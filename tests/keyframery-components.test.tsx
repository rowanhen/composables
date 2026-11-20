import { expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
	Button,
	Carousel,
	Command,
	CommandInput,
	DescriptionList,
	Dialog,
	DialogClose,
	FormCheckbox,
	Stat,
	Tabs,
	Typography,
	typographyVariants,
} from '../src'

test('CommandInput supplies an inset search row around the native control', () => {
	const markup = renderToStaticMarkup(
		<Command>
			<CommandInput aria-label="Search commands" name="query" />
		</Command>,
	)

	expect(markup).toMatch(/data-slot="command-search"[^>]*><svg[^>]+aria-hidden="true"/)
	expect(markup).toMatch(/<input(?=[^>]*name="query")(?=[^>]*aria-label="Search commands")/)
})

test('Carousel assembles the public items and requested navigation', () => {
	const markup = renderToStaticMarkup(
		<Carousel
			aria-label="Photos"
			items={['First', 'Second']}
			slidesPerPage={2}
			showNavigation
			showPlayToggle
		/>,
	)

	expect(markup.match(/data-slot="carousel-item"/g)).toHaveLength(2)
	expect(markup).toContain('flex-basis:calc((100% - 1 * var(--carousel-gap, 0.75rem)) / 2)')
	expect(markup).toContain('Previous slide')
	expect(markup).toContain('Next slide')
	expect(markup).toContain('Play slideshow')
})

test('Stat composes Badge for semantic delta tones and retains the trend label', () => {
	const render = (delta: number, downIsGood = false) =>
		renderToStaticMarkup(<Stat label="Revenue" value={40} delta={delta} downIsGood={downIsGood} />)

	const positiveDecrease = render(-0.12, true)
	expect(positiveDecrease).toContain('data-trend="down"')
	expect(positiveDecrease).toMatch(/<span(?=[^>]*data-slot="badge")(?=[^>]*data-variant="success")/)
	expect(positiveDecrease).toContain('>down 12%</span>')
	expect(render(-0.12)).toContain('data-variant="destructive"')
	expect(render(0)).toContain('data-variant="secondary"')
	expect(renderToStaticMarkup(<Stat label="Revenue" value={40} />)).not.toContain(
		'data-slot="stat-delta"',
	)
})

test('Typography restores semantic elements and opts into Keyframery reveal', () => {
	const markup = renderToStaticMarkup(
		<>
			<Typography>Body copy</Typography>
			<Typography as="a" variant="link-100" href="/settings">
				Settings
			</Typography>
			<Typography as="h2" variant="heading-300" motion="reveal" speed="slow">
				Workspace
			</Typography>
		</>,
	)

	expect(markup).toMatch(/<p[^>]+data-variant="body-200"[^>]*>Body copy<\/p>/)
	expect(markup).toMatch(/<a[^>]+href="\/settings"[^>]*>Settings<\/a>/)
	expect(markup).toMatch(/<h2[^>]+motion-safe:starting:opacity-0[^>]+--kf-speed:1.4[^>]*>/)
	expect(typographyVariants({ variant: 'hero-400' })).toContain('text-7xl')
})

test('public Keyframery controls render on the server', () => {
	const markup = renderToStaticMarkup(
		<>
			<Button variant="primary">Save settings</Button>
			<FormCheckbox label="Enable notifications" defaultChecked />
		</>,
	)

	expect(markup).toContain('data-slot="button"')
	expect(markup).toContain('Save settings')
	expect(markup).toContain('role="checkbox"')
	expect(markup).toContain('Enable notifications')
})

test.each(['default', 'primary'] as const)(
	'dialog %s actions use the standalone button tokens',
	(variant) => {
		const button = renderToStaticMarkup(<Button variant={variant}>Standalone</Button>)
		const dialog = renderToStaticMarkup(
			<Dialog
				defaultOpen
				title="Confirm settings"
				footer={<DialogClose variant={variant}>Confirm</DialogClose>}
			/>,
		)
		const standalone = button.match(/<button[^>]*class="([^"]+)"/)?.[1]?.split(' ') ?? []
		const action = dialog.match(/<button[^>]*class="([^"]+)"[^>]*>Confirm<\/button>/)?.[1]
		const sharedTokens = standalone.filter((className) => className.includes('var(--button-'))

		expect(sharedTokens.length).toBeGreaterThan(4)
		expect(action?.split(' ')).toEqual(expect.arrayContaining(sharedTokens))
	},
)

test('opinionated Tabs and DescriptionList compose native semantics', () => {
	const markup = renderToStaticMarkup(
		<>
			<Tabs
				ariaLabel="Settings"
				defaultValue="overview"
				items={[{ value: 'overview', label: 'Overview', content: 'Workspace details' }]}
			/>
			<DescriptionList items={[{ id: 'region', term: 'Region', value: 'Europe' }]} />
		</>,
	)

	expect(markup).toContain('role="tablist"')
	expect(markup).toContain('Workspace details')
	expect(markup).toMatch(/<dl[\s>]/)
	expect(markup).toMatch(/<dt[^>]*>Region<\/dt>/)
	expect(markup).toMatch(/<dd[\s>]/)
})
