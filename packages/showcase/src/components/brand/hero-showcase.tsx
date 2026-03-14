import React from "react";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	HeroActions,
	HeroContent,
	HeroEyebrow,
	HeroHeadline,
	HeroMedia,
	HeroSection,
	HeroSubheadline,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

export function HeroShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Hero Section</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<div
						key={intensity}
						className="rounded-xl border border-border overflow-hidden"
					>
						<HeroSection variant="centered" intensity={intensity}>
							<HeroContent>
								<HeroEyebrow>
									{intensity} — Token-driven marketing
								</HeroEyebrow>
								<HeroHeadline>
									Build pages that feel like your brand
								</HeroHeadline>
								<HeroSubheadline>
									Composable marketing sections powered by design
									tokens. Switch presets and every component
									transforms.
								</HeroSubheadline>
								<HeroActions>
									<Button variant="brand" size="lg">
										Get started free
									</Button>
									<Button variant="outline" size="lg">
										View docs
									</Button>
								</HeroActions>
							</HeroContent>
						</HeroSection>
					</div>
				))}
				<div className="rounded-xl border border-border overflow-hidden">
					<HeroSection variant="split" intensity="standard">
						<HeroContent>
							<HeroEyebrow>Split layout</HeroEyebrow>
							<HeroHeadline>Two columns, one message</HeroHeadline>
							<HeroSubheadline>
								Pair your headline with an image or visual for
								maximum impact.
							</HeroSubheadline>
							<HeroActions>
								<Button variant="brand">Get started</Button>
							</HeroActions>
						</HeroContent>
						<HeroMedia className="min-h-48 bg-gradient-to-br from-surface-brand to-surface-emphasis" />
					</HeroSection>
				</div>
				<div className="rounded-xl overflow-hidden">
					<HeroSection variant="with-background" intensity="bold">
						<HeroContent>
							<HeroEyebrow>Brand background</HeroEyebrow>
							<HeroHeadline>Full-bleed brand hero</HeroHeadline>
							<HeroSubheadline>
								Maximum brand impact with the brand fill token.
							</HeroSubheadline>
							<HeroActions>
								<Button
									variant="secondary"
									className="bg-inverse text-inverse-foreground hover:bg-inverse/90"
								>
									Get started
								</Button>
								<Button
									variant="ghost"
									className="text-inverse hover:bg-white/15"
								>
									Learn more
								</Button>
							</HeroActions>
						</HeroContent>
					</HeroSection>
				</div>
			</VStack>
		</VStack>
	);
}
