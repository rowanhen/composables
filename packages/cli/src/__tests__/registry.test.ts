/**
 * Registry validation tests
 * Ensures every registry entry is well-formed and references real files on disk.
 */
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "bun:test";
import { registry, type ComponentEntry } from "../registry.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = join(__dirname, "..", "..");

const REQUIRED_FIELDS: (keyof ComponentEntry)[] = [
	"name",
	"description",
	"files",
	"deps",
	"internalDeps",
	"tags",
];

const entries = Object.entries(registry);

describe("Registry — required fields", () => {
	for (const [key, entry] of entries) {
		it(`${key}: has all required fields`, () => {
			for (const field of REQUIRED_FIELDS) {
				expect(entry).toHaveProperty(field);
			}
			// Types
			expect(typeof entry.name).toBe("string");
			expect(entry.name.length).toBeGreaterThan(0);
			expect(typeof entry.description).toBe("string");
			expect(entry.description.length).toBeGreaterThan(0);
			expect(Array.isArray(entry.files)).toBe(true);
			expect(entry.files.length).toBeGreaterThan(0);
			expect(Array.isArray(entry.deps)).toBe(true);
			expect(Array.isArray(entry.internalDeps)).toBe(true);
			expect(Array.isArray(entry.tags)).toBe(true);
			expect(entry.tags.length).toBeGreaterThan(0);
		});
	}
});

describe("Registry — file paths exist on disk", () => {
	for (const [key, entry] of entries) {
		for (const file of entry.files) {
			it(`${key}: ${file.src} exists`, () => {
				const fullPath = join(cliRoot, file.src);
				expect(existsSync(fullPath)).toBe(true);
			});

			it(`${key}: ${file.src} has non-empty dest`, () => {
				expect(typeof file.dest).toBe("string");
				expect(file.dest.length).toBeGreaterThan(0);
			});
		}
	}
});

describe("Registry — internalDeps reference valid registry keys", () => {
	const registryKeys = new Set(Object.keys(registry));

	for (const [key, entry] of entries) {
		for (const dep of entry.internalDeps) {
			it(`${key}: internalDep "${dep}" is a valid registry key`, () => {
				expect(registryKeys.has(dep)).toBe(true);
			});
		}
	}
});

describe("Registry — name field matches registry key", () => {
	for (const [key, entry] of entries) {
		it(`${key}: name matches key`, () => {
			expect(entry.name).toBe(key);
		});
	}
});

describe("Registry — total component count", () => {
	it("has at least 50 components registered", () => {
		expect(entries.length).toBeGreaterThanOrEqual(50);
	});

	it("all registry keys are unique strings", () => {
		const keys = Object.keys(registry);
		const uniqueKeys = new Set(keys);
		expect(uniqueKeys.size).toBe(keys.length);
	});
});
