import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	visibleWaterfallRows,
	Waterfall,
	WaterfallAxis,
	WaterfallBar,
	WaterfallColumnHeader,
	WaterfallHeaderRow,
	WaterfallIndicator,
	WaterfallMark,
	WaterfallRow,
	WaterfallRowHeader,
	type WaterfallData,
} from '@leitware/composables'

const meta = { title: 'Components/Waterfall' } satisfies Meta
export default meta

const spans: WaterfallData = [
	{
		value: 'page',
		label: 'Page load',
		start: 0,
		duration: 240,
		children: [
			{ value: 'html', label: 'HTML', start: 0, duration: 100 },
			{ value: 'css', label: 'Stylesheet', start: 95, duration: 145 },
		],
	},
	{ value: 'image', label: 'Cover image', start: 125, duration: 80 },
]

export const Overview: StoryObj<typeof meta> = {
	name: 'Waterfall',
	render: () => (
		<Waterfall aria-label="Request timings" items={spans} defaultExpanded={['page']}>
			<WaterfallHeaderRow>
				<WaterfallColumnHeader>Request</WaterfallColumnHeader>
				<WaterfallColumnHeader aria-label="Timing">
					<WaterfallAxis />
					<WaterfallMark time={200}>Ready</WaterfallMark>
				</WaterfallColumnHeader>
			</WaterfallHeaderRow>
			{visibleWaterfallRows(spans, ['page']).map(({ item }) => (
				<WaterfallRow key={item.value} value={item.value}>
					<WaterfallRowHeader>
						{item.children && <WaterfallIndicator />}
						{item.label}
					</WaterfallRowHeader>
					<WaterfallBar />
				</WaterfallRow>
			))}
		</Waterfall>
	),
}
