import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Combobox, Dialog, DialogClose, Tabs } from '@leitware/composables'
import './keyframery-preset.css'

const meta = {
	title: 'Foundations/Preset example',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Settings({ preset = false }: { preset?: boolean }) {
	const [tab, setTab] = useState<string | null>('profile')
	const [region, setRegion] = useState<string | null>('eu')
	const [open, setOpen] = useState(false)

	return (
		<section className="mx-auto max-w-md space-y-6" data-keyframery-preset={preset || undefined}>
			<h1 className="text-xl font-semibold">Workspace settings</h1>
			<Tabs
				ariaLabel="Workspace sections"
				value={tab}
				onValueChange={setTab}
				items={[
					{
						value: 'profile',
						label: 'Profile',
						content: (
							<Combobox
								label="Region"
								placeholder="Choose a region"
								value={region}
								onValueChange={setRegion}
								items={[
									{ value: 'eu', label: 'Europe' },
									{ value: 'us', label: 'North America' },
									{ value: 'apac', label: 'Asia Pacific' },
								]}
							/>
						),
					},
					{
						value: 'security',
						label: 'Security',
						content: (
							<Dialog
								trigger="Reset access"
								title="Reset workspace access?"
								description="Members will need to sign in again."
								open={open}
								onOpenChange={setOpen}
								footer={
									<>
										<DialogClose>Cancel</DialogClose>
										<DialogClose variant="destructive">Reset access</DialogClose>
									</>
								}
							/>
						),
					},
				]}
			/>
		</section>
	)
}

export const Default: Story = { render: () => <Settings /> }
export const KeyframeryPreset: Story = { render: () => <Settings preset /> }
