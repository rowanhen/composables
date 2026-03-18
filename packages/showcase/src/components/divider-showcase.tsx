// Showcase imports from _internal/ to demonstrate primitive components.
// In your app, always import from @/components/ui-opinionated/ instead.
import { Divider } from "@/components/_internal/divider";
import { HStack, VStack } from "@/components/_internal/stack";
import { Typography } from "@/components/_internal/typography";
import { ShowcaseGroup, ShowcaseSection } from "./showcase-section";

export function DividerShowcase() {
	return (
		<ShowcaseSection
			title="Divider"
			description="Simple solid divider line. Uses border tokens for color (bg-stroke) and width (--border-width-base). Responds to token changes from the config panel."
		>
			<VStack gap={8}>
				<ShowcaseGroup label="Horizontal">
					<VStack gap={4}>
						<Typography variant="caption-100" className="text-muted-foreground">
							Default horizontal divider
						</Typography>
						<Divider />
					</VStack>
				</ShowcaseGroup>

				<ShowcaseGroup label="Vertical">
					<HStack gap={6} align="center" className="h-16">
						<Typography variant="caption-100" className="text-muted-foreground">
							Vertical
						</Typography>
						<Divider orientation="vertical" />
					</HStack>
				</ShowcaseGroup>

				<div className="rounded-[var(--radius)] border border-stroke bg-muted/40 p-4">
					<Typography variant="caption-100" className="text-muted-foreground">
						Color comes from <code className="font-mono text-xs">--border-default</code> via{" "}
						<code className="font-mono text-xs">bg-stroke</code>. Thickness from{" "}
						<code className="font-mono text-xs">--border-width-base</code>. Both respond to the
						token config panel.
					</Typography>
				</div>
			</VStack>
		</ShowcaseSection>
	);
}
