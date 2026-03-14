import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── LogoCloud ────────────────────────────────────────────────────────────────

const logoCloudVariants = cva("group/logo-cloud w-full", {
	variants: {
		layout: {
			row: "flex flex-wrap items-center justify-center gap-8 md:gap-12",
			grid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8",
		},
		intensity: {
			subtle: "",
			standard: "",
			bold: "",
		},
	},
	defaultVariants: {
		layout: "row",
		intensity: "standard",
	},
});

type LogoCloudProps = React.ComponentProps<"div"> &
	VariantProps<typeof logoCloudVariants>;

function LogoCloud({
	className,
	layout = "row",
	intensity = "standard",
	...props
}: LogoCloudProps) {
	return (
		<div
			data-layout={layout}
			data-intensity={intensity}
			className={cn(logoCloudVariants({ layout, intensity }), className)}
			{...props}
		/>
	);
}

const logoItemVariants = cva(
	"flex items-center justify-center transition-all duration-[var(--transition-default,200ms)]",
	{
		variants: {
			intensity: {
				subtle:
					"opacity-40 grayscale hover:opacity-70 hover:grayscale-0",
				standard:
					"opacity-50 grayscale hover:opacity-80 hover:grayscale-0",
				bold: "opacity-100",
			},
		},
		defaultVariants: {
			intensity: "standard",
		},
	},
);

type LogoItemProps = React.ComponentProps<"div"> &
	VariantProps<typeof logoItemVariants>;

function LogoItem({
	className,
	intensity = "standard",
	...props
}: LogoItemProps) {
	return (
		<div
			className={cn(logoItemVariants({ intensity }), className)}
			{...props}
		/>
	);
}

function LogoCloudLabel({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs text-muted-foreground text-center mb-6 uppercase tracking-wider font-medium",
				className,
			)}
			{...props}
		/>
	);
}

export { LogoCloud, LogoItem, LogoCloudLabel, logoCloudVariants, logoItemVariants };
