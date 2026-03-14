import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── FeatureGrid ─────────────────────────────────────────────────────────────

const featureGridVariants = cva("group/feature-grid w-full", {
	variants: {
		layout: {
			grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
			bento:
				"grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4",
			alternating: "flex flex-col gap-16",
		},
		intensity: {
			subtle: "",
			standard: "",
			bold: "",
		},
	},
	defaultVariants: {
		layout: "grid",
		intensity: "standard",
	},
});

type FeatureGridProps = React.ComponentProps<"div"> &
	VariantProps<typeof featureGridVariants>;

function FeatureGrid({
	className,
	layout = "grid",
	intensity = "standard",
	...props
}: FeatureGridProps) {
	return (
		<div
			data-layout={layout}
			data-intensity={intensity}
			className={cn(featureGridVariants({ layout, intensity }), className)}
			{...props}
		/>
	);
}

// Icon-grid item
const featureGridItemVariants = cva(
	"group/feature-item flex flex-col gap-3 rounded-xl p-6",
	{
		variants: {
			intensity: {
				subtle: "border border-border bg-transparent",
				standard:
					"bg-card ring-[length:var(--border-width)] ring-foreground/10",
				bold: "bg-[var(--bg-fill-brand)]",
			},
			// bento span support
			span: {
				1: "col-span-1",
				2: "col-span-2",
				3: "col-span-3",
				4: "col-span-4",
			},
			rowSpan: {
				1: "row-span-1",
				2: "row-span-2",
			},
		},
		defaultVariants: {
			intensity: "standard",
			span: 1,
			rowSpan: 1,
		},
	},
);

type FeatureGridItemProps = React.ComponentProps<"div"> &
	VariantProps<typeof featureGridItemVariants>;

function FeatureGridItem({
	className,
	intensity = "standard",
	span = 1,
	rowSpan = 1,
	...props
}: FeatureGridItemProps) {
	return (
		<div
			data-intensity={intensity}
			className={cn(
				featureGridItemVariants({ intensity, span, rowSpan }),
				className,
			)}
			{...props}
		/>
	);
}

function FeatureGridIcon({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex items-center justify-center size-10 rounded-lg bg-surface-brand text-brand [&_svg]:size-5 group-data-[intensity=bold]/feature-item:bg-white/15 group-data-[intensity=bold]/feature-item:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FeatureGridTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-brand font-bold text-sm text-foreground group-data-[intensity=bold]/feature-item:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FeatureGridDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs/relaxed text-muted-foreground group-data-[intensity=bold]/feature-item:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

// Alternating row layout
const featureRowVariants = cva(
	"group/feature-row flex flex-col md:flex-row items-center gap-12",
	{
		variants: {
			reverse: {
				true: "md:flex-row-reverse",
				false: "",
			},
		},
		defaultVariants: {
			reverse: false,
		},
	},
);

type FeatureRowProps = React.ComponentProps<"div"> &
	VariantProps<typeof featureRowVariants>;

function FeatureRow({
	className,
	reverse = false,
	...props
}: FeatureRowProps) {
	return (
		<div
			className={cn(featureRowVariants({ reverse }), className)}
			{...props}
		/>
	);
}

function FeatureRowContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex-1 flex flex-col gap-4", className)}
			{...props}
		/>
	);
}

function FeatureRowMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex-1 rounded-xl overflow-hidden bg-muted min-h-48 md:min-h-64",
				className,
			)}
			{...props}
		/>
	);
}

export {
	FeatureGrid,
	FeatureGridItem,
	FeatureGridIcon,
	FeatureGridTitle,
	FeatureGridDescription,
	FeatureRow,
	FeatureRowContent,
	FeatureRowMedia,
	featureGridVariants,
	featureGridItemVariants,
};
