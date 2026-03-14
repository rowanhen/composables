import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Footer ──────────────────────────────────────────────────────────────────

const footerVariants = cva("group/footer w-full border-t border-border", {
	variants: {
		variant: {
			multicolumn: "bg-background",
			minimal: "bg-background",
			cta: "bg-[var(--bg-fill-brand)]",
		},
		intensity: {
			subtle: "border-border/40",
			standard: "",
			bold: "border-border shadow-sm",
		},
	},
	defaultVariants: {
		variant: "multicolumn",
		intensity: "standard",
	},
});

type FooterProps = React.ComponentProps<"footer"> &
	VariantProps<typeof footerVariants>;

function Footer({
	className,
	variant = "multicolumn",
	intensity = "standard",
	...props
}: FooterProps) {
	return (
		<footer
			data-variant={variant}
			data-intensity={intensity}
			className={cn(footerVariants({ variant, intensity }), className)}
			{...props}
		/>
	);
}

function FooterInner({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[var(--container-2xl,1400px)] px-4 sm:px-6 lg:px-8",
				className,
			)}
			{...props}
		/>
	);
}

function FooterGrid({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"grid grid-cols-2 md:grid-cols-4 gap-8 py-12",
				className,
			)}
			{...props}
		/>
	);
}

function FooterBrand({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"col-span-2 md:col-span-1 flex flex-col gap-4",
				className,
			)}
			{...props}
		/>
	);
}

function FooterBrandName({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"font-brand font-bold text-sm text-foreground group-data-[variant=cta]/footer:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FooterBrandTagline({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs text-muted-foreground max-w-xs group-data-[variant=cta]/footer:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function FooterColumn({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-3", className)} {...props} />
	);
}

function FooterColumnTitle({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs font-semibold text-foreground group-data-[variant=cta]/footer:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FooterLink({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			className={cn(
				"text-xs text-muted-foreground hover:text-foreground [transition:color_var(--transition-default,200ms_ease),background-color_var(--transition-default,200ms_ease)] group-data-[variant=cta]/footer:text-inverse/70 group-data-[variant=cta]/footer:hover:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FooterBottom({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4 group-data-[variant=cta]/footer:border-white/20",
				className,
			)}
			{...props}
		/>
	);
}

function FooterCopyright({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs text-muted-foreground group-data-[variant=cta]/footer:text-inverse/60",
				className,
			)}
			{...props}
		/>
	);
}

// CTA Footer variant helpers
function FooterCTAContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col md:flex-row items-center justify-between gap-6 py-12",
				className,
			)}
			{...props}
		/>
	);
}

function FooterCTAHeadline({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-brand font-bold text-2xl text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function FooterCTASubtitle({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("text-sm text-inverse/80 max-w-lg", className)}
			{...props}
		/>
	);
}

export {
	Footer,
	FooterInner,
	FooterGrid,
	FooterBrand,
	FooterBrandName,
	FooterBrandTagline,
	FooterColumn,
	FooterColumnTitle,
	FooterLink,
	FooterBottom,
	FooterCopyright,
	FooterCTAContent,
	FooterCTAHeadline,
	FooterCTASubtitle,
	footerVariants,
};
