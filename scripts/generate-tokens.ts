#!/usr/bin/env bun
/** One entrypoint: validate typed inputs, then generate every token artifact and preset. */
import { validateTokenSystem } from './validate-tokens'
const errors = validateTokenSystem()
if (errors.length) throw new Error(errors.join('\n'))
await import('./generate-css')
await import('./generate-preset-css')
