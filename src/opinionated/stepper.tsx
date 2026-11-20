'use client'

import type { ComponentProps, ReactNode } from 'react'
import {
	Stepper as Root,
	StepperList,
	StepperPanel,
	type StepperStepData,
} from '../components/keyframery/stepper'

export type StepperStep = StepperStepData & { content?: ReactNode }

export type StepperProps = Omit<ComponentProps<typeof Root>, 'children' | 'steps'> & {
	steps: readonly StepperStep[]
	/** Additional controls rendered after the panels. */
	children?: ReactNode
}

export function Stepper({ steps, children, ...props }: StepperProps) {
	const stepOptions = steps.map(({ value, label, description, error, disabled }) => ({
		value,
		label,
		description,
		error,
		disabled,
	}))

	return (
		<Root steps={stepOptions} {...props}>
			<StepperList />
			{steps.map(
				({ value, content }) =>
					content != null && (
						<StepperPanel key={value} value={value}>
							{content}
						</StepperPanel>
					),
			)}
			{children}
		</Root>
	)
}
