import type * as React from 'react'

import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				FOCUS_RING,
				HOVER_RING,
				'border-control-stroke bg-control-surface text-control-content resize-none rounded-input border px-2 py-2 text-control max-md:text-[length:max(var(--control-font-size),var(--text-sm))] leading-relaxed placeholder:text-control-placeholder flex field-sizing-content min-h-16 w-full min-w-control-min-width outline-none disabled:bg-control-disabled-surface disabled:text-control-disabled-content disabled:border-control-disabled-stroke disabled:cursor-not-allowed disabled:opacity-disabled',
				className,
			)}
			{...props}
		/>
	)
}

export { Textarea }
