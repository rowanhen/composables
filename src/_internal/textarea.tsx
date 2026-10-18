import type * as React from 'react'

import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				FOCUS_RING,
				HOVER_RING,
				'border-field bg-surface-input resize-none rounded-(--input-radius) border px-2 py-2 text-(length:--control-font-size) max-md:text-[length:max(var(--control-font-size),var(--text-sm))] leading-relaxed placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full min-w-(--control-min-width) outline-none disabled:cursor-not-allowed disabled:opacity-disabled',
				className,
			)}
			{...props}
		/>
	)
}

export { Textarea }
