import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery } from '../_storybook/gallery'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable'

const meta = {
	title: 'Utilities/Resizable',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
	name: 'Resizable',
	render: () => (
		<Gallery>
			<div className="max-w-2xl">
				<ResizablePanelGroup orientation="horizontal" className="rounded-lg border border-stroke">
					<ResizablePanel defaultSize="50%">
						<div className="flex h-32 items-center justify-center p-4">
							<p className="text-sm">Panel A</p>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize="50%">
						<ResizablePanelGroup orientation="vertical">
							<ResizablePanel defaultSize="50%">
								<div className="flex h-full items-center justify-center p-4">
									<p className="text-sm">Panel B</p>
								</div>
							</ResizablePanel>
							<ResizableHandle />
							<ResizablePanel defaultSize="50%">
								<div className="flex h-full items-center justify-center p-4">
									<p className="text-sm">Panel C</p>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</Gallery>
	),
}
