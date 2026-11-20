'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Collapsible as Root,
	CollapsiblePanel,
	CollapsibleTrigger,
} from '../../components/keyframery/collapsible'

export type CollapsibleProps = ComponentProps<typeof Root> & {
	trigger?: ReactNode
}

export function Collapsible({ trigger, children, ...props }: CollapsibleProps) {
	return (
		<Root {...props}>
			{trigger === undefined ? (
				children
			) : (
				<>
					<CollapsibleTrigger>{trigger}</CollapsibleTrigger>
					<CollapsiblePanel>{children}</CollapsiblePanel>
				</>
			)}
		</Root>
	)
}

export { CollapsiblePanel as CollapsibleContent, CollapsibleTrigger }
