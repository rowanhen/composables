import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarInput,
	ToolbarSeparator,
	ToolbarToggle,
} from '@leitware/composables'

const meta = { title: 'Components/Toolbar' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Toolbar',
	render: () => (
		<Toolbar aria-label="Text formatting">
			<ToolbarGroup aria-label="Styles">
				<ToolbarToggle>Bold</ToolbarToggle>
				<ToolbarToggle>Italic</ToolbarToggle>
			</ToolbarGroup>
			<ToolbarSeparator />
			<ToolbarInput aria-label="Search commands" placeholder="Search commands" />
		</Toolbar>
	),
}
