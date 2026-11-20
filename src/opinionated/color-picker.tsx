'use client'

import type { ComponentProps } from 'react'
import {
	ColorPicker as Root,
	ColorPickerArea,
	ColorPickerAreaThumb,
	ColorPickerContent,
	ColorPickerInput,
	ColorPickerPopover,
	ColorPickerSlider,
	ColorPickerSliderThumb,
	ColorPickerSwatch,
	ColorPickerTrigger,
} from '../components/keyframery/color-picker'

export type ColorPickerProps = Pick<
	ComponentProps<typeof Root>,
	'value' | 'defaultValue' | 'onValueChange' | 'onValueCommit' | 'disabled' | 'readOnly' | 'name'
> & {
	label: string
	className?: string
}

export function ColorPicker({ label, className, ...props }: ColorPickerProps) {
	return (
		<Root className={className} {...props}>
			<ColorPickerPopover>
				<ColorPickerTrigger aria-label={label}>
					<ColorPickerSwatch aria-hidden />
					{label}
				</ColorPickerTrigger>
				<ColorPickerContent aria-label={label}>
					<ColorPickerArea aria-label="Saturation and brightness">
						<ColorPickerAreaThumb />
					</ColorPickerArea>
					<ColorPickerSlider channel="hue" aria-label="Hue">
						<ColorPickerSliderThumb />
					</ColorPickerSlider>
					<ColorPickerInput aria-label="Hex color" />
				</ColorPickerContent>
			</ColorPickerPopover>
		</Root>
	)
}
