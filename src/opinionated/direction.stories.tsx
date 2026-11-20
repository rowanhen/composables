import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Card } from './card'
import { DirectionProvider } from './direction'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'

const meta = {
	title: 'Utilities/Direction',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RTLContext: Story = {
	name: 'Direction',
	render: () => (
		<Gallery>
			<Group label="RTL context">
				<DirectionProvider dir="rtl">
					<Card className="max-w-md bg-surface-brand py-3 text-right text-brand">
						<p className="mb-3">واجهة عربية تجريبية</p>
						<ToggleGroup defaultValue={['one']}>
							<ToggleGroupItem value="one">واحد</ToggleGroupItem>
							<ToggleGroupItem value="two">اثنان</ToggleGroupItem>
							<ToggleGroupItem value="three">ثلاثة</ToggleGroupItem>
						</ToggleGroup>
					</Card>
				</DirectionProvider>
			</Group>
		</Gallery>
	),
}
