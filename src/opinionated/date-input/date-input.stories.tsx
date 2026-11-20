import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateInput } from '@leitware/composables'

const meta = { title: 'Components/Date Input' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Date Input',
	render: () => <DateInput aria-label="Release date" defaultValue="2026-11-20" />,
}
