import { cva, type VariantProps } from "class-variance-authority";
import { MenuIcon, XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

// ─── Navbar ──────────────────────────────────────────────────────────────────

const navbarVariants = cva(
	"group/navbar w-full border-b border-border bg-background/95 backdrop-blur-sm transition-[box-shadow] duration-200",
	{
		variants: {
			sticky: {
				true: "sticky top-0 z-50",
				false: "relative",
			},
			intensity: {
				subtle: "bg-transparent border-transparent",
				standard: "bg-background/95 border-border",
				bold: "bg-[var(--bg-fill-brand)] border-transparent",
			},
		},
		defaultVariants: {
			sticky: true,
			intensity: "standard",
		},
	},
);

type NavbarProps = React.ComponentProps<"header"> & VariantProps<typeof navbarVariants>;

function Navbar({ className, sticky = true, intensity = "standard", ...props }: NavbarProps) {
	return (
		<header
			data-intensity={intensity}
			className={cn(navbarVariants({ sticky, intensity }), className)}
			{...props}
		/>
	);
}

function NavbarInner({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-[var(--container-2xl,1400px)] px-4 sm:px-6 lg:px-8",
				"flex items-center justify-between h-[var(--nav-height,4rem)]",
				className,
			)}
			{...props}
		/>
	);
}

function NavbarBrand({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex items-center gap-2 shrink-0 font-brand font-bold text-sm text-foreground group-data-[intensity=bold]/navbar:text-inverse",
				className,
			)}
			{...props}
		/>
	);
}

function NavbarLinks({ className, ...props }: React.ComponentProps<"nav">) {
	return <nav className={cn("hidden md:flex items-center gap-1", className)} {...props} />;
}

function NavbarLink({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			className={cn(
				"text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted [transition:color_var(--transition-default,200ms_ease),background-color_var(--transition-default,200ms_ease)] group-data-[intensity=bold]/navbar:text-inverse/70 group-data-[intensity=bold]/navbar:hover:text-inverse group-data-[intensity=bold]/navbar:hover:bg-white/10",
				className,
			)}
			{...props}
		/>
	);
}

function NavbarActions({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("flex items-center gap-2", className)} {...props} />;
}

// Mobile drawer state managed externally via open prop
type NavbarMobileProps = Omit<React.ComponentProps<"div">, "role"> & {
	open: boolean;
	onClose: () => void;
};

function NavbarMobileDrawer({ className, open, onClose, children, ...props }: NavbarMobileProps) {
	return (
		<>
			{open && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/40 md:hidden"
					onClick={onClose}
					tabIndex={-1}
					aria-label="Close navigation"
				/>
			)}
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Navigation"
				className={cn(
					"fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border flex flex-col p-6 gap-4 md:hidden transition-transform duration-200",
					open ? "translate-x-0" : "-translate-x-full",
					className,
				)}
				{...props}
			>
				<button
					type="button"
					onClick={onClose}
					className="self-end text-muted-foreground hover:text-foreground"
					aria-label="Close navigation"
				>
					<XIcon className="size-4" />
				</button>
				{children}
			</div>
		</>
	);
}

type NavbarHamburgerProps = React.ComponentProps<"button"> & {
	open?: boolean;
};

function NavbarHamburger({ className, open = false, ...props }: NavbarHamburgerProps) {
	return (
		<button
			type="button"
			className={cn(
				"md:hidden flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group-data-[intensity=bold]/navbar:text-inverse/70 group-data-[intensity=bold]/navbar:hover:text-inverse group-data-[intensity=bold]/navbar:hover:bg-white/10",
				className,
			)}
			aria-label="Open navigation"
			aria-expanded={open}
			{...props}
		>
			<MenuIcon className="size-4" />
		</button>
	);
}

export {
	Navbar,
	NavbarActions,
	NavbarBrand,
	NavbarHamburger,
	NavbarInner,
	NavbarLink,
	NavbarLinks,
	NavbarMobileDrawer,
	navbarVariants,
};
