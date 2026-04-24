import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const stackVariants = cva('flex', {
	variants: {
		direction: {
			vertical: 'flex-col',
			horizontal: 'flex-row',
		},
		gap: {
			0: 'gap-0',
			1: 'gap-1',
			2: 'gap-2',
			3: 'gap-3',
			4: 'gap-4',
			5: 'gap-5',
			6: 'gap-6',
			8: 'gap-8',
			10: 'gap-10',
			12: 'gap-12',
			16: 'gap-16',
			20: 'gap-20',
			24: 'gap-24',
		},
		align: {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			stretch: 'items-stretch',
			baseline: 'items-baseline',
		},
		justify: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
			around: 'justify-around',
			evenly: 'justify-evenly',
		},
		wrap: {
			true: 'flex-wrap',
			false: 'flex-nowrap',
		},
	},
	defaultVariants: {
		direction: 'vertical',
		gap: 4,
		align: 'stretch',
		justify: 'start',
		wrap: false,
	},
})

type StackProps = React.ComponentProps<'div'> & VariantProps<typeof stackVariants>

function Stack({ className, direction, gap, align, justify, wrap, ...props }: StackProps) {
	return (
		<div
			data-slot="stack"
			className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
			{...props}
		/>
	)
}

/* Convenience aliases */
function VStack(props: Omit<StackProps, 'direction'>) {
	return <Stack direction="vertical" {...props} />
}

function HStack(props: Omit<StackProps, 'direction'>) {
	return <Stack direction="horizontal" {...props} />
}

export { Stack, VStack, HStack, stackVariants }
export type { StackProps }
