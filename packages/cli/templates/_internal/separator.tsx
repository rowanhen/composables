import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/lib/utils";

function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"bg-stroke shrink-0 data-[orientation=horizontal]:h-[var(--border-width-base,1px)] data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[var(--border-width-base,1px)] data-[orientation=vertical]:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
