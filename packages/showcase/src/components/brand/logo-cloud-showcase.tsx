import React from "react";
import { VStack } from "@/components/ui/stack";
import { Typography } from "@/components/ui/typography";
import {
	LogoCloud,
	LogoCloudLabel,
	LogoItem,
} from "@/components/ui-brand";

const intensities = ["subtle", "standard", "bold"] as const;
const logos = ["Acme Corp", "GlobalTech", "NovaSoft", "QuantumAI", "DataFlow", "CloudBase"];

export function LogoCloudShowcase() {
	return (
		<VStack gap={2}>
			<Typography variant="heading-200">Logo Cloud</Typography>
			<VStack gap={6}>
				<LogoCloudLabel>Trusted by teams at leading companies</LogoCloudLabel>
				{intensities.map((intensity) => (
					<VStack key={intensity} gap={1}>
						<Typography variant="caption-100">{intensity}</Typography>
						<LogoCloud layout="row" intensity={intensity}>
							{logos.map((name) => (
								<LogoItem key={name} intensity={intensity}>
									<div className="font-brand font-bold text-sm text-muted-foreground px-4 py-2 rounded-md border border-border">
										{name}
									</div>
								</LogoItem>
							))}
						</LogoCloud>
					</VStack>
				))}
				<VStack gap={1}>
					<Typography variant="caption-100">grid layout</Typography>
					<LogoCloud layout="grid" intensity="standard">
						{logos.map((name) => (
							<LogoItem key={name} intensity="standard">
								<div className="font-brand font-bold text-sm text-muted-foreground px-4 py-2 rounded-md border border-border text-center">
									{name}
								</div>
							</LogoItem>
						))}
					</LogoCloud>
				</VStack>
			</VStack>
		</VStack>
	);
}
