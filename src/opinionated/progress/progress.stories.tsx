import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../../_storybook/gallery'
import {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
} from '../../components/keyframery/progress'
import { Progress as ProgressOpinionated } from './progress'

const meta = {
	title: 'Components/Progress',
	component: Progress,
	args: { value: 60 },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

function ProgressDemo() {
	const [animated, setAnimated] = React.useState(25)

	React.useEffect(() => {
		if (navigator.webdriver) return
		const timer = setInterval(() => {
			setAnimated((prev) => (prev >= 100 ? 0 : prev + 5))
		}, 500)
		return () => clearInterval(timer)
	}, [])

	return (
		<Gallery title="Progress" description="Displays task completion status as a progress bar.">
			<div className="flex flex-col gap-6">
				<Group label="Basic">
					<div className="flex flex-col gap-3 max-w-md">
						<Progress value={0}>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={25}>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={50}>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={75}>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={100}>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
					</div>
				</Group>

				<Group label="With Label">
					<div className="flex flex-col gap-3 max-w-md">
						<Progress value={65}>
							<div className="flex gap-4 justify-between mb-1">
								<ProgressLabel>Uploading files...</ProgressLabel>
								<ProgressValue />
							</div>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={100}>
							<div className="flex gap-4 justify-between mb-1">
								<ProgressLabel>Complete</ProgressLabel>
								<ProgressValue />
							</div>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
					</div>
				</Group>

				<Group label="Animated">
					<div className="max-w-md">
						<Progress value={animated}>
							<div className="flex gap-4 justify-between mb-1">
								<ProgressLabel>Processing...</ProgressLabel>
								<ProgressValue />
							</div>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
					</div>
				</Group>

				<Group label="Pending progress">
					<div className="max-w-md">
						<ProgressOpinionated value={null} label="Preparing export" />
					</div>
				</Group>
			</div>
		</Gallery>
	)
}

export const Overview: Story = {
	name: 'Progress',
	render: () => <ProgressDemo />,
}
