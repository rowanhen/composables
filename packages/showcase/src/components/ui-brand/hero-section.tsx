import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Hero Section ────────────────────────────────────────────────────────────

const heroSectionVariants = cva(
	"group/hero relative w-full flex flex-col",
	{
		variants: {
			variant: {
				centered: "items-center text-center",
				split: "flex-col md:flex-row items-center gap-12",
				"with-background":
					"items-center text-center bg-[var(--bg-fill-brand)] text-inverse",
			},
			intensity: {
				subtle: "bg-muted/20",
				standard: "",
				bold: "bg-surface-brand/20 shadow-md",
			},
		},
		defaultVariants: {
			variant: "centered",
			intensity: "standard",
		},
	},
);

const heroPaddingVariants = cva("", {
	variants: {
		intensity: {
			subtle: "py-[var(--hero-padding-y,theme(spacing.24))] px-6",
			standard:
				"py-[var(--hero-padding-y,theme(spacing.40))] px-6",
			bold: "py-[var(--hero-padding-y,theme(spacing.40))] px-6",
		},
	},
	defaultVariants: { intensity: "standard" },
});

type HeroSectionProps = React.ComponentProps<"section"> &
	VariantProps<typeof heroSectionVariants>;

function HeroSection({
	className,
	variant = "centered",
	intensity = "standard",
	...props
}: HeroSectionProps) {
	return (
		<section
			data-variant={variant}
			data-intensity={intensity}
			className={cn(
				heroSectionVariants({ variant, intensity }),
				heroPaddingVariants({ intensity }),
				className,
			)}
			{...props}
		/>
	);
}

function HeroEyebrow({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-2xs font-brand font-semibold uppercase tracking-wider text-brand group-data-[variant=with-background]/hero:text-inverse/70 mb-4",
				className,
			)}
			{...props}
		/>
	);
}

function HeroHeadline({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn(
				"font-brand font-[var(--hero-font-weight,700)] text-[var(--hero-font-size,theme(fontSize.5xl))] leading-none tracking-[var(--hero-letter-spacing,theme(letterSpacing.tight))] text-foreground group-data-[variant=with-background]/hero:text-inverse max-w-4xl",
				className,
			)}
			{...props}
		/>
	);
}

function HeroSubheadline({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-base/relaxed text-muted-foreground max-w-2xl mt-6 group-data-[variant=with-background]/hero:text-inverse/80",
				className,
			)}
			{...props}
		/>
	);
}

function HeroActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-wrap gap-3 mt-8 group-data-[variant=centered]/hero:justify-center",
				className,
			)}
			{...props}
		/>
	);
}

function HeroMedia({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"relative flex-1 min-w-0 w-full md:w-auto rounded-xl overflow-hidden bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

function HeroContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col group-data-[variant=centered]/hero:items-center group-data-[variant=centered]/hero:text-center flex-1 min-w-0",
				className,
			)}
			{...props}
		/>
	);
}

export {
	HeroSection,
	HeroEyebrow,
	HeroHeadline,
	HeroSubheadline,
	HeroActions,
	HeroMedia,
	HeroContent,
	heroSectionVariants,
};
