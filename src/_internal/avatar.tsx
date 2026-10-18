import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../lib/utils'

const avatarVariants = cva(
	'group/avatar relative flex shrink-0 overflow-hidden rounded-full bg-muted',
	{
		variants: {
			variant: {
				default: '',
				// Brand ring around the avatar and its initials.
				brand: 'border border-(color:--bg-fill-primary-hover)',
			},
			size: {
				xs: 'size-5',
				sm: 'size-6',
				md: 'size-8',
				lg: 'size-10',
				xl: 'size-14',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'default',
		},
	},
)

function Avatar({
	className,
	size = 'md',
	variant = 'default',
	...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-variant={variant}
			className={cn(avatarVariants({ size, variant }), className)}
			{...props}
		/>
	)
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn('aspect-square size-full object-cover', className)}
			{...props}
		/>
	)
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				'flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium group-data-[variant=brand]/avatar:bg-surface-brand group-data-[variant=brand]/avatar:text-foreground group-data-[variant=brand]/avatar:font-bold',
				className,
			)}
			{...props}
		/>
	)
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }
