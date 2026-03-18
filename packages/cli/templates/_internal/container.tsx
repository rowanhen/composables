import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
	variants: {
		maxWidth: {
			sm: "max-w-[var(--container-sm)]",
			md: "max-w-[var(--container-md)]",
			lg: "max-w-[var(--container-lg)]",
			xl: "max-w-[var(--container-xl)]",
			"2xl": "max-w-[var(--container-2xl)]",
			full: "max-w-full",
		},
	},
	defaultVariants: {
		maxWidth: "2xl",
	},
});

type ContainerProps = React.ComponentProps<"div"> &
	VariantProps<typeof containerVariants>;

function Container({ className, maxWidth, ...props }: ContainerProps) {
	return (
		<div
			data-slot="container"
			className={cn(containerVariants({ maxWidth }), className)}
			{...props}
		/>
	);
}

export { Container, containerVariants };
export type { ContainerProps };
