'use client'

import type { ComponentProps } from 'react'
import {
	Select as SelectRoot,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '../components/keyframery/select'

export interface SelectOption {
	label: string
	value: string
	disabled?: boolean
}

export type SelectProps = Pick<
	ComponentProps<typeof SelectRoot<string, false>>,
	'disabled' | 'required' | 'name' | 'speed'
> & {
	options: SelectOption[]
	value?: string | null
	defaultValue?: string | null
	onValueChange?: (value: string | null) => void
	placeholder?: string
	className?: string
	triggerProps?: ComponentProps<typeof SelectTrigger>
	contentProps?: Pick<
		ComponentProps<typeof SelectContent>,
		'side' | 'sideOffset' | 'align' | 'alignOffset'
	>
}

export function Select({
	options,
	placeholder = 'Select…',
	className,
	triggerProps,
	contentProps,
	...props
}: SelectProps) {
	return (
		<SelectRoot<string> items={options} {...props}>
			<SelectTrigger className={className} {...triggerProps}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent {...contentProps} />
		</SelectRoot>
	)
}

export {
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
}
