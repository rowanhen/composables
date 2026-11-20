// Story-only layout helpers; excluded from the published package.
import type React from 'react'
import { cn } from '../lib/utils'

/** Labelled group of variants. */
export function Group({
	label,
	description,
	children,
}: {
	label?: string
	description?: string
	children: React.ReactNode
}) {
	return (
		<div className="flex min-w-0 flex-col gap-2">
			{label && <h3 className="text-base font-medium">{label}</h3>}
			{description && <p className="text-muted-foreground">{description}</p>}
			{children}
		</div>
	)
}

/** Vertical stack of `Group`s. */
export function Gallery({
	title,
	description,
	children,
}: {
	title?: string
	description?: string
	children: React.ReactNode
}) {
	return (
		<div className="flex min-w-0 flex-col gap-6">
			{(title || description) && (
				<div className="flex flex-col gap-2">
					{title && <h2 className="text-2xl font-medium">{title}</h2>}
					{description && <p className="text-muted-foreground">{description}</p>}
				</div>
			)}
			{children}
		</div>
	)
}

/** Neutral stand-in content. */
export function Placeholder({
	children,
	className,
}: {
	children?: React.ReactNode
	className?: string
}) {
	return (
		<div className={cn('flex items-center justify-center rounded-lg bg-muted', className)}>
			{children}
		</div>
	)
}

/** Labelled colour swatch. */
export function Swatch({
	label,
	bg,
	borderColor,
}: {
	label: string
	bg?: string
	borderColor?: string
}) {
	return (
		<div className="flex flex-col items-center gap-1">
			<div
				className="size-10 rounded-md border border-stroke/40"
				style={{
					backgroundColor: bg ? `var(${bg})` : undefined,
					borderColor: borderColor ? `var(${borderColor})` : undefined,
					borderWidth: borderColor ? 2 : undefined,
				}}
			/>
			<span className="max-w-20 truncate text-center text-xs text-foreground">{label}</span>
		</div>
	)
}
