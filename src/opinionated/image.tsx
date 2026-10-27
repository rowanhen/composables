import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const imageVariants = cva('block', {
	variants: {
		variant: {
			default: 'rounded-lg bg-muted',
			outline: 'rounded-lg border border-stroke bg-muted',
			plain: 'rounded-none bg-transparent',
		},
		fit: {
			cover: 'object-cover',
			contain: 'object-contain',
		},
		fill: {
			true: 'absolute inset-0 size-full',
			false: 'h-auto max-w-full',
		},
	},
	defaultVariants: {
		variant: 'default',
		fit: 'cover',
		fill: false,
	},
})

type ImageLayout =
	| { fill?: false; width: number; height: number }
	| { fill: true; width?: never; height?: never }

export type ImageProps = Omit<
	React.ComponentPropsWithoutRef<'img'>,
	'src' | 'alt' | 'width' | 'height' | 'children'
> &
	ImageLayout & {
		/** Image URL. Use srcSet and sizes for responsive sources. */
		src: string
		/** Describe meaningful images; explicitly use an empty string for decoration. */
		alt: string
		/** How the image fits its box. @default 'cover' */
		fit?: NonNullable<VariantProps<typeof imageVariants>['fit']>
		/** Presentation style. Use plain for backgrounds or edge-to-edge media. @default 'default' */
		variant?: NonNullable<VariantProps<typeof imageVariants>['variant']>
		/** CSS object-position, e.g. 'center' or '50% 25%'. */
		position?: React.CSSProperties['objectPosition']
	}

/**
 * A native image with required alt text and explicit space allocation.
 * Supply intrinsic width/height, or use fill inside a positioned, sized parent.
 * Defaults to lazy loading; use loading="eager" and fetchPriority="high" for a hero.
 * This component does not resize, optimize, or generate image sources.
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
	{
		src,
		alt,
		width,
		height,
		fill = false,
		fit = 'cover',
		variant = 'default',
		position,
		loading = 'lazy',
		decoding = 'async',
		className,
		style,
		...props
	},
	ref,
) {
	return (
		<img
			{...props}
			ref={ref}
			data-slot="image"
			data-variant={variant}
			src={src}
			alt={alt}
			width={width}
			height={height}
			loading={loading}
			decoding={decoding}
			className={cn(imageVariants({ variant, fit, fill }), className)}
			style={{ objectPosition: position, ...style }}
		/>
	)
})

export { Image, imageVariants }
