'use client'

import type { ComponentProps } from 'react'
import {
	Combobox as Root,
	ComboboxContent,
	ComboboxControl,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxLabel,
	ComboboxList,
	ComboboxTrigger,
} from '../../components/keyframery/combobox'

export type ComboboxProps = Pick<
	ComponentProps<typeof Root<string, false>>,
	'items' | 'disabled' | 'required' | 'name' | 'speed'
> & {
	value?: string | null
	defaultValue?: string | null
	onValueChange?: (value: string | null) => void

	label: string
	placeholder?: string
	emptyMessage?: string
	className?: string
}

export function Combobox({
	label,
	placeholder,
	emptyMessage = 'No options found.',
	className,
	...props
}: ComboboxProps) {
	return (
		<Root {...props}>
			<div className={className}>
				<ComboboxLabel>{label}</ComboboxLabel>
				<ComboboxControl>
					<ComboboxInput placeholder={placeholder} />
					<ComboboxTrigger aria-label={`Show options for ${label}`} />
				</ComboboxControl>
			</div>
			<ComboboxContent>
				<ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
				<ComboboxList />
			</ComboboxContent>
		</Root>
	)
}
