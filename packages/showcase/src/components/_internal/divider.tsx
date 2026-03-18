import type * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

function Divider({
	orientation = "horizontal",
	className,
	...props
}: DividerProps) {
	return (
		<div
			role="separator"
			aria-orientation={orientation}
			className={cn(
				"bg-stroke shrink-0",
				orientation === "horizontal"
					? "h-[var(--border-width-base)] w-full"
					: "w-[var(--border-width-base)] self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Divider };
export type { DividerProps };
