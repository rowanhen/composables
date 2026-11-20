'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Toggle as ToggleGroupItem,
	ToggleGroup as Root,
	ToggleIcon,
} from '../components/keyframery/toggle'

export interface ToggleGroupOption {
	label: ReactNode
	value: string
	disabled?: boolean
	icon?: ReactNode
}

export type ToggleGroupProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	options?: readonly ToggleGroupOption[]
	children?: ReactNode
}

export function ToggleGroup({ options, children, ...props }: ToggleGroupProps) {
	return (
		<Root {...props}>
			{options?.map(({ value, label, icon, disabled }) => (
				<ToggleGroupItem key={value} value={value} disabled={disabled}>
					{icon != null && <ToggleIcon>{icon}</ToggleIcon>}
					{label}
				</ToggleGroupItem>
			)) ?? children}
		</Root>
	)
}

export { ToggleGroupItem }
