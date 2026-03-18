import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, FOCUS_RING, FOCUS_RING_DESTRUCTIVE } from '../lib/utils';

const badgeVariants = cva(
	`${FOCUS_RING} h-5 gap-1 rounded-full border border-transparent px-2 py-0.5 text-2xs font-medium transition-[opacity,box-shadow] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-2.5! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none overflow-hidden group/badge`,
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
				secondary:
					"bg-secondary text-secondary-foreground [a]:hover:bg-secondary/(--opacity-hover)",
				destructive: `bg-danger/10 [a]:hover:bg-danger/20 ${FOCUS_RING_DESTRUCTIVE} text-danger dark:bg-danger/20 border-stroke-critical`,
				outline:
					"border-stroke text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground bg-field/20 dark:bg-field/30",
				ghost:
					"hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
				success: "bg-surface-success text-success border-stroke-success",
				warning: "bg-surface-warning text-warning border-stroke-warning",
				info: "bg-surface-info text-info border-stroke-info",
				brand: "bg-surface-brand text-brand border-stroke-brand",
				emphasis: "bg-surface-emphasis text-emphasis border-stroke-emphasis",
				link: "text-primary underline-offset-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	render,
	...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ className, variant })),
			},
			props,
		),
		render,
		state: {
			slot: "badge",
			variant,
		},
	});
}

export { Badge, badgeVariants };
