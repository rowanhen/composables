import type * as React from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button, type ButtonProps } from '../button'
import { Container } from '../container'
import { WindowFrame } from '../window-frame'

export type BlockAnimation = 'none' | 'subtle'
export type BlockVariant = 'standard' | 'muted' | 'inverse'
export type BlockMedia = { src: string; alt: string }
export type BlockCTA = {
	ctaEnabled?: boolean
	text: string
	link?: string
	variant?: ButtonProps['variant']
	size?: ButtonProps['size']
}
export type BlockBaseProps = {
	className?: string
	variant?: BlockVariant
	animation?: BlockAnimation
}

export function BlockSection({
	children,
	className,
	variant = 'standard',
	animation = 'none',
	fullWidth = false,
}: BlockBaseProps & { children: React.ReactNode; fullWidth?: boolean }) {
	return (
		<section
			data-slot="block"
			data-variant={variant}
			className={cn(
				'relative isolate overflow-hidden py-16 md:py-24',
				variant === 'standard' && 'bg-default text-default',
				variant === 'muted' && 'bg-muted text-default',
				variant === 'inverse' &&
					'bg-inverse text-inverse [--text-secondary:var(--text-inverse)] [--text-muted:var(--text-inverse)]',
				animation === 'subtle' &&
					'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700',
				className,
			)}
		>
			{fullWidth ? children : <Container maxWidth="2xl">{children}</Container>}
		</section>
	)
}

export function BlockHeading({
	title,
	description,
	centered = false,
	className,
}: {
	title: string
	description?: string
	centered?: boolean
	className?: string
}) {
	return (
		<div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
			<h2 className="font-heading text-4xl leading-tight tracking-tight md:text-5xl">{title}</h2>
			{description && (
				<p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
					{description}
				</p>
			)}
		</div>
	)
}

export function BlockImage({
	media,
	className,
	priority = false,
}: {
	media: BlockMedia
	className?: string
	priority?: boolean
}) {
	return (
		<img
			src={media.src}
			alt={media.alt}
			loading={priority ? 'eager' : 'lazy'}
			className={cn('h-full w-full object-cover', className)}
		/>
	)
}

export function BlockAction({
	action,
	className,
	arrow = false,
}: {
	action?: BlockCTA
	className?: string
	arrow?: boolean
}) {
	if (!action || action.ctaEnabled === false) return null
	const content = (
		<>
			{action.text}
			{arrow && <ArrowRightIcon aria-hidden="true" />}
		</>
	)
	return (
		<Button
			render={action.link ? <a href={action.link} /> : undefined}
			variant={action.variant ?? 'default'}
			size={action.size ?? 'lg'}
			shape="pill"
			className={cn('min-h-10 px-5', className)}
		>
			{content}
		</Button>
	)
}

export function BlockActions({
	primary,
	secondary,
	centered = false,
}: {
	primary?: BlockCTA
	secondary?: BlockCTA
	centered?: boolean
}) {
	if (!primary && !secondary) return null
	return (
		<div className={cn('mt-8 flex flex-wrap items-center gap-3', centered && 'justify-center')}>
			<BlockAction action={primary} />
			<BlockAction action={secondary} />
		</div>
	)
}

export function BlockLogos({ label, logos }: { label?: string; logos?: string[] }) {
	if (!logos?.length) return null
	return (
		<div className="mt-14 border-t border-stroke-default pt-6 text-center">
			{label && (
				<p className="mb-5 text-xs uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
			)}
			<div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-[var(--text-secondary)]">
				{logos.map((logo) => (
					<span key={logo}>{logo}</span>
				))}
			</div>
		</div>
	)
}

export function BlockDashboard({ className }: { className?: string }) {
	return (
		<WindowFrame
			role="group"
			aria-label="Product dashboard illustration"
			className={className}
			toolbar={<span aria-hidden="true" className="h-2 w-20 rounded-full bg-surface-accent" />}
		>
			<div className="grid gap-3 sm:grid-cols-3">
				{['Revenue', 'Customers', 'Growth'].map((label, index) => (
					<div key={label} className="rounded-lg border border-stroke-default bg-default p-4">
						<p className="text-xs text-[var(--text-muted)]">{label}</p>
						<p className="mt-3 text-2xl font-semibold text-default">
							{['£48,290', '2,410', '+18.6%'][index]}
						</p>
					</div>
				))}
			</div>
			<div className="mt-3 flex h-40 items-end gap-2 rounded-lg border border-stroke-default bg-default p-5">
				{[32, 48, 38, 68, 52, 75, 61, 92, 70, 85, 72, 100].map((height, index) => (
					<span
						key={index}
						className="flex-1 rounded-t-sm bg-fill-brand"
						style={{ height: `${height}%`, opacity: 0.4 + index / 20 }}
					/>
				))}
			</div>
		</WindowFrame>
	)
}
