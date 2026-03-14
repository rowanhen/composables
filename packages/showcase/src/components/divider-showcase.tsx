import { Divider } from "@/components/ui/divider";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { ShowcaseSection } from "./showcase-section";

const HORIZONTAL_VARIANTS = [
	{ variant: "solid", label: "Solid" },
	{ variant: "dots", label: "Dots" },
	{ variant: "pills", label: "Pills" },
] as const;

export function DividerShowcase() {
	return (
		<ShowcaseSection
			title="Divider"
			description="Semantic divider with 3 token-reactive variants. All variants respond to --radius: at zero radius you get sharp lines, squares, and rectangular dashes; at max radius the solid line becomes a long pill shape, dots become circles, and pills become capsules. The dots and pills variants also respond to --spacing for gap and sizing."
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
						{(["solid", "dots", "pills"] as const).map((variant) => (
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
						💡 Switch presets using the token panel — all variants morph with the tokens.{" "}
						<strong>Solid</strong> gains border-radius (becoming a long pill at max),{" "}
						<strong>dots</strong> shift from squares to circles, and <strong>pills</strong> go from
						rectangular dashes to capsules. All driven by{" "}
						<code className="font-mono text-xs">--radius</code>,{" "}
						<code className="font-mono text-xs">--border-width-base</code>, and{" "}
						<code className="font-mono text-xs">--spacing</code>.
					</Typography>
				</div>
			</VStack>
		</ShowcaseSection>
	);
}
