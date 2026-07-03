import type * as React from 'react'

import {
	NativeSelect as NativeSelectPrimitive,
	NativeSelectOptGroup,
	NativeSelectOption,
	type NativeSelectProps as NativeSelectPrimitiveProps,
} from '../_internal/native-select'

export interface NativeSelectOptionData {
	label: string
	value: string
	disabled?: boolean
}

export interface NativeSelectProps extends Omit<NativeSelectPrimitiveProps, 'children'> {
	options: NativeSelectOptionData[]
	placeholder?: string
	onValueChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void
}

function NativeSelect({
	options,
	placeholder,
	onChange,
	onValueChange,
	...selectProps
}: NativeSelectProps) {
	return (
		<NativeSelectPrimitive
			onChange={(event) => {
				onChange?.(event)
				onValueChange?.(event.currentTarget.value, event)
			}}
			{...selectProps}
		>
			{placeholder && (
				<NativeSelectOption value="" disabled>
					{placeholder}
				</NativeSelectOption>
			)}
			{options.map((option) => (
				<NativeSelectOption key={option.value} value={option.value} disabled={option.disabled}>
					{option.label}
				</NativeSelectOption>
			))}
		</NativeSelectPrimitive>
	)
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
