// Story-only layout helpers; excluded from the published package.
import type React from 'react'
import { VStack } from '../_internal/stack'
import { Typography } from '../_internal/typography'
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
		<VStack gap={2} className="min-w-0">
			{label && <Typography variant="heading-200">{label}</Typography>}
			{description && (
				<Typography variant="body-200" className="text-muted-foreground">
					{description}
				</Typography>
			)}
			{children}
		</VStack>
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
		<VStack gap={6} className="min-w-0">
			{(title || description) && (
				<VStack gap={2}>
					{title && (
						<Typography variant="heading-400" as="h2">
							{title}
						</Typography>
					)}
					{description && (
						<Typography variant="body-200" className="text-muted-foreground">
							{description}
						</Typography>
					)}
				</VStack>
			)}
			{children}
		</VStack>
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

/** Brand-filled block for grid demos. */
export function DemoBox({
	children,
	className,
}: {
	children?: React.ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-md bg-fill-brand px-2 py-3 text-xs font-medium text-on-fill-primary',
				className,
			)}
		>
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
		<VStack gap={1} align="center">
			<div
				className="size-10 rounded-md border border-stroke/40"
				style={{
					backgroundColor: bg ? `var(${bg})` : undefined,
					borderColor: borderColor ? `var(${borderColor})` : undefined,
					borderWidth: borderColor ? 2 : undefined,
				}}
			/>
			<Typography variant="caption-100" className="max-w-20 truncate text-center text-foreground">
				{label}
			</Typography>
		</VStack>
	)
}
