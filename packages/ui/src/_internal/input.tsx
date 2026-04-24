import { Input as InputPrimitive } from '@base-ui/react/input'
import type * as React from 'react'

import { cn, FOCUS_RING } from '../lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(
				FOCUS_RING,
				'bg-field/20 dark:bg-field/30 border-field hover:border-foreground/50 h-7 rounded-md border px-2 py-0.5 text-sm file:h-6 file:text-xs/relaxed file:font-medium md:text-xs/relaxed file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-disabled',
				className,
			)}
			{...props}
			onWheel={(e) => {
				e.currentTarget.blur()
			}}
		/>
	)
}

export { Input }
