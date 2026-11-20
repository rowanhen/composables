import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, ButtonGroup, ButtonGroupText } from '@leitware/composables'

const meta = { title: 'Components/Button Group' } satisfies Meta
export default meta

function PageControls() {
	const [page, setPage] = useState(1)

	return (
		<ButtonGroup aria-label="Result pages">
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Previous page
			</Button>
			<ButtonGroupText>
				<output>Page {page} of 3</output>
			</ButtonGroupText>
			<Button disabled={page === 3} onClick={() => setPage(page + 1)}>
				Next page
			</Button>
		</ButtonGroup>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'Button Group',
	render: () => <PageControls />,
}
