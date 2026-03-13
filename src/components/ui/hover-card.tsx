import { PreviewCard as HoverCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils";

function HoverCard({ ...props }: HoverCardPrimitive.Root.Props) {
	return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({ ...props }: HoverCardPrimitive.Trigger.Props) {
	return (
		<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

function HoverCardContent({
	className,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	sideOffset = 8,
	children,
	...props
}: HoverCardPrimitive.Popup.Props &
	Pick<
		HoverCardPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<HoverCardPrimitive.Portal>
			<HoverCardPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-popover"
			>
				<HoverCardPrimitive.Popup
					data-slot="hover-card-content"
					className={cn(
						"bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 rounded-lg p-4 text-xs shadow-md ring-1 duration-fast z-popover w-80 origin-(--transform-origin) outline-hidden",
						className,
					)}
					{...props}
				>
					{children}
				</HoverCardPrimitive.Popup>
			</HoverCardPrimitive.Positioner>
		</HoverCardPrimitive.Portal>
	);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
