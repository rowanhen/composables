import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionHeaderVariants = cva("group/section-header flex flex-col", {
	variants: {
		intensity: {
			subtle: "opacity-80",
			standard: "bg-transparent",
			bold: "bg-surface-brand border border-stroke-brand rounded-lg p-6",
		},
		align: {
			start: "items-start text-left",
			center: "items-center text-center",
		},
	},
	defaultVariants: {
		intensity: "standard",
		align: "start",
	},
});

function SectionHeader({
	className,
	intensity = "standard",
	align = "start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof sectionHeaderVariants>) {
	return (
		<div
			data-intensity={intensity}
			className={cn(sectionHeaderVariants({ intensity, align }), className)}
			{...props}
		/>
	);
}

function SectionHeaderEyebrow({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-2xs font-brand font-semibold uppercase tracking-wider text-brand group-data-[intensity=bold]/section-header:text-brand",
				className,
			)}
			{...props}
		/>
	);
}

function SectionHeaderTitle({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn("font-brand font-bold text-2xl text-foreground mt-1", className)}
			{...props}
		/>
	);
}

function SectionHeaderSubtitle({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-sm text-muted-foreground max-w-prose mt-2", className)} {...props} />
	);
}

export {
	SectionHeader,
	SectionHeaderEyebrow,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
	sectionHeaderVariants,
};
