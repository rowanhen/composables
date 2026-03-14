import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

// ─── PricingTable ─────────────────────────────────────────────────────────────

function PricingTable({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start",
				className,
			)}
			{...props}
		/>
	);
}

// Toggle for monthly/annual billing
type PricingToggleProps = {
	value: "monthly" | "annual";
	onChange: (value: "monthly" | "annual") => void;
	className?: string;
};

function PricingToggle({ value, onChange, className }: PricingToggleProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-1 bg-muted rounded-full p-1",
				className,
			)}
		>
			<button
				type="button"
				onClick={() => onChange("monthly")}
				className={cn(
					"text-xs font-medium px-4 py-1.5 rounded-full transition-all",
					value === "monthly"
						? "bg-background text-foreground shadow-sm"
						: "text-muted-foreground hover:text-foreground",
				)}
			>
				Monthly
			</button>
			<button
				type="button"
				onClick={() => onChange("annual")}
				className={cn(
					"text-xs font-medium px-4 py-1.5 rounded-full transition-all",
					value === "annual"
						? "bg-background text-foreground shadow-sm"
						: "text-muted-foreground hover:text-foreground",
				)}
			>
				Annual
				<span className="ml-1.5 text-2xs font-semibold text-brand">
					-20%
				</span>
			</button>
		</div>
	);
}

const pricingCardVariants = cva(
	"group/pricing-card flex flex-col rounded-xl p-6 relative",
	{
		variants: {
			highlighted: {
				true: "bg-[var(--bg-fill-brand)] ring-2 ring-[var(--bg-fill-brand)]",
				false:
					"bg-card ring-[length:var(--border-width)] ring-foreground/10",
			},
			intensity: {
				subtle: "",
				standard: "",
				bold: "",
			},
		},
		defaultVariants: {
			highlighted: false,
			intensity: "standard",
		},
	},
);

type PricingCardProps = React.ComponentProps<"div"> &
	VariantProps<typeof pricingCardVariants>;

function PricingCard({
	className,
	highlighted = false,
	intensity = "standard",
	...props
}: PricingCardProps) {
	return (
		<div
			data-highlighted={highlighted ? "true" : "false"}
			data-intensity={intensity}
			className={cn(
				pricingCardVariants({ highlighted, intensity }),
				className,
			)}
			{...props}
		/>
	);
}

function PricingPopularBadge({
	className,
	children = "Most popular",
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"absolute -top-3 left-1/2 -translate-x-1/2 text-2xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-inverse text-inverse-foreground whitespace-nowrap",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
}

function PricingTier({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-1 mb-6", className)} {...props} />
	);
}

function PricingTierName({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"text-xs font-semibold uppercase tracking-wider text-brand group-data-[highlighted=true]/pricing-card:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function PricingPrice({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex items-baseline gap-1 mt-2", className)} {...props} />
	);
}

function PricingAmount({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"font-brand font-bold text-4xl leading-none tracking-tight text-foreground group-data-[highlighted=true]/pricing-card:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function PricingPeriod({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-xs text-muted-foreground group-data-[highlighted=true]/pricing-card:text-inverse/60",
				className,
			)}
			{...props}
		/>
	);
}

function PricingDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs text-muted-foreground mt-2 group-data-[highlighted=true]/pricing-card:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function PricingFeatureList({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn("flex flex-col gap-2.5 my-6 flex-1", className)}
			{...props}
		/>
	);
}

type PricingFeatureProps = React.ComponentProps<"li"> & {
	included?: boolean;
};

function PricingFeature({
	className,
	included = true,
	children,
	...props
}: PricingFeatureProps) {
	return (
		<li
			className={cn("flex items-start gap-2 text-xs", className)}
			{...props}
		>
			{included ? (
				<CheckIcon className="size-3.5 text-brand shrink-0 mt-0.5 group-data-[highlighted=true]/pricing-card:text-inverse" />
			) : (
				<XIcon className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
			)}
			<span
				className={cn(
					included
						? "text-foreground group-data-[highlighted=true]/pricing-card:text-inverse"
						: "text-muted-foreground line-through",
				)}
			>
				{children}
			</span>
		</li>
	);
}

export {
	PricingTable,
	PricingToggle,
	PricingCard,
	PricingPopularBadge,
	PricingTier,
	PricingTierName,
	PricingPrice,
	PricingAmount,
	PricingPeriod,
	PricingDescription,
	PricingFeatureList,
	PricingFeature,
	pricingCardVariants,
};
