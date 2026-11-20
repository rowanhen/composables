import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenInput } from '@leitware/composables'

const meta = { title: 'Components/Token Input' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Token Input',
	render: () => (
		<TokenInput
			editorProps={{
				'aria-label': 'Tags',
				placeholder: 'Add a tag, then press Enter',
				className: 'max-w-sm',
			}}
		/>
	),
}
