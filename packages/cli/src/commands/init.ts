import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import pc from "picocolors";
import { registry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, "..", "..", "templates");

const DIRECTORIES = [
	"components/ui-opinionated",
	"components/_internal",
	"styles",
	"lib",
	"hooks",
	"rules",
	"scripts",
	"tailwind",
];

/** Foundation entries to install */
const FOUNDATION_ENTRIES = ["utils", "styles"];

/** Tooling entries to install */
const TOOLING_ENTRIES = [
	"biome-ui-restricted",
	"biome-no-direct-icons",
	"lint-no-arbitrary",
	"tailwind-preset",
];

function copyRegistryEntry(name: string, dest: string, overwrite: boolean, alias: string): number {
	const entry = registry[name];
	if (!entry) {
		console.log(pc.yellow(`  ⚠ Skipping ${name} — not found in registry`));
		return 0;
	}

	let written = 0;
	for (const file of entry.files) {
		const src = join(templatesDir, file.src.replace("templates/", ""));
		const destPath = join(dest, file.dest);
		const fullDest = resolve(destPath);

		if (existsSync(fullDest) && !overwrite) {
			console.log(`  ${pc.dim(file.dest)} ${pc.yellow("(exists, skipping)")}`);
			continue;
		}

		let content = readFileSync(src, "utf-8");
		if (alias !== "@/") {
			content = content.replace(/(from\s+['"])@\//g, `$1${alias}`);
		}

		mkdirSync(dirname(fullDest), { recursive: true });
		writeFileSync(fullDest, content, "utf-8");
		console.log(`  ${pc.dim(file.dest)} ${pc.green("✓")}`);
		written++;
	}
	return written;
}

export const initCommand = new Command("init")
	.description("Initialize project with Composables directory structure, foundation, and tooling")
	.option("-d, --dest <path>", "destination directory", ".")
	.option("-y, --yes", "overwrite existing files without prompting")
	.option("--alias <prefix>", "rewrite @/ imports to a custom alias", "@/")
	.action((opts) => {
		const dest = opts.dest as string;
		const overwrite = opts.yes as boolean;
		const alias = opts.alias as string;

		console.log(pc.bold("\n🏗  Composables Init\n"));

		// 1. Create directories
		console.log(pc.bold("Creating directory structure:"));
		for (const dir of DIRECTORIES) {
			const fullPath = resolve(join(dest, dir));
			if (existsSync(fullPath)) {
				console.log(`  ${pc.dim(dir)} ${pc.yellow("(exists)")}`);
			} else {
				mkdirSync(fullPath, { recursive: true });
				console.log(`  ${pc.dim(dir)} ${pc.green("✓")}`);
			}
		}

		// 2. Install foundation entries
		console.log(pc.bold("\nInstalling foundation:"));
		let totalWritten = 0;
		for (const name of FOUNDATION_ENTRIES) {
			console.log(pc.cyan(`  ${name}`));
			totalWritten += copyRegistryEntry(name, dest, overwrite, alias);
		}

		// 3. Install tooling entries
		console.log(pc.bold("\nInstalling tooling:"));
		const npmDeps = new Set<string>();
		const postInstallNotes: { name: string; note: string }[] = [];

		for (const name of TOOLING_ENTRIES) {
			console.log(pc.cyan(`  ${name}`));
			totalWritten += copyRegistryEntry(name, dest, overwrite, alias);

			const entry = registry[name];
			if (entry) {
				for (const dep of entry.deps) npmDeps.add(dep);
				if (entry.postInstallNote) {
					postInstallNotes.push({ name, note: entry.postInstallNote });
				}
			}
		}

		// 4. Summary
		console.log(pc.green(`\n✓ Done! ${totalWritten} file(s) written.\n`));

		// 5. npm deps
		if (npmDeps.size > 0) {
			const deps = [...npmDeps].join(" ");
			console.log(pc.bold("Install required dependencies:"));
			console.log(`  npm install ${deps}`);
			console.log(pc.dim(`  # or: pnpm add ${deps}`));
			console.log(pc.dim(`  # or: bun add ${deps}`));
			console.log();
		}

		// 6. Post-install notes from tooling
		if (postInstallNotes.length > 0) {
			console.log(pc.bold("Tooling setup:"));
			for (const { name, note } of postInstallNotes) {
				console.log(`\n  ${pc.cyan(name)}`);
				for (const line of note.split("\n")) {
					console.log(`  ${line}`);
				}
			}
			console.log();
		}

		// 7. Manual guidance
		console.log(pc.bold("Next steps:\n"));

		console.log(pc.cyan("  1. tsconfig.json — ensure @/ alias is configured:"));
		console.log(pc.dim('     "compilerOptions": {'));
		console.log(pc.dim('       "paths": { "@/*": ["./src/*"] }'));
		console.log(pc.dim("     }"));
		console.log();

		console.log(pc.cyan("  2. biome.json — extend the installed lint rules:"));
		console.log(pc.dim("     {"));
		console.log(pc.dim('       "extends": ['));
		console.log(pc.dim('         "./src/rules/biome-ui-restricted.json",'));
		console.log(pc.dim('         "./src/rules/biome-no-direct-icons.json"'));
		console.log(pc.dim("       ]"));
		console.log(pc.dim("     }"));
		console.log();

		console.log(pc.cyan("  3. Import composable.css in your app entry:"));
		console.log(pc.dim('     import "@/styles/composable.css";'));
		console.log();

		console.log(
			pc.dim(
				'Then run `composables add <component>` to add components, or `composables add all` for everything.\n',
			),
		);
	});
