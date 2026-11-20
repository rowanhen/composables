import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form, FormInput, FormStatus, FormSubmit } from '@leitware/composables'

const meta = { title: 'Components/Form' } satisfies Meta
export default meta

export const Overview: StoryObj<typeof meta> = {
	name: 'Form',
	render: () => (
		<Form submit={() => ({ message: 'Saved' })} className="max-w-sm space-y-3">
			<FormInput label="Workspace" name="workspace" required />
			<FormSubmit>Save workspace</FormSubmit>
			<FormStatus />
		</Form>
	),
}
