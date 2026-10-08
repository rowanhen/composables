import { expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { LayerCard, TableOfContents, Flow, ClipboardText } from '../src'

test('public LayerCard API includes layered and single-surface modes', () => {
	const layered = renderToStaticMarkup(
		<LayerCard title="Next steps" footer="Last updated">
			<p>Content</p>
		</LayerCard>,
	)
	expect(layered).toContain('data-layered="true"')
	expect(layered).toContain('layer-card-primary')
	expect(layered).toContain('Next steps')
	const surface = renderToStaticMarkup(<LayerCard>Plain content</LayerCard>)
	expect(surface).toContain('data-layered="false"')
	expect(surface).not.toContain('layer-card-primary')
})
test('nested table of contents renders native links and current-location semantics', () => {
	const html = renderToStaticMarkup(
		<TableOfContents
			activeId="install"
			items={[
				{ id: 'start', label: 'Start' },
				{ id: 'setup', label: 'Setup', children: [{ id: 'install', label: 'Install' }] },
			]}
		/>,
	)
	expect(html).toContain('aria-label="Table of contents"')
	expect(html).toContain('href="#install"')
	expect(html).toContain('aria-current="location"')
	expect(html).toContain('table-of-contents-group')
})
test('Flow content is available during server rendering before geometry is measured', () => {
	const html = renderToStaticMarkup(
		<Flow
			steps={[
				{ id: 'start', label: 'Start' },
				{
					id: 'branches',
					branches: [
						[{ id: 'a', label: 'Branch A' }],
						[{ id: 'b', label: 'Branch B', disabled: true }],
					],
				},
				{ id: 'end', label: 'End' },
			]}
		/>,
	)
	expect(html).toContain('Branch A')
	expect(html).toContain('Branch B')
	expect(html).toContain('aria-disabled="true"')
	expect(html).not.toContain('opacity:0')
})
test('ClipboardText exposes a read-only value, a named button and live feedback region', () => {
	const html = renderToStaticMarkup(
		<ClipboardText text="masked-value" textToCopy="full-value" tooltip={false} />,
	)
	expect(html).toContain('value="masked-value"')
	expect(html).not.toContain('full-value')
	expect(html).toContain('readOnly=""')
	expect(html).toContain('aria-label="Copy to clipboard"')
	expect(html).toContain('role="status"')
})
