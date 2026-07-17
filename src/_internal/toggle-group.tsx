import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import type { Toggle as TogglePrimitiveType } from '@base-ui/react/toggle'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Toggle, type toggleVariants } from './toggle'
import { cn } from '../lib/utils'

type ToggleVariantProps = VariantProps<typeof toggleVariants>
export type ToggleGroupSpacing = 'none' | 'sm' | 'default'

interface ToggleGroupStyleContext extends ToggleVariantProps {
	spacing: ToggleGroupSpacing
	orientation: ToggleGroupPrimitive.Props['orientation']
}

const ToggleGroupContext = React.createContext<ToggleGroupStyleContext>({
	size: 'default',
	variant: 'default',
	spacing: 'none',
	orientation: 'horizontal',
})

export interface ToggleGroupProps<Value extends string = string>
	extends ToggleGroupPrimitive.Props<Value>, ToggleVariantProps {
	spacing?: ToggleGroupSpacing
}

const spacingClassName: Record<ToggleGroupSpacing, string> = {
	none: 'gap-0',
	sm: 'gap-1',
	default: 'gap-2',
}

function ToggleGroup<Value extends string = string>({
	className,
	variant = 'default',
	size = 'default',
	spacing = 'none',
	orientation = 'horizontal',
	children,
	...props
}: ToggleGroupProps<Value>) {
	return (
		<ToggleGroupPrimitive
			data-slot="toggle-group"
			data-variant={variant}
			data-size={size}
			data-spacing={spacing}
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				// Vertical groups stretch items so every toggle matches the width
				// of the widest item instead of hugging its own content.
				'inline-flex w-fit items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
				spacingClassName[spacing],
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive>
	)
}

export interface ToggleGroupItemProps<Value extends string = string>
	extends TogglePrimitiveType.Props<Value>, ToggleVariantProps {}

function ToggleGroupItem<Value extends string = string>({
	className,
	variant,
	size,
	...props
}: ToggleGroupItemProps<Value>) {
	const context = React.useContext(ToggleGroupContext)
	const resolvedVariant = variant ?? context.variant
	const resolvedSize = size ?? context.size

	return (
		<Toggle
			data-slot="toggle-group-item"
			data-variant={resolvedVariant}
			data-size={resolvedSize}
			data-spacing={context.spacing}
			data-orientation={context.orientation}
			variant={resolvedVariant}
			size={resolvedSize}
			className={cn(
				'shrink-0 focus:z-10 focus-visible:z-10 data-[orientation=vertical]:w-full',
				context.spacing === 'none' &&
					'rounded-none data-[orientation=horizontal]:first:rounded-l-md data-[orientation=horizontal]:last:rounded-r-md data-[orientation=horizontal]:data-[variant=outline]:border-l-0 data-[orientation=horizontal]:first:data-[variant=outline]:border-l data-[orientation=vertical]:first:rounded-t-md data-[orientation=vertical]:last:rounded-b-md data-[orientation=vertical]:data-[variant=outline]:border-t-0 data-[orientation=vertical]:first:data-[variant=outline]:border-t',
				className,
			)}
			{...props}
		/>
	)
}

export { ToggleGroup, ToggleGroupItem }
