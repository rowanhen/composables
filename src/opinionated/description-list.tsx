'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	DescriptionList as Root,
	DescriptionListActions,
	DescriptionListCopy,
	DescriptionListDetails,
	DescriptionListItem,
	DescriptionListTerm,
	DescriptionListValue,
} from '../components/keyframery/description-list'

export type DescriptionListEntry = {
	id: string
	term: string
	value: ReactNode
	/** Copy the rendered value, or provide the exact text to copy. */
	copy?: true | string
}

export type DescriptionListProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	items: readonly DescriptionListEntry[]
}

export function DescriptionList({ items, ...props }: DescriptionListProps) {
	return (
		<Root {...props}>
			{items.map(({ id, term, value, copy }) => (
				<DescriptionListItem key={id}>
					<DescriptionListTerm>{term}</DescriptionListTerm>
					<DescriptionListDetails>
						<DescriptionListValue>{value}</DescriptionListValue>
						{copy !== undefined && (
							<DescriptionListActions>
								<DescriptionListCopy
									label={term}
									value={typeof copy === 'string' ? copy : undefined}
								/>
							</DescriptionListActions>
						)}
					</DescriptionListDetails>
				</DescriptionListItem>
			))}
		</Root>
	)
}
