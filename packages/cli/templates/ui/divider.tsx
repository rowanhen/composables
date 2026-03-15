import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0", {
	variants: {
		variant: {
			solid: "",
			dots: "flex items-center overflow-hidden",
			pills: "flex items-center overflow-hidden",
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
			class: "h-[var(--border-width-base)] bg-border",
		},
		{
			variant: "solid",
			orientation: "vertical",
			class: "w-[var(--border-width-base)] bg-border",
		},
		{
			variant: "dots",
			orientation: "horizontal",
			class: "flex-row gap-[calc(var(--spacing)*1)] h-[var(--border-width-base)] w-full",
		},
		{
			variant: "dots",
			orientation: "vertical",
			class: "flex-col gap-[calc(var(--spacing)*1)] w-[var(--border-width-base)] h-full",
		},
		{
			variant: "pills",
			orientation: "horizontal",
			class: "flex-row gap-[calc(var(--spacing)*1)] h-[var(--border-width-base)] w-full",
		},
		{
			variant: "pills",
			orientation: "vertical",
			class: "flex-col gap-[calc(var(--spacing)*1)] w-[var(--border-width-base)] h-full",
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
	/** Width multiplier for pills. Controls pill width as calc(var(--border-width-base) * n). @default 4 */
	pillsMultiplier?: number;
}

function DotsContent({ orientation }: { orientation: "horizontal" | "vertical" }) {
	return (
		<>
			{Array.from({ length: 60 }).map((_, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
					key={i}
					className="bg-border shrink-0"
					style={{
						borderRadius: "var(--radius)",
						width: "var(--border-width-base)",
						height: "var(--border-width-base)",
					}}
				/>
			))}
		</>
	);
}

function PillsContent({
	orientation,
	pillsMultiplier = 4,
}: {
	orientation: "horizontal" | "vertical";
	pillsMultiplier?: number;
}) {
	return (
		<>
			{Array.from({ length: 60 }).map((_, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
					key={i}
					className="bg-border shrink-0"
					style={{
						borderRadius: "var(--radius)",
						height:
							orientation === "horizontal"
								? "var(--border-width-base)"
								: `calc(var(--border-width-base) * ${pillsMultiplier})`,
						width:
							orientation === "horizontal"
								? `calc(var(--border-width-base) * ${pillsMultiplier})`
								: "var(--border-width-base)",
					}}
				/>
			))}
		</>
	);
}

function Divider({
	variant = "solid",
	orientation = "horizontal",
	pillsMultiplier = 4,
	className,
	...props
}: DividerProps) {
	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={cn(dividerVariants({ variant, orientation }), className)}
			style={variant === "solid" ? { borderRadius: "var(--radius)" } : undefined}
			{...props}
		>
			{variant === "dots" && <DotsContent orientation={orientation} />}
			{variant === "pills" && (
				<PillsContent orientation={orientation} pillsMultiplier={pillsMultiplier} />
			)}
		</div>
	);
}

export { Divider, dividerVariants };
export type { DividerProps };
