import type * as React from "react";

import { cn, FOCUS_RING } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				FOCUS_RING,
				"border-input bg-input/20 dark:bg-input/30 resize-none rounded-md border px-2 py-2 text-sm md:text-xs/relaxed placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-disabled",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
