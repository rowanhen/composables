import React from "react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	StatDescription,
	StatItem,
	StatLabel,
	StatValue,
	StatsBar,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;

export function StatsBarShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Stats Bar</Typography>
			<VStack gap={4}>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={1}>
						<Typography variant="caption-100">{intensity}</Typography>
						<StatsBar intensity={intensity} layout="row">
							<StatItem>
								<StatValue>10k+</StatValue>
								<StatLabel>Active users</StatLabel>
								<StatDescription>Across 40+ countries</StatDescription>
							</StatItem>
							<StatItem>
								<StatValue>99.9%</StatValue>
								<StatLabel>Uptime SLA</StatLabel>
								<StatDescription>Last 12 months</StatDescription>
							</StatItem>
							<StatItem>
								<StatValue>4.9★</StatValue>
								<StatLabel>Avg. rating</StatLabel>
								<StatDescription>1,200+ reviews</StatDescription>
							</StatItem>
							<StatItem>
								<StatValue>3min</StatValue>
								<StatLabel>Median setup</StatLabel>
								<StatDescription>Start to first deploy</StatDescription>
							</StatItem>
						</StatsBar>
					</VStack>
				))}
				<VStack gap={1}>
					<Typography variant="caption-100">compact layout</Typography>
					<StatsBar intensity="standard" layout="compact">
						<StatItem>
							<StatValue>10k+</StatValue>
							<StatLabel>Active users</StatLabel>
						</StatItem>
						<StatItem>
							<StatValue>99.9%</StatValue>
							<StatLabel>Uptime SLA</StatLabel>
						</StatItem>
						<StatItem>
							<StatValue>4.9★</StatValue>
							<StatLabel>Avg. rating</StatLabel>
						</StatItem>
					</StatsBar>
				</VStack>
			</VStack>
		</VStack>
	);
}
