import type * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn, FOCUS_RING } from '../lib/utils'

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
					`${FOCUS_RING} border-field bg-page h-(--input-height) w-full appearance-none rounded-(--input-radius) border px-3 py-2 pr-9 text-xs/relaxed shadow-xs outline-none motion-colors disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1`,
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
