'use client'

import type { ComponentProps, ReactNode } from 'react'
import { Toggle as Root, ToggleIcon } from '../../components/keyframery/toggle'

export type ToggleProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	children?: ReactNode
}

export function Toggle({ leftIcon, rightIcon, children, ...props }: ToggleProps) {
	return (
		<Root {...props}>
			{leftIcon != null && <ToggleIcon>{leftIcon}</ToggleIcon>}
			{children}
			{rightIcon != null && <ToggleIcon>{rightIcon}</ToggleIcon>}
		</Root>
	)
}
