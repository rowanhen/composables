import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { cn, FOCUS_RING, HOVER_RING } from '../lib/utils'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				FOCUS_RING,
				HOVER_RING,
				'border-(color:--choice-border-color) not-data-checked:hover:bg-surface-hover dark:bg-surface-field/30 data-checked:bg-selected data-checked:text-selected-foreground dark:data-checked:bg-selected data-checked:border-choice-stroke-selected aria-invalid:aria-checked:border-choice-stroke-selected flex size-choice items-center justify-center rounded-checkbox border-(length:--choice-border-width) transition-shadow group-has-disabled/field:opacity-disabled peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-disabled',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="size-full [&>svg]:size-checkbox-icon [&>svg]:stroke-checkbox-check flex items-center justify-center text-current transition-none"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}

export { Checkbox }
