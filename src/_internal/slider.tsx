import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import * as React from 'react'

import { cn, FOCUS_RING } from '../lib/utils'

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	const _values = React.useMemo(
		() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
		[value, defaultValue, min, max],
	)

	return (
		<SliderPrimitive.Root
			className="data-horizontal:w-full data-vertical:h-full"
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
					className="bg-muted rounded-full data-horizontal:h-5 data-horizontal:w-full data-vertical:h-full data-vertical:w-5 relative overflow-hidden select-none"
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
							'border-primary size-5 rounded-full border bg-page hover:ring-4 hover:ring-focus/30 active:ring-4 active:ring-focus/50 block shrink-0 select-none disabled:pointer-events-none disabled:opacity-disabled',
							'has-[:focus-visible]:border-[var(--focus-ring-color)] has-[:focus-visible]:ring-[color:var(--focus-ring-color)]/30 has-[:focus-visible]:ring-[length:var(--focus-ring-width)]',
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	)
}

export { Slider }
