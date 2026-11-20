'use client'

import type { ComponentProps } from 'react'
import {
	SegmentedControl as Root,
	SegmentedControlItem,
} from '../components/keyframery/segmented-control'

export interface SegmentedControlItemData {
	value: string
	label: string
	disabled?: boolean
}

export type SegmentedControlProps = ComponentProps<typeof Root> & {
	items?: readonly SegmentedControlItemData[]
}

export function SegmentedControl({ items, children, ...props }: SegmentedControlProps) {
	return (
		<Root {...props}>
			{items?.map(({ value, label, disabled }) => (
				<SegmentedControlItem key={value} value={value} disabled={disabled}>
					{label}
				</SegmentedControlItem>
			)) ?? children}
		</Root>
	)
}

export {
	SegmentedControlItem,
	createSegmentedControlController,
} from '../components/keyframery/segmented-control'
