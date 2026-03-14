import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const featureCardVariants = cva("group/feature-card flex flex-col", {
	variants: {
		intensity: {
			subtle: "bg-transparent",
			standard:
				"bg-surface-brand border border-stroke-brand rounded-lg p-4",
			bold: "bg-[var(--bg-fill-brand)] rounded-lg p-4",
		},
	},
	defaultVariants: {
		intensity: "standard",
	},
});

function FeatureCard({
	className,
	intensity = "standard",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof featureCardVariants>) {
	return (
		<div
			data-intensity={intensity}
			className={cn(featureCardVariants({ intensity, className }))}
			{...props}
		/>
	);
}

function FeatureCardIcon({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex items-center justify-center size-9 rounded-md bg-surface-brand text-brand [&_svg]:size-4 group-data-[intensity=bold]/feature-card:bg-white/15 group-data-[intensity=bold]/feature-card:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FeatureCardTitle({
	className,
	...props
}: React.ComponentProps<"h4">) {
	return (
		<h4
			className={cn(
				"font-brand font-bold text-sm text-foreground mt-3 group-data-[intensity=bold]/feature-card:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FeatureCardDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs/relaxed text-muted-foreground mt-1 group-data-[intensity=bold]/feature-card:text-inverse/80",
				className,
			)}
			{...props}
		/>
	);
}

export {
	FeatureCard,
	FeatureCardIcon,
	FeatureCardTitle,
	FeatureCardDescription,
	featureCardVariants,
};
