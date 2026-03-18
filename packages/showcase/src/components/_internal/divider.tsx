import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0", {
	variants: {
		variant: {
			solid: "",
			dots: "",
			pills: "",
		},
		orientation: {
			horizontal: "w-full",
			vertical: "self-stretch",
		},
		align: {
			start: "",
			center: "",
			end: "",
		},
	},
	compoundVariants: [
		{
			variant: "solid",
			orientation: "horizontal",
			class: "h-[var(--border-width-base)] bg-stroke",
		},
		{
			variant: "solid",
			orientation: "vertical",
			class: "w-[var(--border-width-base)] bg-stroke",
		},
		{
			variant: "dots",
			orientation: "horizontal",
			class: "h-[var(--border-width-base)]",
		},
		{
			variant: "dots",
			orientation: "vertical",
			class: "w-[var(--border-width-base)]",
		},
		{
			variant: "pills",
			orientation: "horizontal",
			class: "h-[var(--border-width-base)]",
		},
		{
			variant: "pills",
			orientation: "vertical",
			class: "w-[var(--border-width-base)]",
		},
	],
	defaultVariants: {
		variant: "solid",
		orientation: "horizontal",
		align: "center",
	},
});

type DividerVariants = VariantProps<typeof dividerVariants>;

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: DividerVariants["variant"];
	orientation?: "horizontal" | "vertical";
	/** Vertical alignment of the divider within its line. @default "center" */
	align?: "start" | "center" | "end";
	/** Width multiplier for pills. Controls pill width as calc(var(--border-width-base) * n). @default 4 */
	pillsMultiplier?: number;
}

function getPatternStyle(
	variant: "dots" | "pills",
	orientation: "horizontal" | "vertical",
	pillsMultiplier: number,
): React.CSSProperties {
	if (variant === "dots") {
		// Dot size = border-width-base, gap = spacing
		// Repeating unit = dot + gap
		return orientation === "horizontal"
			? {
					backgroundImage:
						"radial-gradient(circle, var(--border-default) calc(var(--border-width-base) / 2), transparent 0)",
					backgroundSize:
						"calc(var(--border-width-base) + var(--spacing) * 1) var(--border-width-base)",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "left center",
				}
			: {
					backgroundImage:
						"radial-gradient(circle, var(--border-default) calc(var(--border-width-base) / 2), transparent 0)",
					backgroundSize:
						"var(--border-width-base) calc(var(--border-width-base) + var(--spacing) * 1)",
					backgroundRepeat: "repeat-y",
					backgroundPosition: "center top",
				};
	}

	// pills
	const pillLen = `calc(var(--border-width-base) * ${pillsMultiplier})`;
	const unit = `calc(${pillLen} + var(--spacing) * 1)`;

	return orientation === "horizontal"
		? {
				backgroundImage: `repeating-linear-gradient(to right, var(--border-default) 0, var(--border-default) ${pillLen}, transparent ${pillLen}, transparent ${unit})`,
				backgroundSize: `${unit} var(--border-width-base)`,
				backgroundRepeat: "repeat-x",
				backgroundPosition: "left center",
				borderRadius: "var(--radius)",
			}
		: {
				backgroundImage: `repeating-linear-gradient(to bottom, var(--border-default) 0, var(--border-default) ${pillLen}, transparent ${pillLen}, transparent ${unit})`,
				backgroundSize: `var(--border-width-base) ${unit}`,
				backgroundRepeat: "repeat-y",
				backgroundPosition: "center top",
				borderRadius: "var(--radius)",
			};
}

const alignSelfMap = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
} as const;

function Divider({
	variant = "solid",
	orientation = "horizontal",
	align = "center",
	pillsMultiplier = 4,
	className,
	style,
	...props
}: DividerProps) {
	const patternStyle =
		variant === "dots" || variant === "pills"
			? getPatternStyle(variant, orientation, pillsMultiplier)
			: { borderRadius: "var(--radius)" };

	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={cn(dividerVariants({ variant, orientation, align }), className)}
			style={{
				alignSelf: alignSelfMap[align],
				...patternStyle,
				...style,
			}}
			{...props}
		/>
	);
}

export { Divider, dividerVariants };
export type { DividerProps };
