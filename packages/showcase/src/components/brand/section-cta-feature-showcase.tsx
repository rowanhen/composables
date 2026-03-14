import React from "react";
import {
	LayersIcon,
	PaletteIcon,
	SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	CallToAction,
	CallToActionActions,
	CallToActionBody,
	CallToActionHeadline,
	FeatureCard,
	FeatureCardDescription,
	FeatureCardIcon,
	FeatureCardTitle,
	SectionHeader,
	SectionHeaderEyebrow,
	SectionHeaderSubtitle,
	SectionHeaderTitle,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

export function SectionHeaderShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Section Header</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<SectionHeader key={intensity} intensity={intensity} align="start">
						<SectionHeaderEyebrow>{intensity}</SectionHeaderEyebrow>
						<SectionHeaderTitle>Build something great</SectionHeaderTitle>
						<SectionHeaderSubtitle>
							Composable components that adapt to your brand automatically
							through design tokens.
						</SectionHeaderSubtitle>
					</SectionHeader>
				))}
			</VStack>
		</VStack>
	);
}

export function CallToActionShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Call to Action</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<CallToAction key={intensity} intensity={intensity} align="start">
						<CallToActionHeadline>
							Ready to get started? ({intensity})
						</CallToActionHeadline>
						<CallToActionBody>
							Ship faster with token-driven components that transform when
							you switch presets.
						</CallToActionBody>
						<CallToActionActions>
							<Button
								variant={intensity === "bold" ? "secondary" : "brand"}
							>
								Get Started
							</Button>
							<Button
								variant={intensity === "bold" ? "ghost" : "outline"}
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
	);
}

export function FeatureCardShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Feature Cards</Typography>
			{intensities.map((intensity) => (
				<div key={intensity} className="grid grid-cols-3 gap-4">
					<FeatureCard intensity={intensity}>
						<FeatureCardIcon>
							<PaletteIcon />
						</FeatureCardIcon>
						<FeatureCardTitle>Token-Driven ({intensity})</FeatureCardTitle>
						<FeatureCardDescription>
							All colors, fonts, and spacing are pulled from design tokens
							so everything stays in sync.
						</FeatureCardDescription>
					</FeatureCard>
					<FeatureCard intensity={intensity}>
						<FeatureCardIcon>
							<LayersIcon />
						</FeatureCardIcon>
						<FeatureCardTitle>Composable</FeatureCardTitle>
						<FeatureCardDescription>
							Mix and match sub-components to build exactly the layout you
							need.
						</FeatureCardDescription>
					</FeatureCard>
					<FeatureCard intensity={intensity}>
						<FeatureCardIcon>
							<SparklesIcon />
						</FeatureCardIcon>
						<FeatureCardTitle>Preset-Ready</FeatureCardTitle>
						<FeatureCardDescription>
							Switch presets and watch every brand component transform
							automatically.
						</FeatureCardDescription>
					</FeatureCard>
				</div>
			))}
		</VStack>
	);
}
