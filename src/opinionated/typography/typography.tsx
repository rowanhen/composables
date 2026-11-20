import { createElement, type ComponentPropsWithRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { withSpeed, type SpeedProps } from '../../components/keyframery/motion-speed'
import { cn } from '../../lib/utils'

const variants = {
	'hero-100': 'font-brand font-bold text-4xl tracking-tighter',
	'hero-200': 'font-brand font-bold text-5xl tracking-tighter',
	'hero-300': 'font-brand font-bold text-6xl tracking-tighter',
	'hero-400': 'font-brand font-bold text-7xl tracking-tighter',
	'heading-100': 'font-heading font-medium text-sm tracking-normal',
	'heading-200': 'font-heading font-medium text-base tracking-normal',
	'heading-300': 'font-heading font-medium text-xl tracking-normal',
	'heading-400': 'font-heading font-medium text-2xl tracking-normal',
	'heading-500': 'font-heading font-medium text-3xl tracking-normal',
	'heading-600': 'font-heading font-medium text-4xl tracking-normal',
	'brand-heading-100': 'font-brand font-bold text-sm tracking-tight',
	'brand-heading-200': 'font-brand font-bold text-base tracking-tight',
	'brand-heading-300': 'font-brand font-bold text-xl tracking-tight',
	'brand-heading-400': 'font-brand font-bold text-2xl tracking-tight',
	'brand-heading-500': 'font-brand font-bold text-3xl tracking-tight',
	'brand-heading-600': 'font-brand font-bold text-4xl tracking-tight',
	'body-100': 'font-sans font-normal text-sm tracking-normal',
	'body-200': 'font-sans font-normal text-base tracking-normal',
	'body-300': 'font-sans font-normal text-lg tracking-normal',
	'brand-body-100': 'font-brand font-bold text-sm tracking-normal',
	'brand-body-200': 'font-brand font-bold text-base tracking-normal',
	'brand-body-300': 'font-brand font-bold text-lg tracking-normal',
	'label-100': 'font-sans font-medium text-2xs tracking-normal uppercase',
	'label-200': 'font-sans font-medium text-base tracking-normal uppercase',
	'brand-label-100': 'font-brand font-bold text-2xs tracking-normal uppercase',
	'brand-label-200': 'font-brand font-bold text-base tracking-normal uppercase',
	'caption-100': 'font-sans font-normal text-xs tracking-normal text-content-muted',
	'link-100':
		'font-sans font-medium text-sm tracking-normal underline text-link hover:text-content-secondary',
	'link-200':
		'font-sans font-medium text-base tracking-normal underline text-link hover:text-content-secondary',
} as const

export type TypographyVariant = keyof typeof variants

export function typographyVariants({
	variant = 'body-200',
	class: classes,
	className,
}: {
	variant?: TypographyVariant | null
	class?: ClassValue
	className?: ClassValue
} = {}) {
	return clsx(variant && variants[variant], classes, className)
}

type PolymorphicElement =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'div'
	| 'label'
	| 'a'

const defaultElementMap: Record<string, PolymorphicElement> = {
	hero: 'h1',
	heading: 'p',
	'brand-heading': 'p',
	body: 'p',
	'brand-body': 'p',
	label: 'span',
	'brand-label': 'span',
	caption: 'span',
	link: 'span',
}

export type TypographyProps<T extends PolymorphicElement = 'p'> = {
	variant?: TypographyVariant
	as?: T
	/** Animate the element on entry using the active Keyframery motion style. */
	motion?: 'reveal'
} & SpeedProps &
	Omit<ComponentPropsWithRef<T>, 'as' | 'motion' | 'speed' | 'variant'>

const reveal =
	'motion-safe:starting:opacity-0 motion-safe:starting:translate-y-1 motion-safe:[transition:opacity_calc(var(--motion-duration-disclosure)*var(--kf-speed,1))_var(--ease-house),translate_calc(var(--motion-duration-disclosure)*var(--kf-speed,1))_var(--ease-pop)]'

export function Typography<T extends PolymorphicElement = 'p'>({
	variant = 'body-200',
	as,
	motion,
	speed,
	className,
	style,
	...props
}: TypographyProps<T>) {
	const element = as ?? defaultElementMap[variant.replace(/-\d+$/, '')] ?? 'p'

	return createElement(element, {
		...props,
		'data-slot': 'typography',
		'data-variant': variant,
		className: cn(typographyVariants({ variant }), motion === 'reveal' && reveal, className),
		style: withSpeed(style, speed),
	})
}
