import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── CTABanner ────────────────────────────────────────────────────────────────
// Full-width call-to-action band. Different from the CallToAction component
// which is a card-level element. This is a full-width section.

const ctaBannerVariants = cva(
	"group/cta-banner w-full flex flex-col items-center justify-between gap-8",
	{
		variants: {
			intensity: {
				subtle: "border border-border rounded-xl p-8 bg-transparent",
				standard:
					"bg-surface-brand border border-stroke-brand rounded-xl p-8",
				bold: "bg-[var(--bg-fill-brand)] rounded-xl p-8",
			},
			align: {
				left: "md:flex-row text-left",
				center: "text-center",
			},
		},
		defaultVariants: {
			intensity: "bold",
			align: "left",
		},
	},
);

type CTABannerProps = React.ComponentProps<"div"> &
	VariantProps<typeof ctaBannerVariants>;

function CTABanner({
	className,
	intensity = "bold",
	align = "left",
	...props
}: CTABannerProps) {
	return (
		<div
			data-intensity={intensity}
			data-align={align}
			className={cn(ctaBannerVariants({ intensity, align }), className)}
			{...props}
		/>
	);
}

function CTABannerContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col gap-2 group-data-[align=center]/cta-banner:items-center",
				className,
			)}
			{...props}
		/>
	);
}

function CTABannerEyebrow({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-2xs font-brand font-semibold uppercase tracking-wider text-brand group-data-[intensity=bold]/cta-banner:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function CTABannerHeadline({
	className,
	...props
}: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(
				"font-brand font-bold text-2xl leading-tight text-foreground group-data-[intensity=bold]/cta-banner:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function CTABannerSubtitle({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-sm text-muted-foreground max-w-xl group-data-[intensity=bold]/cta-banner:text-inverse/80",
				className,
			)}
			{...props}
		/>
	);
}

function CTABannerActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-3 shrink-0 group-data-[align=center]/cta-banner:justify-center",
				className,
			)}
			{...props}
		/>
	);
}

export {
	CTABanner,
	CTABannerContent,
	CTABannerEyebrow,
	CTABannerHeadline,
	CTABannerSubtitle,
	CTABannerActions,
	ctaBannerVariants,
};
