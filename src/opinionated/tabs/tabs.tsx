'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Tabs as Root,
	TabsList,
	TabsPanel,
	TabsPanels,
	TabsTab,
} from '../../components/keyframery/tabs'

export interface TabItem {
	value: string
	label: string
	content: ReactNode
	disabled?: boolean
}

export type TabsProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	items: readonly TabItem[]
	ariaLabel: string
}

export function Tabs({ items, ariaLabel, ...props }: TabsProps) {
	return (
		<Root {...props}>
			<TabsList aria-label={ariaLabel}>
				{items.map(({ value, label, disabled }) => (
					<TabsTab key={value} value={value} disabled={disabled}>
						{label}
					</TabsTab>
				))}
			</TabsList>
			<TabsPanels>
				{items.map(({ value, content }) => (
					<TabsPanel key={value} value={value}>
						{content}
					</TabsPanel>
				))}
			</TabsPanels>
		</Root>
	)
}
