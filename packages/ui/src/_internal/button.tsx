import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE } from '../lib/utils';

const buttonVariants = cva(
	`${FOCUS_RING} rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-[opacity,box-shadow] disabled:pointer-events-none disabled:opacity-disabled [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none`,
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
				outline:
					"border-stroke dark:bg-field/30 hover:bg-field/50 hover:text-foreground active:bg-accent aria-expanded:bg-muted aria-expanded:text-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/(--opacity-hover) active:bg-secondary/(--opacity-active) aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost:
					"hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 active:bg-muted/(--opacity-hover) aria-expanded:bg-muted aria-expanded:text-foreground",
				destructive: `bg-danger/10 hover:bg-danger/20 ${FOCUS_RING_DESTRUCTIVE} dark:bg-danger/20 text-danger dark:hover:bg-danger/30 active:bg-danger/30 dark:active:bg-danger/40 border-stroke-critical`,
				success:
					"bg-surface-success text-success border-stroke-success hover:bg-surface-success/(--opacity-hover) active:bg-surface-success/(--opacity-active)",
				warning:
					"bg-surface-warning text-warning border-stroke-warning hover:bg-surface-warning/(--opacity-hover) active:bg-surface-warning/(--opacity-active)",
				info: "bg-surface-info text-info border-stroke-info hover:bg-surface-info/(--opacity-hover) active:bg-surface-info/(--opacity-active)",
				brand:
					"bg-surface-brand text-brand border-stroke-brand hover:bg-surface-brand/(--opacity-hover) active:bg-surface-brand/(--opacity-active)",
				emphasis:
					"bg-surface-emphasis text-emphasis border-stroke-emphasis hover:bg-surface-emphasis/(--opacity-hover) active:bg-surface-emphasis/(--opacity-active)",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-7 gap-1 px-3 text-xs/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
				xs: "h-5 gap-1 rounded-sm px-2.5 text-2xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-2.5",
				sm: "h-6 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				lg: "h-8 gap-1 px-3.5 text-xs/relaxed has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
				"icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
				"icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
