'use client'

import type { ComponentProps } from 'react'
import {
	Slider as Root,
	SliderControl,
	SliderIndicator,
	SliderThumb,
	SliderTrack,
	SliderValue,
} from '../components/keyframery/slider'

export type SliderProps = Omit<ComponentProps<typeof Root>, 'children'> & {
	showValue?: boolean
	valueFormatter?: (value: number | number[]) => string
}

export function Slider({
	value,
	defaultValue,
	showValue,
	valueFormatter,
	'aria-label': label,
	'aria-labelledby': labelledBy,
	'aria-describedby': describedBy,
	...props
}: SliderProps) {
	const values = value ?? defaultValue
	const thumbCount = Array.isArray(values) ? values.length : 1

	return (
		<Root value={value} defaultValue={defaultValue} {...props}>
			{showValue && (
				<SliderValue>
					{valueFormatter ? (state) => valueFormatter(state.value) : undefined}
				</SliderValue>
			)}
			<SliderControl>
				<SliderTrack>
					<SliderIndicator />
				</SliderTrack>
				{Array.from({ length: thumbCount }, (_, index) => (
					<SliderThumb
						key={index}
						index={index}
						aria-label={label}
						aria-labelledby={labelledBy}
						aria-describedby={describedBy}
					/>
				))}
			</SliderControl>
		</Root>
	)
}
