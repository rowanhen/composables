import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../../_storybook/gallery'
import { Select } from './select'

const meta = {
	title: 'Components/Select',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Select',
	render: () => (
		<Gallery>
			<div className="flex gap-4 flex-wrap">
				<Select
					defaultValue="apple"
					placeholder="Pick a fruit"
					triggerProps={{ 'aria-label': 'Fruit' }}
					options={[
						{ value: 'apple', label: 'Apple' },
						{ value: 'banana', label: 'Banana' },
						{ value: 'cherry', label: 'Cherry' },
					]}
				/>
				<Select
					placeholder="Size"
					triggerProps={{ 'aria-label': 'Size' }}
					options={[
						{ value: 'sm', label: 'Small' },
						{ value: 'md', label: 'Medium' },
						{ value: 'lg', label: 'Large', disabled: true },
					]}
				/>
			</div>
		</Gallery>
	),
}
