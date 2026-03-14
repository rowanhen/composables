import React from "react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	Footer,
	FooterBottom,
	FooterBrand,
	FooterBrandName,
	FooterBrandTagline,
	FooterColumn,
	FooterColumnTitle,
	FooterCopyright,
	FooterGrid,
	FooterInner,
	FooterLink,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

function FooterShowcaseItem({
	intensity,
}: { intensity: "subtle" | "standard" | "bold" }) {
	return (
		<VStack gap={1}>
			<Typography variant="caption-100">{intensity}</Typography>
			<div className="rounded-xl overflow-hidden border border-border">
				<Footer variant="multicolumn" intensity={intensity}>
					<FooterInner>
						<FooterGrid>
							<FooterBrand>
								<FooterBrandName>Composables</FooterBrandName>
								<FooterBrandTagline>
									Design system components that adapt to your brand
									through design tokens.
								</FooterBrandTagline>
							</FooterBrand>
							<FooterColumn>
								<FooterColumnTitle>Product</FooterColumnTitle>
								<FooterLink href="#">Features</FooterLink>
								<FooterLink href="#">Pricing</FooterLink>
								<FooterLink href="#">Changelog</FooterLink>
							</FooterColumn>
							<FooterColumn>
								<FooterColumnTitle>Developers</FooterColumnTitle>
								<FooterLink href="#">Documentation</FooterLink>
								<FooterLink href="#">API Reference</FooterLink>
								<FooterLink href="#">GitHub</FooterLink>
							</FooterColumn>
							<FooterColumn>
								<FooterColumnTitle>Company</FooterColumnTitle>
								<FooterLink href="#">About</FooterLink>
								<FooterLink href="#">Blog</FooterLink>
								<FooterLink href="#">Contact</FooterLink>
							</FooterColumn>
						</FooterGrid>
						<FooterBottom>
							<FooterCopyright>
								© 2024 Composables. All rights reserved.
							</FooterCopyright>
						</FooterBottom>
					</FooterInner>
				</Footer>
			</div>
		</VStack>
	);
}

export function FooterShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Footer</Typography>
			<VStack gap={6}>
				{intensities.map((intensity) => (
					<FooterShowcaseItem key={intensity} intensity={intensity} />
				))}
			</VStack>
		</VStack>
	);
}
