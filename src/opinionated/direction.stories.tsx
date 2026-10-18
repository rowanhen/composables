import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import { Card } from './card'
import { DirectionProvider } from './direction'
import { ToggleGroup, ToggleGroupItem } from './toggle-group'
import { VStack } from '../_internal/stack'

const meta = {
	title: 'Utilities/Direction',
	parameters: {
		docs: {
			description: { component: 'Direction-aware layout and text rendering.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RTLContext: Story = {
	name: 'RTL context',
	render: () => (
		<Gallery>
			<Group label="RTL context">
				<DirectionProvider direction="rtl">
					<Card className="max-w-md bg-surface-brand py-3 text-right text-brand">
						<p className="mb-3">واجهة عربية تجريبية</p>
						<ToggleGroup defaultValue="one" variant="outline" spacing="sm">
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

export const More: Story = {
	render: () => (
		<Gallery>
			<VStack gap={4}></VStack>
		</Gallery>
	),
}
