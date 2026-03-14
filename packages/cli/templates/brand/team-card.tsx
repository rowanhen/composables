import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ─── TeamCard ─────────────────────────────────────────────────────────────────

const teamCardVariants = cva(
	"group/team-card flex flex-col items-center text-center gap-3 p-6 rounded-xl",
	{
		variants: {
			intensity: {
				subtle: "border border-border bg-transparent",
				standard:
					"bg-card ring-[length:var(--border-width)] ring-foreground/10",
				bold: "bg-[var(--bg-fill-brand)]",
			},
		},
		defaultVariants: {
			intensity: "standard",
		},
	},
);

type TeamCardProps = React.ComponentProps<"div"> &
	VariantProps<typeof teamCardVariants>;

function TeamCard({
	className,
	intensity = "standard",
	...props
}: TeamCardProps) {
	return (
		<div
			data-intensity={intensity}
			className={cn(teamCardVariants({ intensity }), className)}
			{...props}
		/>
	);
}

type TeamCardAvatarProps = {
	src?: string;
	fallback: string;
	className?: string;
};

function TeamCardAvatar({ src, fallback, className }: TeamCardAvatarProps) {
	return (
		<Avatar size="xl" className={className}>
			{src && <AvatarImage src={src} alt={fallback} />}
			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	);
}

function TeamCardName({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-brand font-bold text-sm text-foreground group-data-[intensity=bold]/team-card:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function TeamCardRole({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs text-muted-foreground group-data-[intensity=bold]/team-card:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function TeamCardBio({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs/relaxed text-muted-foreground group-data-[intensity=bold]/team-card:text-inverse/60",
				className,
			)}
			{...props}
		/>
	);
}

function TeamCardSocials({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex items-center gap-2 mt-auto", className)}
			{...props}
		/>
	);
}

type TeamCardSocialLinkProps = Omit<React.ComponentProps<"a">, "aria-label"> & {
	"aria-label": string;
};

function TeamCardSocialLink({
	className,
	...props
}: TeamCardSocialLinkProps) {
	return (
		<a
			className={cn(
				"flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors [&_svg]:size-3.5 group-data-[intensity=bold]/team-card:text-inverse/60 group-data-[intensity=bold]/team-card:hover:text-inverse group-data-[intensity=bold]/team-card:hover:bg-white/10",
				className,
			)}
			{...props}
		/>
	);
}

// ─── TeamSection ─────────────────────────────────────────────────────────────

const teamSectionVariants = cva(
	"group/team-section grid gap-6",
	{
		variants: {
			columns: {
				2: "grid-cols-1 sm:grid-cols-2",
				3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
				4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
			},
		},
		defaultVariants: {
			columns: 3,
		},
	},
);

type TeamSectionProps = React.ComponentProps<"div"> &
	VariantProps<typeof teamSectionVariants>;

function TeamSection({
	className,
	columns = 3,
	...props
}: TeamSectionProps) {
	return (
		<div
			className={cn(teamSectionVariants({ columns }), className)}
			{...props}
		/>
	);
}

export {
	TeamCard,
	TeamCardAvatar,
	TeamCardName,
	TeamCardRole,
	TeamCardBio,
	TeamCardSocials,
	TeamCardSocialLink,
	TeamSection,
	teamCardVariants,
	teamSectionVariants,
};
