import React from "react";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	CTABanner,
	CTABannerActions,
	CTABannerContent,
	CTABannerEyebrow,
	CTABannerHeadline,
	CTABannerSubtitle,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

export function CTABannerShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">CTA Banner</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<CTABanner key={intensity} intensity={intensity} align="left">
						<CTABannerContent>
							<CTABannerEyebrow>{intensity}</CTABannerEyebrow>
							<CTABannerHeadline>Ready to ship your product?</CTABannerHeadline>
							<CTABannerSubtitle>
								Join thousands of teams building with Composables today. No
								credit card required.
							</CTABannerSubtitle>
						</CTABannerContent>
						<CTABannerActions>
							<Button
								variant={intensity === "bold" ? "secondary" : "brand"}
								className={
									intensity === "bold"
										? "bg-inverse text-inverse-foreground hover:bg-inverse/90"
										: undefined
								}
							>
								Get started free
							</Button>
							<Button
								variant={intensity === "bold" ? "ghost" : "outline"}
								className={
									intensity === "bold"
										? "text-inverse hover:bg-white/15"
										: undefined
								}
							>
								Talk to sales
							</Button>
						</CTABannerActions>
					</CTABanner>
				))}
				<VStack gap={1}>
					<Typography variant="caption-100">center align</Typography>
					<CTABanner intensity="bold" align="center">
						<CTABannerContent>
							<CTABannerEyebrow>centered</CTABannerEyebrow>
							<CTABannerHeadline>Start building today</CTABannerHeadline>
							<CTABannerSubtitle>
								Everything you need to ship great products.
							</CTABannerSubtitle>
						</CTABannerContent>
						<CTABannerActions>
							<Button
								variant="secondary"
								className="bg-inverse text-inverse-foreground hover:bg-inverse/90"
							>
								Get started free
							</Button>
						</CTABannerActions>
					</CTABanner>
				</VStack>
			</VStack>
		</VStack>
	);
}
