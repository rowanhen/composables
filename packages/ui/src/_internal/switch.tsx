import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn, FOCUS_RING } from '../lib/utils';

function Switch({
	className,
	size = "default",
	...props
}: SwitchPrimitive.Root.Props & {
	size?: "sm" | "default";
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(
				FOCUS_RING,
				"data-checked:bg-primary data-unchecked:bg-field dark:data-unchecked:bg-field/80 hover:ring-2 hover:ring-focus/30 shrink-0 rounded-[var(--radius)] p-0.5 data-[size=default]:h-4 data-[size=default]:w-7 data-[size=sm]:h-3.5 data-[size=sm]:w-6 peer group/switch relative inline-flex items-center transition-[opacity,box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-disabled",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className="bg-page dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-[var(--radius)] group-data-[size=default]/switch:size-3 group-data-[size=sm]/switch:size-2.5 group-data-[size=default]/switch:data-checked:translate-x-3 group-data-[size=sm]/switch:data-checked:translate-x-2.5 data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform"
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
