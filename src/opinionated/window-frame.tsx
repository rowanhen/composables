import type * as React from 'react'
import { cn } from '../lib/utils'

/** A reusable desktop-window frame for product previews and embedded UI examples. */
export interface WindowFrameProps extends Omit<React.ComponentProps<'div'>, 'title'> {
	/** Label shown in the window chrome. */
	title?: React.ReactNode
	/** Optional content on the right side of the title bar. */
	toolbar?: React.ReactNode
	/** Shows the decorative window controls. @default true */
	controls?: boolean
	/** Classes applied to the content area. */
	contentClassName?: string
}

export function WindowFrame({
	title,
	toolbar,
	controls = true,
	contentClassName,
	className,
	children,
	...props
}: WindowFrameProps) {
	return (
		<div
			data-slot="window-frame"
			className={cn(
				'overflow-hidden rounded-xl border border-stroke-default bg-surface-default text-default shadow-lg',
				className,
			)}
			{...props}
		>
			<div
				data-slot="window-frame-header"
				className="flex min-h-10 items-center gap-3 border-b border-stroke-default px-4"
			>
				{controls && (
					<div aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
						<span className="size-2.5 rounded-full bg-fill-critical" />
						<span className="size-2.5 rounded-full bg-fill-warning" />
						<span className="size-2.5 rounded-full bg-fill-success" />
					</div>
				)}
				{title && (
					<span className="min-w-0 truncate text-xs font-medium text-[var(--text-secondary)]">
						{title}
					</span>
				)}
				{toolbar && <div className="ml-auto flex items-center gap-2">{toolbar}</div>}
			</div>
			<div data-slot="window-frame-content" className={cn('p-4', contentClassName)}>
				{children}
			</div>
		</div>
	)
}
