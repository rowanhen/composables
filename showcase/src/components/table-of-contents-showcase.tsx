import { useState } from 'react'
import {
	TableOfContents,
	type TableOfContentsItemData,
} from '@/components/ui-opinionated/table-of-contents'
import { ShowcaseSection, ShowcaseGroup } from './showcase-section'

const items: TableOfContentsItemData[] = [
	{ id: 'toc-introduction', label: 'Introduction' },
	{
		id: 'toc-installation',
		label: 'Installation',
		href: '#toc-installation',
		children: [
			{ id: 'toc-imports', label: 'Package imports' },
			{ id: 'toc-styles', label: 'Styles and presets' },
		],
	},
	{ id: 'toc-usage', label: 'Usage' },
]
export function TableOfContentsShowcase() {
	const [active, setActive] = useState('toc-introduction')
	return (
		<ShowcaseSection
			title="Table of contents"
			description="Section navigation with an active rail, nested groups, and optional scroll tracking."
		>
			<div className="grid gap-10 md:grid-cols-2">
				<ShowcaseGroup label="Controlled navigation">
					<TableOfContents items={items} activeId={active} onActiveIdChange={setActive} />
					<p className="mt-3 text-xs text-content-secondary">Current section: {active}</p>
				</ShowcaseGroup>
				<ShowcaseGroup label="Compound navigation">
					<TableOfContents aria-label="Example document navigation">
						<TableOfContents.Title>Documentation</TableOfContents.Title>
						<TableOfContents.List>
							<TableOfContents.Item href="#toc-introduction" active>
								Introduction
							</TableOfContents.Item>
							<TableOfContents.Group label="Getting started">
								<TableOfContents.Item href="#toc-imports">Package imports</TableOfContents.Item>
								<TableOfContents.Item href="#toc-styles">Styles and presets</TableOfContents.Item>
							</TableOfContents.Group>
							<TableOfContents.Item href="#toc-usage">Usage</TableOfContents.Item>
						</TableOfContents.List>
					</TableOfContents>
				</ShowcaseGroup>
			</div>
			<div className="mt-10 grid items-start gap-8 md:grid-cols-[1fr_12rem]">
				<article className="space-y-12 rounded-lg border border-stroke bg-surface-default p-6">
					{[
						{
							id: 'toc-introduction',
							title: 'Introduction',
							text: 'Use familiar anchors and a clear active indicator to help readers find their way through longer pages.',
						},
						{
							id: 'toc-installation',
							title: 'Installation',
							text: 'All four components are exported from the package root.',
						},
						{
							id: 'toc-imports',
							title: 'Package imports',
							text: 'Import TableOfContents, LayerCard, Flow, and ClipboardText from @leitware/composables.',
						},
						{
							id: 'toc-styles',
							title: 'Styles and presets',
							text: 'Import styles.css once and add the Kumo preset for the Cloudflare-inspired treatment.',
						},
						{
							id: 'toc-usage',
							title: 'Usage',
							text: 'Pass items for the opinionated API, or compose the sub-components for custom navigation.',
						},
					].map((section) => (
						<section key={section.id} id={section.id} className="min-h-32 scroll-mt-24">
							<h3 className="text-base font-semibold">{section.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-content-secondary">{section.text}</p>
						</section>
					))}
				</article>
				<TableOfContents
					items={items}
					trackScroll
					className="sticky top-8"
					aria-label="Scroll tracking example"
				/>
			</div>
		</ShowcaseSection>
	)
}
