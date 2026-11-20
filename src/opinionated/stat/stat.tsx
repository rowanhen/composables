'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Stat as Root,
	StatChart,
	StatComparison,
	StatDelta,
	StatGroup,
	StatIcon,
	StatLabel,
	StatValue,
} from '../../components/keyframery/stat'

export type StatProps = Omit<ComponentProps<typeof Root>, 'children' | 'label'> & {
	label: string
	icon?: ReactNode
	comparison?: ReactNode
	chart?: ReactNode
}

export function Stat({ icon, comparison, chart, ...props }: StatProps) {
	return (
		<Root {...props}>
			<StatLabel />
			{icon != null && <StatIcon>{icon}</StatIcon>}
			<StatValue />
			<StatDelta />
			{comparison != null && <StatComparison>{comparison}</StatComparison>}
			{chart != null && <StatChart>{chart}</StatChart>}
		</Root>
	)
}

export { StatGroup }
