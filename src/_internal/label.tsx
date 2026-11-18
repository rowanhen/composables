import type * as React from 'react'

import { cn } from '../lib/utils'

function Label({ className, ...props }: React.ComponentProps<'label'>) {
	return (
		<label
			data-slot="label"
			className={cn(
				'gap-2 text-label text-(color:--label-color) [text-transform:var(--label-text-transform)] group-data-[invalid=true]/field:text-critical group-data-[orientation=horizontal]/field:text-body group-data-[orientation=horizontal]/field:text-content-default group-data-[orientation=horizontal]/field:normal-case leading-none font-medium group-data-[disabled=true]:opacity-disabled peer-disabled:opacity-disabled flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
				className,
			)}
			{...props}
		/>
	)
}

export { Label }
