/**
 * Glyph
 * ─────────────────────────────────────────────────────────────────────────────
 * A fixed-size square containing a centred character or symbol.
 * Size must be one of the preset GlyphSize values (multiples of 8/16).
 * All variants use rounded-lg on the outer container (square with radius).
 * For circle/circle-inverted, the circle shape lives INSIDE the square container.
 *
 * Variants:
 *   default          — bordered square, standard bg + fg
 *   filled           — inverted (foreground bg, background text)
 *   circle           — standard bg with a filled circle behind the character
 *   circle-inverted  — foreground bg with a contrasting circle behind the character
 */

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'

export type GlyphSize = 16 | 24 | 32 | 48 | 64 | 96
export type GlyphVariant = 'default' | 'filled' | 'circle' | 'circle-inverted'

const GLYPH_TEXT: Record<GlyphSize, string> = {
	16: 'text-[9px]',
	24: 'text-[11px]',
	32: 'text-xs',
	48: 'text-base',
	64: 'text-xl',
	96: 'text-3xl',
}

const glyphVariants = cva(
	'relative inline-flex items-center justify-center shrink-0 border-[length:var(--border-width)] font-bold select-none [font-family:system-ui,_-apple-system,_sans-serif]',
	{
		variants: {
			variant: {
				default: 'bg-card text-foreground border-stroke rounded-lg',
				filled: 'bg-foreground text-background border-foreground rounded-lg',
				circle: 'bg-card border-stroke rounded-lg',
				'circle-inverted': 'bg-foreground border-foreground rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

export interface GlyphProps extends Omit<React.ComponentProps<'div'>, 'children'> {
	children: React.ReactNode
	size?: GlyphSize
	variant?: GlyphVariant
}

function Glyph({ children, size = 48, variant = 'default', className, ...props }: GlyphProps) {
	const circleDiameter = Math.round(size * 0.68)
	const hasCircle = variant === 'circle' || variant === 'circle-inverted'

	return (
		<div
			data-slot="glyph"
			data-variant={variant}
			className={cn(glyphVariants({ variant }), GLYPH_TEXT[size], className)}
			style={{ width: size, height: size }}
			{...props}
		>
			{hasCircle && (
				<div
					aria-hidden
					className={cn(
						'absolute rounded-full',
						variant === 'circle' && 'bg-foreground',
						variant === 'circle-inverted' && 'bg-card',
					)}
					style={{ width: circleDiameter, height: circleDiameter }}
				/>
			)}
			<span
				className={cn(
					'relative',
					variant === 'circle' && 'text-background',
					variant === 'circle-inverted' && 'text-foreground',
					(variant === 'default' || variant === 'filled') && 'text-inherit',
				)}
			>
				{children}
			</span>
		</div>
	)
}

export { Glyph, glyphVariants }
