import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from '../lib/utils';

const gridVariants = cva("grid", {
	variants: {
		columns: {
			1: "grid-cols-1",
			2: "grid-cols-2",
			3: "grid-cols-3",
			4: "grid-cols-4",
			6: "grid-cols-6",
			12: "grid-cols-12",
		},
		gap: {
			0: "gap-0",
			1: "gap-1",
			2: "gap-2",
			3: "gap-3",
			4: "gap-4",
			5: "gap-5",
			6: "gap-6",
			8: "gap-8",
			10: "gap-10",
			12: "gap-12",
		},
		align: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
			stretch: "items-stretch",
			baseline: "items-baseline",
		},
	},
	defaultVariants: {
		columns: 12,
		gap: 6,
		align: "stretch",
	},
});

type GridProps = React.ComponentProps<"div"> &
	VariantProps<typeof gridVariants>;

function Grid({ className, columns, gap, align, ...props }: GridProps) {
	return (
		<div
			data-slot="grid"
			className={cn(gridVariants({ columns, gap, align }), className)}
			{...props}
		/>
	);
}

/* ---- GridItem ---- */

const gridItemVariants = cva("", {
	variants: {
		colSpan: {
			1: "col-span-1",
			2: "col-span-2",
			3: "col-span-3",
			4: "col-span-4",
			5: "col-span-5",
			6: "col-span-6",
			7: "col-span-7",
			8: "col-span-8",
			9: "col-span-9",
			10: "col-span-10",
			11: "col-span-11",
			12: "col-span-12",
			full: "col-span-full",
		},
		colStart: {
			1: "col-start-1",
			2: "col-start-2",
			3: "col-start-3",
			4: "col-start-4",
			5: "col-start-5",
			6: "col-start-6",
			7: "col-start-7",
			8: "col-start-8",
			9: "col-start-9",
			10: "col-start-10",
			11: "col-start-11",
			12: "col-start-12",
			auto: "col-start-auto",
		},
	},
	defaultVariants: {
		colSpan: 12,
		colStart: "auto",
	},
});

type GridItemProps = React.ComponentProps<"div"> &
	VariantProps<typeof gridItemVariants>;

function GridItem({ className, colSpan, colStart, ...props }: GridItemProps) {
	return (
		<div
			data-slot="grid-item"
			className={cn(gridItemVariants({ colSpan, colStart }), className)}
			{...props}
		/>
	);
}

export { Grid, GridItem, gridVariants, gridItemVariants };
export type { GridProps, GridItemProps };
