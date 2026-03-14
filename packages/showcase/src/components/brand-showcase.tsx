import { LayersIcon, PaletteIcon, SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	SectionHeader,
	SectionHeaderEyebrow,
	SectionHeaderTitle,
	SectionHeaderSubtitle,
	CallToAction,
	CallToActionHeadline,
	CallToActionBody,
	CallToActionActions,
	FeatureCard,
	FeatureCardIcon,
	FeatureCardTitle,
	FeatureCardDescription,
} from "@/components/ui-brand";
import { ShowcaseSection } from "./showcase-section";

const intensities = ["subtle", "standard", "bold"] as const;

export function BrandShowcase() {
	return (
		<ShowcaseSection
			title="Brand"
			description="Brand & emphasis variants plus composable marketing components with 3 intensity levels."
		>
			<VStack gap={8}>
				{/* Button & Badge brand/emphasis variants */}
				<VStack gap={2}>
					<Typography variant="heading-200">
						Button &amp; Badge Variants
					</Typography>
					<HStack gap={3} wrap align="center">
						<Button variant="brand">Brand</Button>
						<Button variant="emphasis">Emphasis</Button>
						<Badge variant="brand">Brand</Badge>
						<Badge variant="emphasis">Emphasis</Badge>
					</HStack>
				</VStack>

				{/* SectionHeader */}
				<VStack gap={2}>
					<Typography variant="heading-200">Section Header</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<SectionHeader
								key={intensity}
								intensity={intensity}
								align="start"
							>
								<SectionHeaderEyebrow>
									{intensity}
								</SectionHeaderEyebrow>
								<SectionHeaderTitle>
									Build something great
								</SectionHeaderTitle>
								<SectionHeaderSubtitle>
									Composable components that adapt to your brand
									automatically through design tokens.
								</SectionHeaderSubtitle>
							</SectionHeader>
						))}
					</VStack>
				</VStack>

				{/* CallToAction */}
				<VStack gap={2}>
					<Typography variant="heading-200">Call to Action</Typography>
					<VStack gap={4}>
						{intensities.map((intensity) => (
							<CallToAction
								key={intensity}
								intensity={intensity}
								align="start"
							>
								<CallToActionHeadline>
									Ready to get started? ({intensity})
								</CallToActionHeadline>
								<CallToActionBody>
									Ship faster with token-driven components that
									transform when you switch presets.
								</CallToActionBody>
								<CallToActionActions>
									<Button
										variant={
											intensity === "bold"
												? "secondary"
												: "brand"
										}
									>
										Get Started
									</Button>
									<Button
										variant={
											intensity === "bold"
												? "ghost"
												: "outline"
										}
										className={
											intensity === "bold"
												? "text-inverse hover:bg-white/15"
												: undefined
										}
									>
										Learn More
									</Button>
								</CallToActionActions>
							</CallToAction>
						))}
					</VStack>
				</VStack>

				{/* FeatureCard */}
				<VStack gap={2}>
					<Typography variant="heading-200">Feature Cards</Typography>
					{intensities.map((intensity) => (
						<div
							key={intensity}
							className="grid grid-cols-3 gap-4"
						>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<PaletteIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>
									Token-Driven ({intensity})
								</FeatureCardTitle>
								<FeatureCardDescription>
									All colors, fonts, and spacing are pulled from
									design tokens so everything stays in sync.
								</FeatureCardDescription>
							</FeatureCard>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<LayersIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>
									Composable
								</FeatureCardTitle>
								<FeatureCardDescription>
									Mix and match sub-components to build exactly
									the layout you need.
								</FeatureCardDescription>
							</FeatureCard>
							<FeatureCard intensity={intensity}>
								<FeatureCardIcon>
									<SparklesIcon />
								</FeatureCardIcon>
								<FeatureCardTitle>
									Preset-Ready
								</FeatureCardTitle>
								<FeatureCardDescription>
									Switch presets and watch every brand component
									transform automatically.
								</FeatureCardDescription>
							</FeatureCard>
						</div>
					))}
				</VStack>
			</VStack>
		</ShowcaseSection>
	);
}
