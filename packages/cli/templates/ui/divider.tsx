import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0", {
	variants: {
		variant: {
			solid: "",
			dashed: "",
			dotted: "",
			dots: "flex items-center overflow-hidden",
			equals: "flex items-center overflow-hidden",
			pills: "flex items-center",
		},
		orientation: {
			horizontal: "w-full",
			vertical: "self-stretch",
		},
	},
	compoundVariants: [
		{
			variant: "solid",
			orientation: "horizontal",
			class:
				"h-[var(--border-width-base)] bg-border",
		},
		{
			variant: "solid",
			orientation: "vertical",
			class:
				"w-[var(--border-width-base)] bg-border",
		},
		{
			variant: "dashed",
			orientation: "horizontal",
			class:
				"h-0 border-t-[length:var(--border-width-base)] border-dashed border-border",
		},
		{
			variant: "dashed",
			orientation: "vertical",
			class:
				"w-0 border-l-[length:var(--border-width-base)] border-dashed border-border",
		},
		{
			variant: "dotted",
			orientation: "horizontal",
			class:
				"h-0 border-t-[length:var(--border-width-base)] border-dotted border-border",
		},
		{
			variant: "dotted",
			orientation: "vertical",
			class:
				"w-0 border-l-[length:var(--border-width-base)] border-dotted border-border",
		},
		{
			variant: "dots",
			orientation: "horizontal",
			class: "h-4 w-full",
		},
		{
			variant: "dots",
			orientation: "vertical",
			class: "flex-col w-4 h-full",
		},
		{
			variant: "equals",
			orientation: "horizontal",
			class: "h-4 w-full",
		},
		{
			variant: "equals",
			orientation: "vertical",
			class: "flex-col w-4 h-full",
		},
		{
			variant: "pills",
			orientation: "horizontal",
			class: "flex-row gap-[calc(var(--spacing)*2)] h-4 w-full",
		},
		{
			variant: "pills",
			orientation: "vertical",
			class: "flex-col gap-[calc(var(--spacing)*2)] w-4 h-full",
		},
	],
	defaultVariants: {
		variant: "solid",
		orientation: "horizontal",
	},
});

type DividerVariants = VariantProps<typeof dividerVariants>;

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: DividerVariants["variant"];
	orientation?: DividerVariants["orientation"];
}

function PillsContent({ orientation }: { orientation: "horizontal" | "vertical" }) {
	const count = orientation === "horizontal" ? 24 : 16;
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
					key={i}
					className="bg-border shrink-0"
					style={{
						borderRadius: "var(--radius)",
						height:
							orientation === "horizontal"
								? "max(var(--border-width-base), 4px)"
								: "calc(var(--spacing) * 4)",
						width:
							orientation === "horizontal"
								? "calc(var(--spacing) * 4)"
								: "max(var(--border-width-base), 4px)",
					}}
				/>
			))}
		</>
	);
}

function CharContent({
	char,
	orientation,
}: {
	char: string;
	orientation: "horizontal" | "vertical";
}) {
	const text = char.repeat(80);
	return (
		<span
			className="text-border leading-none select-none overflow-hidden"
			style={{
				fontSize: "calc(var(--spacing) * 3)",
				writingMode: orientation === "vertical" ? "vertical-lr" : undefined,
				whiteSpace: "nowrap",
				letterSpacing: "0.05em",
			}}
		>
			{text}
		</span>
	);
}

function Divider({
	variant = "solid",
	orientation = "horizontal",
	className,
	...props
}: DividerProps) {
	const isCharVariant = variant === "dots" || variant === "equals";
	const isPills = variant === "pills";

	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={cn(dividerVariants({ variant, orientation }), className)}
			{...props}
		>
			{isCharVariant && (
				<CharContent
					char={variant === "dots" ? "·" : "═"}
					orientation={orientation}
				/>
			)}
			{isPills && <PillsContent orientation={orientation} />}
		</div>
	);
}

export { Divider, dividerVariants };
export type { DividerProps };
