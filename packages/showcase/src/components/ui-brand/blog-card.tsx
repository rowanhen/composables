import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// ─── BlogCard ─────────────────────────────────────────────────────────────────

const blogCardVariants = cva(
	"group/blog-card flex flex-col overflow-hidden rounded-xl transition-[box-shadow,transform] duration-[var(--transition-default,200ms)]",
	{
		variants: {
			intensity: {
				subtle: "border border-border bg-transparent",
				standard:
					"bg-card ring-[length:var(--border-width)] ring-foreground/10 hover:shadow-md",
				bold: "bg-[var(--bg-fill-brand)]",
			},
			size: {
				default: "",
				featured: "md:flex-row",
			},
		},
		defaultVariants: {
			intensity: "standard",
			size: "default",
		},
	},
);

type BlogCardProps = React.ComponentProps<"article"> &
	VariantProps<typeof blogCardVariants>;

function BlogCard({
	className,
	intensity = "standard",
	size = "default",
	...props
}: BlogCardProps) {
	return (
		<article
			data-intensity={intensity}
			data-size={size}
			className={cn(blogCardVariants({ intensity, size }), className)}
			{...props}
		/>
	);
}

function BlogCardImage({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"w-full aspect-video bg-muted overflow-hidden group-data-[size=featured]/blog-card:w-full group-data-[size=featured]/blog-card:md:w-2/5 group-data-[size=featured]/blog-card:aspect-auto group-data-[size=featured]/blog-card:md:min-h-full",
				className,
			)}
			{...props}
		/>
	);
}

function BlogCardContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col gap-3 p-5 flex-1", className)}
			{...props}
		/>
	);
}

function BlogCardCategory({
	className,
	...props
}: React.ComponentProps<typeof Badge>) {
	return (
		<Badge
			variant="brand"
			className={cn(
				"self-start group-data-[intensity=bold]/blog-card:bg-white/20 group-data-[intensity=bold]/blog-card:text-inverse group-data-[intensity=bold]/blog-card:border-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function BlogCardTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"font-brand font-bold text-sm text-foreground leading-snug group-data-[intensity=bold]/blog-card:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function BlogCardExcerpt({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn(
				"text-xs/relaxed text-muted-foreground line-clamp-2 group-data-[intensity=bold]/blog-card:text-inverse/70",
				className,
			)}
			{...props}
		/>
	);
}

function BlogCardMeta({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 mt-auto pt-3 border-t border-border group-data-[intensity=bold]/blog-card:border-white/20",
				className,
			)}
			{...props}
		/>
	);
}

type BlogCardAuthorProps = {
	name: string;
	avatarSrc?: string;
	className?: string;
};

function BlogCardAuthor({ name, avatarSrc, className }: BlogCardAuthorProps) {
	const initials = name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Avatar size="xs">
				{avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<span className="text-2xs font-medium text-foreground group-data-[intensity=bold]/blog-card:text-inverse">
				{name}
			</span>
		</div>
	);
}

function BlogCardDate({ className, ...props }: React.ComponentProps<"time">) {
	return (
		<time
			className={cn(
				"text-2xs text-muted-foreground ml-auto group-data-[intensity=bold]/blog-card:text-inverse/60",
				className,
			)}
			{...props}
		/>
	);
}

// ─── Blog Grid ───────────────────────────────────────────────────────────────

const blogGridVariants = cva("grid gap-6", {
	variants: {
		columns: {
			2: "grid-cols-1 md:grid-cols-2",
			3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		},
	},
	defaultVariants: {
		columns: 3,
	},
});

type BlogGridProps = React.ComponentProps<"div"> &
	VariantProps<typeof blogGridVariants>;

function BlogGrid({ className, columns = 3, ...props }: BlogGridProps) {
	return (
		<div
			className={cn(blogGridVariants({ columns }), className)}
			{...props}
		/>
	);
}

export {
	BlogCard,
	BlogCardImage,
	BlogCardContent,
	BlogCardCategory,
	BlogCardTitle,
	BlogCardExcerpt,
	BlogCardMeta,
	BlogCardAuthor,
	BlogCardDate,
	BlogGrid,
	blogCardVariants,
	blogGridVariants,
};
