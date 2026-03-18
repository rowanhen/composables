/**
 * CLI command tests
 * Tests the list functionality and the add command's dependency resolution and file writing.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { registry } from "../registry.js";
import { collectDeps } from "../commands/add.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..", "..");
const cliSrc = join(__dirname, "..", "cli.ts");

// ─── List command ────────────────────────────────────────────────────────────

describe("List command", () => {
	it("registry has all expected components accessible", () => {
		const keys = Object.keys(registry);
		expect(keys.length).toBeGreaterThan(0);
		// Verify a selection of well-known components are present
		const expected = ["button", "utils", "input", "label", "separator", "tooltip"];
		for (const name of expected) {
			expect(registry).toHaveProperty(name);
		}
	});

	it("returns all registry entries (no filtering)", () => {
		const entries = Object.entries(registry);
		expect(entries.length).toBe(Object.keys(registry).length);
	});

	it("all tags are non-empty strings", () => {
		for (const [key, entry] of Object.entries(registry)) {
			for (const tag of entry.tags) {
				expect(typeof tag).toBe("string");
				expect(tag.length).toBeGreaterThan(0);
			}
		}
	});

	it("can filter by tag: foundation", () => {
		const foundation = Object.values(registry).filter((e) => e.tags.includes("foundation"));
		expect(foundation.length).toBeGreaterThanOrEqual(3);
		const names = foundation.map((e) => e.name);
		expect(names).toContain("utils");
		expect(names).toContain("styles");
	});

	it("can filter by tag: primitive", () => {
		const primitives = Object.values(registry).filter((e) => e.tags.includes("primitive"));
		expect(primitives.length).toBeGreaterThanOrEqual(20);
	});
});

// ─── collectDeps (internal dep resolution) ───────────────────────────────────

describe("collectDeps — internal dependency resolution", () => {
	it("returns just the component when it has no internalDeps", () => {
		const result = collectDeps(["utils"]);
		expect(result).toContain("utils");
	});

	it("button depends on utils → both appear in resolved list", () => {
		const result = collectDeps(["button"]);
		expect(result).toContain("button");
		expect(result).toContain("utils");
	});

	it("deps are resolved depth-first (deps before dependents)", () => {
		const result = collectDeps(["button"]);
		const utilsIdx = result.indexOf("utils");
		const buttonIdx = result.indexOf("button");
		expect(utilsIdx).toBeLessThan(buttonIdx);
	});

	it("deduplicates shared deps across multiple components", () => {
		// button and label both depend on utils — utils should appear once
		const result = collectDeps(["button", "label"]);
		const utilsCount = result.filter((n) => n === "utils").length;
		expect(utilsCount).toBe(1);
	});

	it("resolves transitive deps: calendar → button → utils", () => {
		const result = collectDeps(["calendar"]);
		expect(result).toContain("calendar");
		expect(result).toContain("button");
		expect(result).toContain("utils");
		// utils comes before button
		const utilsIdx = result.indexOf("utils");
		const buttonIdx = result.indexOf("button");
		expect(utilsIdx).toBeLessThan(buttonIdx);
	});

	it("handles components with no deps gracefully", () => {
		// collapsible has no internalDeps
		const result = collectDeps(["collapsible"]);
		expect(result).toContain("collapsible");
	});

	it("handles deeply nested dep chains", () => {
		// sidebar → button, input, separator, sheet, skeleton, tooltip, use-mobile, utils
		// each of those has their own deps
		const result = collectDeps(["sidebar"]);
		expect(result).toContain("sidebar");
		expect(result).toContain("button");
		expect(result).toContain("input");
		expect(result).toContain("utils");
	});

	it("returns unique entries only (no duplicates in any chain)", () => {
		const result = collectDeps(["sidebar"]);
		const unique = new Set(result);
		expect(unique.size).toBe(result.length);
	});
});

// ─── Add command — file writing ───────────────────────────────────────────────

const tmpDir = join(cliRoot, ".test-tmp-add");

describe("Add command — file writing via CLI", () => {
	beforeAll(() => {
		mkdirSync(tmpDir, { recursive: true });
	});

	afterAll(() => {
		rmSync(tmpDir, { recursive: true, force: true });
	});

	it("adds button and its deps (utils) to a temp directory", async () => {
		const result = Bun.spawnSync({
			cmd: ["bun", "run", cliSrc, "add", "button", "--dest", tmpDir, "--yes"],
			cwd: cliRoot,
		});

		const stdout = result.stdout.toString();
		const stderr = result.stderr.toString();

		// Should exit successfully
		expect(result.exitCode).toBe(0);

		// Should mention writing files
		expect(stdout).toContain("button");
	});

	it("creates the button component file on disk", () => {
		const buttonFile = join(tmpDir, "components", "_internal", "button.tsx");
		expect(existsSync(buttonFile)).toBe(true);
		const content = readFileSync(buttonFile, "utf-8");
		expect(content).toContain("export");
		expect(content).toContain("Button");
	});

	it("creates the utils file (internalDep of button) on disk", () => {
		const utilsFile = join(tmpDir, "lib", "utils.ts");
		expect(existsSync(utilsFile)).toBe(true);
	});

	it("lists npm dependencies to install in output", async () => {
		// Re-run and check output mentions deps
		const result = Bun.spawnSync({
			cmd: ["bun", "run", cliSrc, "add", "button", "--dest", tmpDir, "--yes"],
			cwd: cliRoot,
		});

		const stdout = result.stdout.toString();
		// button deps: @base-ui/react, class-variance-authority
		expect(stdout).toContain("@base-ui/react");
		expect(stdout).toContain("class-variance-authority");
	});

	it("errors on unknown component name", async () => {
		const result = Bun.spawnSync({
			cmd: ["bun", "run", cliSrc, "add", "nonexistent-component-xyz", "--dest", tmpDir],
			cwd: cliRoot,
		});

		expect(result.exitCode).not.toBe(0);
		const stderr = result.stderr.toString() + result.stdout.toString();
		expect(stderr.toLowerCase()).toMatch(/unknown|nonexistent/);
	});
});
