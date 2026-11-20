'use client'

import type { ComponentProps } from 'react'
import {
	OTPInput as Root,
	OTPInputGroup,
	OTPInputSlot,
} from '../../components/keyframery/otp-input'

export type OTPInputProps = ComponentProps<typeof Root>

export function OTPInput({
	maxLength = 6,
	'aria-label': label = 'Verification code',
	children,
	...props
}: OTPInputProps) {
	return (
		<Root maxLength={maxLength} aria-label={label} {...props}>
			{children ??
				(({ slots }) => (
					<OTPInputGroup>
						{slots.map((_, index) => (
							<OTPInputSlot key={index} index={index} />
						))}
					</OTPInputGroup>
				))}
		</Root>
	)
}

export {
	createOTPInputController,
	OTPInputGroup,
	OTPInputSeparator,
	OTPInputSlot,
} from '../../components/keyframery/otp-input'
