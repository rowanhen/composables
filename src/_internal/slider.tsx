import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import * as React from 'react'

import { cn } from '../lib/utils'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	// One thumb per value; a single number (or no value) is a single thumb.
	const _values = React.useMemo(() => {
		const current = value ?? defaultValue
		if (Array.isArray(current)) return current
		return typeof current === 'number' ? [current] : [min, max]
	}, [value, defaultValue, min, max])

	return (
		<SliderPrimitive.Root
			className="data-horizontal:w-full data-horizontal:min-w-(--control-min-width) data-vertical:h-full"
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control
				className={cn(
					'data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-disabled data-vertical:h-full data-vertical:w-auto data-vertical:flex-col',
					className,
				)}
			>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="bg-muted rounded-full data-horizontal:h-(--slider-size) data-horizontal:w-full data-vertical:h-full data-vertical:w-(--slider-size) relative overflow-hidden select-none"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						data-slot="slider-thumb"
						key={index}
						className={cn(
							'border-(color:--slider-thumb-border) bg-(--slider-thumb-color) size-(--slider-size) rounded-full border hover:ring-4 hover:ring-focus/30 active:ring-4 active:ring-focus/50 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-disabled',
							'has-[:focus-visible]:border-[var(--focus-ring-color)] has-[:focus-visible]:ring-[color:var(--focus-ring-color)]/30 has-[:focus-visible]:ring-[length:var(--focus-ring-width)]',
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	)
}

export { Slider }
