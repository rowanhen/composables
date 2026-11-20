'use client'

import type { ComponentProps } from 'react'
import {
	NumberInput as Root,
	NumberInputControl,
	NumberInputDecrement,
	NumberInputGroup,
	NumberInputIncrement,
} from '../components/keyframery/number-input'
import { Field, FieldLabel } from './field'

export type NumberInputProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	label?: string
	inputProps?: ComponentProps<typeof NumberInputControl>
}

export function NumberInput({ label, inputProps, ...props }: NumberInputProps) {
	const input = (
		<Root {...props}>
			<NumberInputGroup>
				<NumberInputDecrement aria-label="Decrease value" />
				<NumberInputControl {...inputProps} />
				<NumberInputIncrement aria-label="Increase value" />
			</NumberInputGroup>
		</Root>
	)

	return label ? (
		<Field disabled={props.disabled}>
			<FieldLabel>{label}</FieldLabel>
			{input}
		</Field>
	) : (
		input
	)
}
