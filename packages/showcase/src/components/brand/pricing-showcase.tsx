import React from "react";
import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	PricingAmount,
	PricingCard,
	PricingDescription,
	PricingFeature,
	PricingFeatureList,
	PricingPeriod,
	PricingPopularBadge,
	PricingPrice,
	PricingTable,
	PricingTier,
	PricingTierName,
	PricingToggle,
} from "@/components/ui-brand";

function PricingDemo() {
	const [billing, setBilling] = React.useState<"monthly" | "annual">("monthly");
	const monthly = { starter: "$9", pro: "$29", enterprise: "$99" };
	const annual = { starter: "$7", pro: "$23", enterprise: "$79" };
	const prices = billing === "monthly" ? monthly : annual;

	return (
		<VStack gap={4}>
			<HStack justify="center">
				<PricingToggle value={billing} onChange={setBilling} />
			</HStack>
			<PricingTable>
				<PricingCard intensity="subtle">
					<PricingTier>
						<PricingTierName>Starter</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.starter}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							Perfect for indie hackers and side projects.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Up to 3 projects</PricingFeature>
						<PricingFeature>5GB storage</PricingFeature>
						<PricingFeature>Community support</PricingFeature>
						<PricingFeature included={false}>Custom domain</PricingFeature>
						<PricingFeature included={false}>Analytics</PricingFeature>
					</PricingFeatureList>
					<Button variant="outline" className="w-full mt-auto">
						Get started
					</Button>
				</PricingCard>

				<PricingCard highlighted intensity="standard">
					<PricingPopularBadge />
					<PricingTier>
						<PricingTierName>Pro</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.pro}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							For growing teams shipping fast.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Unlimited projects</PricingFeature>
						<PricingFeature>50GB storage</PricingFeature>
						<PricingFeature>Priority support</PricingFeature>
						<PricingFeature>Custom domain</PricingFeature>
						<PricingFeature>Analytics dashboard</PricingFeature>
					</PricingFeatureList>
					<Button
						variant="secondary"
						className="w-full mt-auto bg-inverse text-inverse-foreground hover:bg-inverse/90"
					>
						Get started
					</Button>
				</PricingCard>

				<PricingCard intensity="bold">
					<PricingTier>
						<PricingTierName>Enterprise</PricingTierName>
						<PricingPrice>
							<PricingAmount>{prices.enterprise}</PricingAmount>
							<PricingPeriod>/mo</PricingPeriod>
						</PricingPrice>
						<PricingDescription>
							For large teams that need control and scale.
						</PricingDescription>
					</PricingTier>
					<PricingFeatureList>
						<PricingFeature>Unlimited everything</PricingFeature>
						<PricingFeature>500GB storage</PricingFeature>
						<PricingFeature>Dedicated support</PricingFeature>
						<PricingFeature>Custom domain</PricingFeature>
						<PricingFeature>Advanced analytics</PricingFeature>
					</PricingFeatureList>
					<Button variant="outline" className="w-full mt-auto">
						Contact sales
					</Button>
				</PricingCard>
			</PricingTable>

			<VStack gap={1}>
				<Typography variant="caption-100">
					Custom annual discount label
				</Typography>
				<HStack justify="center">
					<PricingToggle
						value={billing}
						onChange={setBilling}
						annualDiscount="-25%"
					/>
				</HStack>
			</VStack>
		</VStack>
	);
}

export function PricingShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Pricing Table</Typography>
			<PricingDemo />
		</VStack>
	);
}
