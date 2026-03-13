import { Command } from "commander";
import pc from "picocolors";
import { registry } from "../registry.js";

export const listCommand = new Command("list")
	.description("List all available components")
	.option("-t, --tag <tag>", "filter by tag")
	.action((opts) => {
		const tag = opts.tag as string | undefined;

		const entries = Object.entries(registry);
		const filtered = tag
			? entries.filter(([, entry]) => entry.tags.includes(tag))
			: entries;

		if (filtered.length === 0) {
			console.log(pc.yellow(tag ? `No components with tag "${tag}".` : "No components found."));
			return;
		}

		// Group by primary tag
		const grouped = new Map<string, [string, (typeof registry)[string]][]>();
		for (const entry of filtered) {
			const primaryTag = entry[1].tags[0];
			const group = grouped.get(primaryTag) ?? [];
			group.push(entry);
			grouped.set(primaryTag, group);
		}

		for (const [groupTag, items] of grouped) {
			console.log(`\n${pc.bold(groupTag)} (${items.length})`);
			for (const [name, entry] of items) {
				console.log(`  ${pc.cyan(name)} ${pc.dim(`— ${entry.description}`)}`);
			}
		}

		console.log(`\n${pc.dim(`${filtered.length} components available`)}`);
		console.log(pc.dim('Usage: smores add <component>'));
	});
