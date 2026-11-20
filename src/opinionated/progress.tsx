'use client'

import type { ComponentProps } from 'react'
import {
	Progress as Root,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
} from '../components/keyframery/progress'

export type ProgressProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	label?: string
	showValue?: boolean
}

export function Progress({ label, showValue = false, ...props }: ProgressProps) {
	return (
		<Root {...props}>
			{(label || showValue) && (
				<div className="flex items-center justify-between">
					{label && <ProgressLabel>{label}</ProgressLabel>}
					{showValue && <ProgressValue />}
				</div>
			)}
			<ProgressTrack>
				<ProgressIndicator />
			</ProgressTrack>
		</Root>
	)
}

export { ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue }
