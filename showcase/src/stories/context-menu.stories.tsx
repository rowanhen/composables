import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ContextMenu, ContextMenuTrigger } from '@leitware/composables'

const meta = { title: 'Components/Context Menu' } satisfies Meta
export default meta

function FileActions() {
	const [action, setAction] = useState('')

	return (
		<div className="space-y-2">
			<ContextMenu
				items={[
					{ value: 'renamed', label: 'Rename' },
					{ value: 'duplicated', label: 'Duplicate' },
					{ type: 'separator' },
					{ value: 'archived', label: 'Archive', destructive: true },
				]}
				onAction={(value) => setAction(value)}
			>
				<ContextMenuTrigger
					role="group"
					aria-label="Quarterly report"
					tabIndex={0}
					className="w-fit rounded-md border px-8 py-5"
				>
					<p className="font-medium">Quarterly report</p>
					<p className="text-sm text-content-muted">Right-click or press Shift+F10 for actions.</p>
				</ContextMenuTrigger>
			</ContextMenu>
			<output>{action && `Report ${action}`}</output>
		</div>
	)
}

export const Overview: StoryObj<typeof meta> = {
	name: 'Context Menu',
	render: () => <FileActions />,
}
