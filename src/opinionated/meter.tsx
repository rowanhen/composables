'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Meter as Root,
	MeterIndicator,
	MeterLabel,
	MeterTrack,
	MeterValue,
} from '../components/keyframery/meter'

export type MeterProps = ComponentProps<typeof Root> & {
	label?: ReactNode
	showValue?: boolean
}

export function Meter({ label, showValue = true, children, ...props }: MeterProps) {
	return (
		<Root {...props}>
			{children ?? (
				<>
					<MeterLabel>{label}</MeterLabel>
					{showValue && <MeterValue />}
					<MeterTrack>
						<MeterIndicator />
					</MeterTrack>
				</>
			)}
		</Root>
	)
}

export { MeterIndicator, MeterLabel, MeterTrack, MeterValue }
