import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import pc from "picocolors";
import { type ComponentEntry, registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, "..", "..", "templates");

/** Recursively collect all internal deps for a set of components */
function collectDeps(
	names: string[],
	visited = new Set<string>(),
): string[] {
	const result: string[] = [];
	for (const name of names) {
		if (visited.has(name)) continue;
		visited.add(name);
		const entry = registry[name];
		if (!entry) continue;
		// Resolve internal deps first (depth-first)
		if (entry.internalDeps.length > 0) {
			result.push(...collectDeps(entry.internalDeps, visited));
		}
		result.push(name);
	}
	return result;
}

export const addCommand = new Command("add")
	.description("Add component(s) to your project")
	.argument("<components...>", 'component names to install, or "all"')
	.option("-d, --dest <path>", "destination directory", ".")
	.option("-y, --yes", "overwrite existing files without prompting")
	.option("--alias <prefix>", "rewrite @/ imports to a custom alias", "@/")
	.action((components: string[], opts) => {
		const dest = opts.dest as string;
		const overwrite = opts.yes as boolean;
		const alias = opts.alias as string;

		// Resolve "all"
		const requested =
			components.length === 1 && components[0] === "all"
				? Object.keys(registry)
				: components;

		// Validate
		for (const name of requested) {
			if (!registry[name]) {
				console.error(pc.red(`Unknown component: ${name}`));
				console.log(pc.dim('Run "smores list" to see available components.'));
				process.exit(1);
			}
		}

		// Resolve full dependency tree
		const resolved = collectDeps(requested);
		const unique = [...new Set(resolved)];

		// Collect all files and npm deps
		const filesToCopy: { src: string; destPath: string; component: string }[] = [];
		const npmDeps = new Set<string>();

		for (const name of unique) {
			const entry = registry[name];
			for (const file of entry.files) {
				filesToCopy.push({
					src: join(templatesDir, file.src.replace("templates/", "")),
					destPath: join(dest, file.dest),
					component: name,
				});
			}
			for (const dep of entry.deps) {
				npmDeps.add(dep);
			}
		}

		// Print summary
		console.log(pc.bold("\nComponents to install:"));
		for (const name of unique) {
			const entry = registry[name];
			const tag = entry.tags[0];
			console.log(`  ${pc.dim(tag)} ${pc.cyan(name)}`);
		}

		console.log(pc.bold("\nFiles to write:"));
		let skipped = 0;
		let written = 0;

		for (const file of filesToCopy) {
			const fullDest = join(process.cwd(), file.destPath);
			const exists = existsSync(fullDest);

			if (exists && !overwrite) {
				console.log(`  ${file.destPath} ${pc.yellow("(exists, skipping)")}`);
				skipped++;
				continue;
			}

			// Read, rewrite alias, write
			let content = readFileSync(file.src, "utf-8");
			if (alias !== "@/") {
				content = content.replace(/(from\s+['"])@\//g, `$1${alias}`);
			}

			mkdirSync(dirname(fullDest), { recursive: true });
			writeFileSync(fullDest, content, "utf-8");
			console.log(`  ${file.destPath} ${exists ? pc.yellow("(overwritten)") : ""}`);
			written++;
		}

		console.log(pc.green(`\nDone! ${written} file(s) written.`));
		if (skipped > 0) {
			console.log(pc.yellow(`${skipped} file(s) skipped (already exist). Use --yes to overwrite.`));
		}

		if (npmDeps.size > 0) {
			console.log(pc.bold("\nInstall required dependencies:"));
			console.log(`  bun add ${[...npmDeps].join(" ")}`);
		}
		console.log();
	});
