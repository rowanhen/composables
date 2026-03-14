import { cva, type VariantProps } from "class-variance-authority";
import { QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── TestimonialCard ──────────────────────────────────────────────────────────

const testimonialCardVariants = cva(
	"group/testimonial flex flex-col gap-4 rounded-xl p-6",
	{
		variants: {
			intensity: {
				subtle: "bg-transparent border border-border",
				standard: "bg-card ring-[length:var(--border-width)] ring-foreground/10",
				bold: "bg-[var(--bg-fill-brand)]",
			},
		},
		defaultVariants: {
			intensity: "standard",
		},
	},
);

type TestimonialCardProps = React.ComponentProps<"figure"> &
	VariantProps<typeof testimonialCardVariants>;

function TestimonialCard({
	className,
	intensity = "standard",
	...props
}: TestimonialCardProps) {
	return (
		<figure
			data-intensity={intensity}
			className={cn(testimonialCardVariants({ intensity }), className)}
			{...props}
		/>
	);
}

function TestimonialQuote({
	className,
	...props
}: React.ComponentProps<"blockquote">) {
	return (
		<blockquote
			className={cn(
				"relative flex-1 text-sm/relaxed text-foreground group-data-[intensity=bold]/testimonial:text-inverse",
				className,
			)}
			{...props}
		>
			<QuoteIcon className="size-4 text-brand mb-2 group-data-[intensity=bold]/testimonial:text-inverse/60" />
			{props.children}
		</blockquote>
	);
}

function TestimonialAuthor({
	className,
	...props
}: React.ComponentProps<"figcaption">) {
	return (
		<figcaption
			className={cn("flex items-center gap-3 mt-auto", className)}
			{...props}
		/>
	);
}

type TestimonialAvatarProps = {
	src?: string;
	fallback: string;
	className?: string;
};

function TestimonialAvatar({
	src,
	fallback,
	className,
}: TestimonialAvatarProps) {
	return (
		<Avatar size="md" className={className}>
			{src && <AvatarImage src={src} alt={fallback} />}
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
}

function TestimonialName({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-xs font-semibold text-foreground group-data-[intensity=bold]/testimonial:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function TestimonialRole({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-xs text-muted-foreground group-data-[intensity=bold]/testimonial:text-inverse/60",
				className,
			)}
			{...props}
		/>
	);
}

// ─── TestimonialSection ───────────────────────────────────────────────────────

const testimonialSectionVariants = cva("group/testimonial-section w-full", {
	variants: {
		layout: {
			grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
			masonry:
				"columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6",
		},
	},
	defaultVariants: {
		layout: "grid",
	},
});

type TestimonialSectionProps = React.ComponentProps<"div"> &
	VariantProps<typeof testimonialSectionVariants>;

function TestimonialSection({
	className,
	layout = "grid",
	...props
}: TestimonialSectionProps) {
	return (
		<div
			className={cn(
				testimonialSectionVariants({ layout }),
				className,
			)}
			{...props}
		/>
	);
}

export {
	TestimonialCard,
	TestimonialQuote,
	TestimonialAuthor,
	TestimonialAvatar,
	TestimonialName,
	TestimonialRole,
	TestimonialSection,
	testimonialCardVariants,
	testimonialSectionVariants,
};
