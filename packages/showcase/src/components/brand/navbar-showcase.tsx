import React from "react";
import { SparklesIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	Navbar,
	NavbarActions,
	NavbarBrand,
	NavbarHamburger,
	NavbarInner,
	NavbarLink,
	NavbarLinks,
	NavbarMobileDrawer,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

function NavbarShowcaseItem({
	intensity,
}: { intensity: "subtle" | "standard" | "bold" }) {
	const [open, setOpen] = React.useState(false);
	return (
		<div className="rounded-xl overflow-hidden border border-border">
			<Navbar sticky={false} intensity={intensity}>
				<NavbarInner>
					<NavbarBrand>
						<SparklesIcon className="size-4" />
						Composables
					</NavbarBrand>
					<NavbarLinks>
						<NavbarLink href="#">Product</NavbarLink>
						<NavbarLink href="#">Pricing</NavbarLink>
						<NavbarLink href="#">Docs</NavbarLink>
					</NavbarLinks>
					<NavbarActions>
						<Button
							variant={intensity === "bold" ? "secondary" : "outline"}
							size="sm"
							className={
								intensity === "bold"
									? "bg-white/15 text-inverse border-transparent hover:bg-white/25"
									: undefined
							}
						>
							Sign in
						</Button>
						<Button
							variant={intensity === "bold" ? "secondary" : "brand"}
							size="sm"
							className={
								intensity === "bold"
									? "bg-inverse text-inverse-foreground hover:bg-inverse/90"
									: undefined
							}
						>
							Get started
						</Button>
						<NavbarHamburger
							open={open}
							onClick={() => setOpen(true)}
						/>
					</NavbarActions>
				</NavbarInner>
			</Navbar>
			<NavbarMobileDrawer
				open={open}
				onClose={() => setOpen(false)}
				aria-label="Site navigation"
			>
				<nav className="flex flex-col gap-2">
					<NavbarLink href="#">Product</NavbarLink>
					<NavbarLink href="#">Pricing</NavbarLink>
					<NavbarLink href="#">Docs</NavbarLink>
				</nav>
			</NavbarMobileDrawer>
		</div>
	);
}

export function NavbarShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Navbar</Typography>
			<Typography variant="caption-100" className="text-muted-foreground">
				Includes NavbarHamburger (aria-expanded) and NavbarMobileDrawer
				(role=dialog). Click the hamburger icon to see the drawer.
			</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<NavbarShowcaseItem key={intensity} intensity={intensity} />
				))}
			</VStack>
		</VStack>
	);
}
