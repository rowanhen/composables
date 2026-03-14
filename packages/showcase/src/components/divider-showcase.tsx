import { Divider } from "@/components/ui/divider";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { ShowcaseSection } from "./showcase-section";

const HORIZONTAL_VARIANTS = [
	{ variant: "solid", label: "Solid" },
	{ variant: "dashed", label: "Dashed" },
	{ variant: "dotted", label: "Dotted" },
	{ variant: "dots", label: "Dots (·····)" },
	{ variant: "equals", label: "Equals (═════)" },
	{ variant: "pills", label: "Pills (token-reactive)" },
] as const;

export function DividerShowcase() {
	return (
		<ShowcaseSection
			title="Divider"
			description="Semantic divider that responds to design tokens. The pills variant is especially expressive — it renders as square dashes on zero-radius presets (Brutalist, Dockets) and as capsule pills on high-radius presets (Soft)."
		>
			<VStack gap={8}>
				{/* Horizontal variants */}
				<VStack gap={6}>
					<Typography variant="heading-200">Horizontal</Typography>
					{HORIZONTAL_VARIANTS.map(({ variant, label }) => (
						<VStack key={variant} gap={2}>
							<Typography variant="caption-100" className="text-muted-foreground">
								{label}
							</Typography>
							<Divider variant={variant} orientation="horizontal" />
						</VStack>
					))}
				</VStack>

				{/* Vertical variants */}
				<VStack gap={4}>
					<Typography variant="heading-200">Vertical</Typography>
					<HStack gap={6} align="center" className="h-16">
						{(["solid", "dashed", "dotted", "dots", "equals", "pills"] as const).map((variant) => (
							<HStack key={variant} gap={4} align="center" className="h-full">
								<Typography variant="caption-100" className="text-muted-foreground w-12">
									{variant}
								</Typography>
								<Divider variant={variant} orientation="vertical" />
							</HStack>
						))}
					</HStack>
				</VStack>

				{/* Token reactivity callout */}
				<div className="rounded-[var(--radius)] border border-border bg-muted/40 p-4">
					<Typography variant="caption-100" className="text-muted-foreground">
						💡 Switch presets using the token panel — the <strong>pills</strong> variant will morph
						from square dashes (Brutalist/Dockets, radius: 0) to soft capsules (Soft preset, high
						radius). Same component, different personality via{" "}
						<code className="font-mono text-xs">--radius</code>.
					</Typography>
				</div>
			</VStack>
		</ShowcaseSection>
	);
}
