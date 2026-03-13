import {
	CircleCheckIcon,
	InfoIcon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
					fontFamily: "var(--font-circular)",
				} as React.CSSProperties
			}
			toastOptions={{
				unstyled: true,
				classNames: {
					toast:
						"flex items-center gap-2 rounded-lg border bg-popover p-3 text-xs font-medium text-popover-foreground shadow-md w-[var(--width)]",
					title: "text-xs font-medium leading-relaxed",
					description:
						"text-2xs font-normal leading-relaxed text-muted-foreground",
					content: "flex flex-col gap-0.5",
					icon: "flex size-4 shrink-0 items-center justify-center",
					actionButton:
						"ml-auto h-6 shrink-0 cursor-pointer rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground",
					cancelButton:
						"ml-auto h-6 shrink-0 cursor-pointer rounded-md bg-muted px-2.5 text-xs font-medium text-muted-foreground",
					success:
						"bg-surface-success border-stroke-success text-success [&_[data-icon]>svg]:text-icon-success [&_[data-title]]:text-success [&_[data-description]]:text-success/90",
					error:
						"bg-surface-critical border-stroke-critical text-critical [&_[data-icon]>svg]:text-icon-critical [&_[data-title]]:text-critical [&_[data-description]]:text-critical/90",
					warning:
						"bg-surface-warning border-stroke-warning text-warning [&_[data-icon]>svg]:text-icon-warning [&_[data-title]]:text-warning [&_[data-description]]:text-warning/90",
					info: "bg-surface-info border-stroke-info text-info [&_[data-icon]>svg]:text-icon-info [&_[data-title]]:text-info [&_[data-description]]:text-info/90",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
