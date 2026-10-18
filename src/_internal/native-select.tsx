import type * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

export type NativeSelectSize = 'sm' | 'default'

export interface NativeSelectProps extends Omit<React.ComponentProps<'select'>, 'size'> {
	size?: NativeSelectSize
	wrapperClassName?: string
}

function NativeSelect({
	className,
	wrapperClassName,
	size = 'default',
	...props
}: NativeSelectProps) {
	return (
		<div
			data-slot="native-select-wrapper"
			className={cn('relative w-full has-disabled:opacity-disabled', wrapperClassName)}
		>
			<select
				data-slot="native-select"
				data-size={size}
				className={cn(
					FOCUS_RING,
					HOVER_RING,
					'border-field bg-surface-input h-(--control-size-md) w-full min-w-(--control-min-width) appearance-none rounded-(--input-radius) border px-3 py-0 pr-9 text-(length:--control-font-size) leading-relaxed shadow-xs outline-none motion-colors disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-(--control-size-sm)',
					className,
				)}
				{...props}
			/>
			<ChevronDownIcon
				data-slot="native-select-icon"
				aria-hidden="true"
				className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 opacity-70"
			/>
		</div>
	)
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
	return <option data-slot="native-select-option" className={className} {...props} />
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
	return <optgroup data-slot="native-select-optgroup" className={className} {...props} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
