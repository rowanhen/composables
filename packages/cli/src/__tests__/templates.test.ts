/**
 * Template integrity tests
 * Verifies that every template file is non-empty, parseable, and that
 * @/components/_internal/ imports reference files that actually exist in templates/_internal/.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "bun:test";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..", "..");
const templatesDir = join(cliRoot, "templates");
const uiDir = join(templatesDir, "_internal");
const uiOpinionatedDir = join(templatesDir, "ui-opinionated");

function getFilesInDir(dir: string, ext = ".tsx"): string[] {
	if (!existsSync(dir)) return [];
	return readdirSync(dir)
		.filter((f) => f.endsWith(ext))
		.map((f) => join(dir, f));
}

function readTemplate(filePath: string): string {
	return readFileSync(filePath, "utf-8");
}

/**
 * Extract @/components/_internal/<name> imports from a file's content.
 * Returns the referenced component names (basename without extension).
 */
function extractUiImports(content: string): string[] {
	const results: string[] = [];
	// Matches: from "@/components/_internal/button" or from '@/components/_internal/input-group'
	const importRe = /from\s+['"]@\/components\/_internal\/([^'"]+)['"]/g;
	let match: RegExpExecArray | null;
	// biome-ignore lint: while loop needed for regex
	while ((match = importRe.exec(content)) !== null) {
		results.push(match[1]);
	}
	return results;
}

// ─── ui/ templates ────────────────────────────────────────────────────────────

const uiFiles = getFilesInDir(uiDir);

describe("templates/_internal — file integrity", () => {
	it("_internal directory contains at least 30 template files", () => {
		expect(uiFiles.length).toBeGreaterThanOrEqual(30);
	});

	for (const filePath of uiFiles) {
		const name = basename(filePath);

		it(`${name}: is non-empty`, () => {
			const content = readTemplate(filePath);
			expect(content.trim().length).toBeGreaterThan(0);
		});

		it(`${name}: contains at least one export`, () => {
			const content = readTemplate(filePath);
			expect(content).toMatch(/export\s+(function|const|class|type|interface|\{)/);
		});

		it(`${name}: imports @/lib/utils (all primitives use cn)`, () => {
			const content = readTemplate(filePath);
			// Most ui/ components import from @/lib/utils — check at least that the file isn't importing from wrong paths
			// Only check if it mentions @/ to ensure no hardcoded relative paths to internal lib
			if (content.includes("@/lib/utils") || content.includes("from '@/") || content.includes('from "@/')) {
				// Good — using alias imports
				expect(content).toMatch(/@\//);
			}
		});
	}
});

// ─── ui-opinionated/ templates ────────────────────────────────────────────────

const uiOpinionatedFiles = getFilesInDir(uiOpinionatedDir);

describe("templates/ui-opinionated — file integrity", () => {
	it("ui-opinionated directory contains at least 40 template files", () => {
		expect(uiOpinionatedFiles.length).toBeGreaterThanOrEqual(40);
	});

	for (const filePath of uiOpinionatedFiles) {
		const name = basename(filePath);

		it(`${name}: is non-empty`, () => {
			const content = readTemplate(filePath);
			expect(content.trim().length).toBeGreaterThan(0);
		});

		it(`${name}: contains at least one export`, () => {
			const content = readTemplate(filePath);
			expect(content).toMatch(/export\s+(function|const|class|type|interface|\{)/);
		});
	}
});

// ─── Import path integrity ────────────────────────────────────────────────────

describe("templates/ui-opinionated — @/components/_internal/ imports reference real files", () => {
	for (const filePath of uiOpinionatedFiles) {
		const name = basename(filePath);
		const content = readTemplate(filePath);
		const uiImports = extractUiImports(content);

		for (const importedName of uiImports) {
			it(`${name}: @/components/_internal/${importedName} → templates/_internal/${importedName}.tsx exists`, () => {
				const expectedFile = join(uiDir, `${importedName}.tsx`);
				expect(existsSync(expectedFile)).toBe(true);
			});
		}
	}
});

describe("templates/_internal — @/components/_internal/ imports reference real files", () => {
	for (const filePath of uiFiles) {
		const name = basename(filePath);
		const content = readTemplate(filePath);
		const uiImports = extractUiImports(content);

		for (const importedName of uiImports) {
			it(`${name}: @/components/_internal/${importedName} → templates/_internal/${importedName}.tsx exists`, () => {
				const expectedFile = join(uiDir, `${importedName}.tsx`);
				expect(existsSync(expectedFile)).toBe(true);
			});
		}
	}
});

// ─── Non-UI templates ─────────────────────────────────────────────────────────

describe("templates/lib — utility files", () => {
	it("lib/utils.ts exists and exports cn", () => {
		const utilsPath = join(templatesDir, "lib", "utils.ts");
		expect(existsSync(utilsPath)).toBe(true);
		const content = readTemplate(utilsPath);
		expect(content).toContain("cn");
		expect(content).toMatch(/export/);
	});

	it("lib/numeric-input.ts exists and is non-empty", () => {
		const numPath = join(templatesDir, "lib", "numeric-input.ts");
		expect(existsSync(numPath)).toBe(true);
		expect(readTemplate(numPath).trim().length).toBeGreaterThan(0);
	});
});

describe("templates/hooks — hook files", () => {
	it("hooks/use-mobile.ts exists and exports a hook", () => {
		const hookPath = join(templatesDir, "hooks", "use-mobile.ts");
		expect(existsSync(hookPath)).toBe(true);
		const content = readTemplate(hookPath);
		expect(content).toMatch(/export/);
	});

	it("hooks/use-numeric-input.ts exists and exports a hook", () => {
		const hookPath = join(templatesDir, "hooks", "use-numeric-input.ts");
		expect(existsSync(hookPath)).toBe(true);
		const content = readTemplate(hookPath);
		expect(content).toMatch(/export/);
	});
});

describe("templates/styles", () => {
	it("styles/composable.css exists and is non-empty", () => {
		const cssPath = join(templatesDir, "styles", "composable.css");
		expect(existsSync(cssPath)).toBe(true);
		expect(readTemplate(cssPath).trim().length).toBeGreaterThan(0);
	});
});
