import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
	"relative flex shrink-0 overflow-hidden rounded-full bg-muted",
	{
		variants: {
			size: {
				xs: "size-5",
				sm: "size-6",
				md: "size-8",
				lg: "size-10",
				xl: "size-14",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

function Avatar({
	className,
	size = "md",
	...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(avatarVariants({ size }), className)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full object-cover", className)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
