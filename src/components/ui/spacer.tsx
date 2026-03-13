import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const spacerVariants = cva("shrink-0", {
	variants: {
		size: {
			1: "h-1 w-1",
			2: "h-2 w-2",
			3: "h-3 w-3",
			4: "h-4 w-4",
			5: "h-5 w-5",
			6: "h-6 w-6",
			8: "h-8 w-8",
			10: "h-10 w-10",
			12: "h-12 w-12",
			16: "h-16 w-16",
			20: "h-20 w-20",
			24: "h-24 w-24",
		},
	},
	defaultVariants: {
		size: 4,
	},
});

type SpacerProps = React.ComponentProps<"div"> &
	VariantProps<typeof spacerVariants>;

function Spacer({ className, size, ...props }: SpacerProps) {
	return (
		<div
			data-slot="spacer"
			aria-hidden="true"
			className={cn(spacerVariants({ size }), className)}
			{...props}
		/>
	);
}

export { Spacer, spacerVariants };
export type { SpacerProps };
