import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import { ShowcaseSection } from "./showcase-section";
import { HeroShowcase } from "./brand/hero-showcase";
import { NavbarShowcase } from "./brand/navbar-showcase";
import { FooterShowcase } from "./brand/footer-showcase";
import { LogoCloudShowcase } from "./brand/logo-cloud-showcase";
import { StatsBarShowcase } from "./brand/stats-bar-showcase";
import { PricingShowcase } from "./brand/pricing-showcase";
import { FAQShowcase } from "./brand/faq-showcase";
import { FeatureGridShowcase } from "./brand/feature-grid-showcase";
import { CTABannerShowcase } from "./brand/cta-banner-showcase";
import { TeamShowcase } from "./brand/team-showcase";
import { BlogShowcase } from "./brand/blog-showcase";
import {
	SectionHeaderShowcase,
	CallToActionShowcase,
	FeatureCardShowcase,
} from "./brand/section-cta-feature-showcase";
import { TestimonialShowcase } from "./brand/testimonial-showcase";

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

				<Separator />
				<SectionHeaderShowcase />

				<Separator />
				<CallToActionShowcase />

				<Separator />
				<FeatureCardShowcase />

				<Separator />
				<HeroShowcase />

				<Separator />
				<NavbarShowcase />

				<Separator />
				<FooterShowcase />

				<Separator />
				<TestimonialShowcase />

				<Separator />
				<LogoCloudShowcase />

				<Separator />
				<StatsBarShowcase />

				<Separator />
				<PricingShowcase />

				<Separator />
				<FAQShowcase />

				<Separator />
				<FeatureGridShowcase />

				<Separator />
				<CTABannerShowcase />

				<Separator />
				<TeamShowcase />

				<Separator />
				<BlogShowcase />
			</VStack>
		</ShowcaseSection>
	);
}
