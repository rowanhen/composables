import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Gallery, Group } from '../_storybook/gallery'
import {
	Progress,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
} from '../_internal/progress'
import { Progress as ProgressOpinionated } from './progress'
import { HStack, VStack } from '../_internal/stack'

const meta = {
	title: 'Data/Progress',
	component: Progress,
	args: { value: 60 },
	parameters: {
		docs: {
			description: { component: 'Progress bars and completion indicators.' },
		},
	},
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
			<VStack gap={6}>
				<Group label="Basic">
					<VStack gap={3} className="max-w-md">
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
					</VStack>
				</Group>

				<Group label="With Label">
					<VStack gap={3} className="max-w-md">
						<Progress value={65}>
							<HStack justify="between" className="mb-1">
								<ProgressLabel>Uploading files...</ProgressLabel>
								<ProgressValue />
							</HStack>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
						<Progress value={100}>
							<HStack justify="between" className="mb-1">
								<ProgressLabel>Complete</ProgressLabel>
								<ProgressValue />
							</HStack>
							<ProgressTrack>
								<ProgressIndicator variant="success" />
							</ProgressTrack>
						</Progress>
					</VStack>
				</Group>

				<Group label="Animated">
					<div className="max-w-md">
						<Progress value={animated}>
							<HStack justify="between" className="mb-1">
								<ProgressLabel>Processing...</ProgressLabel>
								<ProgressValue />
							</HStack>
							<ProgressTrack>
								<ProgressIndicator />
							</ProgressTrack>
						</Progress>
					</div>
				</Group>

				<Group label="Variants (primitive)">
					<VStack gap={3} className="max-w-md">
						<Progress value={60}>
							<ProgressTrack>
								<ProgressIndicator variant="default" />
							</ProgressTrack>
						</Progress>
						<Progress value={80}>
							<ProgressTrack>
								<ProgressIndicator variant="success" />
							</ProgressTrack>
						</Progress>
						<Progress value={45}>
							<ProgressTrack>
								<ProgressIndicator variant="warning" />
							</ProgressTrack>
						</Progress>
						<Progress value={20}>
							<ProgressTrack>
								<ProgressIndicator variant="destructive" />
							</ProgressTrack>
						</Progress>
					</VStack>
				</Group>

				<Group label="Variants (opinionated)">
					<VStack gap={3} className="max-w-md">
						<ProgressOpinionated value={80} label="Default" showValue />
						<ProgressOpinionated value={80} variant="success" label="Success" showValue />
						<ProgressOpinionated value={45} variant="warning" label="Warning" showValue />
						<ProgressOpinionated value={20} variant="destructive" label="Destructive" showValue />
					</VStack>
				</Group>
			</VStack>
		</Gallery>
	)
}

export const Overview: Story = {
	render: () => <ProgressDemo />,
}
