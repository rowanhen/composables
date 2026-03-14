import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── StatsBar ─────────────────────────────────────────────────────────────────

const statsBarVariants = cva("group/stats-bar w-full", {
	variants: {
		layout: {
			row: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12",
			compact: "flex flex-wrap gap-6 md:gap-10",
		},
		intensity: {
			subtle: "border border-border rounded-xl p-8",
			standard: "bg-card rounded-xl p-8 ring-[length:var(--border-width)] ring-foreground/10",
			bold: "bg-[var(--bg-fill-brand)] rounded-xl p-8",
		},
	},
	defaultVariants: {
		layout: "row",
		intensity: "standard",
	},
});

type StatsBarProps = React.ComponentProps<"div"> &
	VariantProps<typeof statsBarVariants>;

function StatsBar({
	className,
	layout = "row",
	intensity = "standard",
	...props
}: StatsBarProps) {
	return (
		<div
			data-intensity={intensity}
			data-layout={layout}
			className={cn(statsBarVariants({ layout, intensity }), className)}
			{...props}
		/>
	);
}

function StatItem({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col gap-1 group-data-[layout=compact]/stats-bar:min-w-[120px]",
				className,
			)}
			{...props}
		/>
	);
}

function StatValue({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"font-brand font-bold text-4xl leading-none tracking-tight text-foreground group-data-[intensity=bold]/stats-bar:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function StatLabel({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"text-xs text-muted-foreground group-data-[intensity=bold]/stats-bar:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function StatDescription({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-2xs text-muted-foreground/70 mt-1 group-data-[intensity=bold]/stats-bar:text-inverse/50",
				className,
			)}
			{...props}
		/>
	);
}

export {
	StatsBar,
	StatItem,
	StatValue,
	StatLabel,
	StatDescription,
	statsBarVariants,
};
