import type * as React from 'react'

import {
	ToggleGroup as ToggleGroupPrimitive,
	ToggleGroupItem,
	type ToggleGroupProps as ToggleGroupPrimitiveProps,
} from '../_internal/toggle-group'

export interface ToggleGroupOption<Value extends string = string> {
	label: React.ReactNode
	value: Value
	disabled?: boolean
	icon?: React.ReactNode
}

export interface ToggleGroupProps<Value extends string = string> extends Omit<
	ToggleGroupPrimitiveProps<Value>,
	'children' | 'value' | 'defaultValue' | 'onValueChange'
> {
	options?: ToggleGroupOption<Value>[]
	value?: Value | readonly Value[]
	defaultValue?: Value | readonly Value[]
	onValueChange?: (value: Value | Value[] | undefined) => void
	children?: React.ReactNode
}

function toValueArray<Value extends string>(value: Value | readonly Value[] | undefined) {
	if (value === undefined) return undefined
	return Array.isArray(value) ? value : [value]
}

function ToggleGroup<Value extends string = string>({
	options,
	children,
	value,
	defaultValue,
	onValueChange,
	multiple = false,
	...props
}: ToggleGroupProps<Value>) {
	return (
		<ToggleGroupPrimitive
			value={toValueArray(value)}
			defaultValue={toValueArray(defaultValue)}
			onValueChange={(nextValue) => {
				onValueChange?.(multiple ? nextValue : nextValue[0])
			}}
			multiple={multiple}
			{...props}
		>
			{options
				? options.map((option) => (
						<ToggleGroupItem key={option.value} value={option.value} disabled={option.disabled}>
							{option.icon && <span className="inline-flex items-center">{option.icon}</span>}
							<span>{option.label}</span>
						</ToggleGroupItem>
					))
				: children}
		</ToggleGroupPrimitive>
	)
}

export { ToggleGroup, ToggleGroupItem }
