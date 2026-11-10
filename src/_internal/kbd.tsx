import type * as React from 'react'

import { cn } from '../lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				'bg-muted text-muted-foreground pointer-events-none inline-flex h-(--kbd-height) min-w-(--kbd-height) items-center justify-center gap-1 rounded-(--kbd-radius) px-1 font-mono text-(length:--kbd-font-size) font-medium select-none [&_svg:not([class*=size-])]:size-3',
				className,
			)}
			{...props}
		/>
	)
}

function KbdGroup({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="kbd-group"
			className={cn('inline-flex items-center gap-1', className)}
			{...props}
		/>
	)
}

export { Kbd, KbdGroup }
