#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

const program = new Command();

program
	.name("composable")
	.description("Composable — design system CLI")
	.version(pkg.version);

program.addCommand(addCommand);
program.addCommand(listCommand);

program.parse();
