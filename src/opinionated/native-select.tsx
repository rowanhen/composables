import type { ComponentProps } from 'react'

import {
	NativeSelect as NativeSelectPrimitive,
	NativeSelectOptGroup,
	NativeSelectOption,
} from '../components/keyframery/native-select'

export interface NativeSelectOptionData {
	label: string
	value: string
	disabled?: boolean
}

export interface NativeSelectProps extends Omit<
	ComponentProps<typeof NativeSelectPrimitive>,
	'children'
> {
	options: NativeSelectOptionData[]
	placeholder?: string
}

function NativeSelect({ options, placeholder, ...selectProps }: NativeSelectProps) {
	return (
		<NativeSelectPrimitive {...selectProps}>
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
