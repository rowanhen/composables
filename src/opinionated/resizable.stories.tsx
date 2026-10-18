import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../_internal/resizable'
import { Typography } from '../_internal/typography'

const meta = {
	title: 'Utilities/Resizable',
	parameters: {
		docs: {
			description: { component: 'Resizable panels and split layouts.' },
		},
	},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	render: () => (
		<Gallery>
			<div className="max-w-2xl">
				<ResizablePanelGroup orientation="horizontal" className="rounded-lg border border-stroke">
					<ResizablePanel defaultSize={50}>
						<div className="flex h-32 items-center justify-center p-4">
							<Typography variant="body-100">Panel A</Typography>
						</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={50}>
						<ResizablePanelGroup orientation="vertical">
							<ResizablePanel defaultSize={50}>
								<div className="flex h-full items-center justify-center p-4">
									<Typography variant="body-100">Panel B</Typography>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={50}>
								<div className="flex h-full items-center justify-center p-4">
									<Typography variant="body-100">Panel C</Typography>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</Gallery>
	),
}
