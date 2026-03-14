import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const callToActionVariants = cva("group/cta flex flex-col", {
	variants: {
		intensity: {
			subtle: "bg-transparent",
			standard:
				"bg-surface-brand border border-stroke-brand rounded-lg p-6",
			bold: "bg-[var(--bg-fill-brand)] rounded-lg p-6",
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

function CallToAction({
	className,
	intensity = "standard",
	align = "start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof callToActionVariants>) {
	return (
		<div
			data-intensity={intensity}
			className={cn(callToActionVariants({ intensity, align }), className)}
			{...props}
		/>
	);
}

function CallToActionHeadline({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-brand font-bold text-xl text-foreground group-data-[intensity=bold]/cta:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function CallToActionBody({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-sm text-muted-foreground max-w-prose mt-2 group-data-[intensity=bold]/cta:text-inverse/80",
				className,
			)}
			{...props}
		/>
	);
}

function CallToActionActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-wrap gap-3 mt-4", className)}
			{...props}
		/>
	);
}

export {
	CallToAction,
	CallToActionHeadline,
	CallToActionBody,
	CallToActionActions,
	callToActionVariants,
};
