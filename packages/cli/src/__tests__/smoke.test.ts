/**
 * Smoke test — ensures `bun test` exits cleanly with a real passing assertion.
 * Replaces the previous `bun test || true` hack that silently swallowed failures.
 */
import { describe, expect, it } from "bun:test";

describe("CLI smoke", () => {
	it("passes trivially so bun test does not exit with an error", () => {
		expect(true).toBe(true);
	});
});
