import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const dividerVariants = cva('shrink-0', {
	variants: {
		variant: {
			solid: '',
			dots: '',
			pills: '',
		},
		orientation: {
			horizontal: 'w-full',
			vertical: 'self-stretch',
		},
		align: {
			start: '',
			center: '',
			end: '',
		},
	},
	compoundVariants: [
		{
			variant: 'solid',
			orientation: 'horizontal',
			class: 'h-[var(--rule-width)] bg-[var(--divider-color,var(--border-default))]',
		},
		{
			variant: 'solid',
			orientation: 'vertical',
			class: 'w-[var(--rule-width)] bg-[var(--divider-color,var(--border-default))]',
		},
		{
			variant: 'dots',
			orientation: 'horizontal',
			class: 'h-[var(--rule-width)]',
		},
		{
			variant: 'dots',
			orientation: 'vertical',
			class: 'w-[var(--rule-width)]',
		},
		{
			variant: 'pills',
			orientation: 'horizontal',
			class: 'h-[var(--rule-width)]',
		},
		{
			variant: 'pills',
			orientation: 'vertical',
			class: 'w-[var(--rule-width)]',
		},
	],
	defaultVariants: {
		variant: 'solid',
		orientation: 'horizontal',
		align: 'center',
	},
})

type DividerVariants = VariantProps<typeof dividerVariants>

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: DividerVariants['variant']
	orientation?: 'horizontal' | 'vertical'
	/** Vertical alignment of the divider within its line. @default "center" */
	align?: 'start' | 'center' | 'end'
	/** Width multiplier for pills. Controls pill width as calc(var(--rule-width) * n). @default 4 */
	pillsMultiplier?: number
	/** CSS color value for dots/pills patterns. Sets --divider-color. @default "var(--border-default)" */
	color?: string
}

function getPatternStyle(
	variant: 'dots' | 'pills',
	orientation: 'horizontal' | 'vertical',
	pillsMultiplier: number,
): React.CSSProperties {
	if (variant === 'dots') {
		// Dot size = border-width-base, gap = spacing
		// Repeating unit = dot + gap
		return orientation === 'horizontal'
			? {
					backgroundImage:
						'radial-gradient(circle, var(--divider-color, var(--border-default)) calc(var(--rule-width) / 2), transparent 0)',
					backgroundSize: 'calc(var(--rule-width) + var(--spacing) * 1) var(--rule-width)',
					backgroundRepeat: 'repeat-x',
					backgroundPosition: 'left center',
				}
			: {
					backgroundImage:
						'radial-gradient(circle, var(--divider-color, var(--border-default)) calc(var(--rule-width) / 2), transparent 0)',
					backgroundSize: 'var(--rule-width) calc(var(--rule-width) + var(--spacing) * 1)',
					backgroundRepeat: 'repeat-y',
					backgroundPosition: 'center top',
				}
	}

	// pills
	const pillLen = `calc(var(--rule-width) * ${pillsMultiplier})`
	const unit = `calc(${pillLen} + var(--spacing) * 1)`

	return orientation === 'horizontal'
		? {
				backgroundImage: `repeating-linear-gradient(to right, var(--divider-color, var(--border-default)) 0, var(--divider-color, var(--border-default)) ${pillLen}, transparent ${pillLen}, transparent ${unit})`,
				backgroundSize: `${unit} var(--rule-width)`,
				backgroundRepeat: 'repeat-x',
				backgroundPosition: 'left center',
				borderRadius: 'var(--radius)',
			}
		: {
				backgroundImage: `repeating-linear-gradient(to bottom, var(--divider-color, var(--border-default)) 0, var(--divider-color, var(--border-default)) ${pillLen}, transparent ${pillLen}, transparent ${unit})`,
				backgroundSize: `var(--rule-width) ${unit}`,
				backgroundRepeat: 'repeat-y',
				backgroundPosition: 'center top',
				borderRadius: 'var(--radius)',
			}
}

const alignSelfMap = {
	start: 'flex-start',
	center: 'center',
	end: 'flex-end',
} as const

function Divider({
	variant = 'solid',
	orientation = 'horizontal',
	align = 'center',
	pillsMultiplier = 4,
	color,
	className,
	style,
	...props
}: DividerProps) {
	const patternStyle =
		variant === 'dots' || variant === 'pills'
			? getPatternStyle(variant, orientation, pillsMultiplier)
			: { borderRadius: 'var(--radius)' }

	const colorStyle = color ? ({ '--divider-color': color } as React.CSSProperties) : {}

	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={cn(dividerVariants({ variant, orientation, align }), className)}
			style={{
				alignSelf: alignSelfMap[align],
				...colorStyle,
				...patternStyle,
				...style,
			}}
			{...props}
		/>
	)
}

export { Divider, dividerVariants }
export type { DividerProps }
