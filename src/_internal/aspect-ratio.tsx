import { cn } from '../lib/utils'

function AspectRatio({
	ratio = 16 / 9,
	className,
	children,
	...props
}: React.ComponentProps<'div'> & {
	ratio?: number
}) {
	return (
		<div
			data-slot="aspect-ratio"
			style={{ paddingBottom: `${100 / ratio}%` }}
			className={cn('relative w-full', className)}
			{...props}
		>
			<div className="absolute inset-0">{children}</div>
		</div>
	)
}

export { AspectRatio }
