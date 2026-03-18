import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, FOCUS_RING } from '../lib/utils';

const toggleVariants = cva(
	`${FOCUS_RING} hover:text-foreground aria-pressed:bg-muted data-[state=on]:bg-muted gap-1 rounded-md text-xs font-medium transition-[opacity,box-shadow] [&_svg:not([class*='size-'])]:size-3.5 group/toggle hover:bg-muted active:bg-muted/(--opacity-hover) inline-flex items-center justify-center whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-field hover:bg-muted border bg-transparent",
			},
			size: {
				default: "h-7 min-w-7 px-2",
				sm: "h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-1.5 text-2xs [&_svg:not([class*='size-'])]:size-3",
				lg: "h-8 min-w-8 px-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant = "default",
	size = "default",
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
