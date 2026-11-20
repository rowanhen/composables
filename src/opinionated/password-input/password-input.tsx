'use client'

import type { ComponentProps } from 'react'
import {
	PasswordInput as Root,
	PasswordInputCapsLock,
	PasswordInputControl,
	PasswordInputToggle,
} from '../../components/keyframery/password-input'
import { Field, FieldLabel } from '../field/field'

export type PasswordInputProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	label?: string
	inputProps?: ComponentProps<typeof PasswordInputControl>
}

export function PasswordInput({ label, inputProps, ...props }: PasswordInputProps) {
	const input = (
		<Root {...props}>
			<PasswordInputControl {...inputProps} />
			<PasswordInputCapsLock />
			<PasswordInputToggle aria-label="Show password" />
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
