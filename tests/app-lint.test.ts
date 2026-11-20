import { expect, test } from 'bun:test'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const plugin = fileURLToPath(new URL('../src/lint/index.mjs', import.meta.url))
const oxlint = fileURLToPath(new URL('../node_modules/oxlint/bin/oxlint', import.meta.url))

function lint(source: string) {
	const dir = mkdtempSync(join(tmpdir(), 'composables-lint-'))
	try {
		const config = join(dir, '.oxlintrc.json')
		const file = join(dir, 'app.tsx')
		writeFileSync(file, source)
		writeFileSync(
			config,
			JSON.stringify({
				jsPlugins: [{ name: 'composables', specifier: plugin }],
				rules: {
					'composables/use-opinionated-components': 'error',
					'composables/use-semantic-tokens': 'error',
				},
			}),
		)
		const { exitCode, stdout, stderr } = Bun.spawnSync(['bun', oxlint, '-c', config, file], {
			cwd: dir,
		})
		return { exitCode, output: stdout.toString() + stderr.toString() }
	} finally {
		rmSync(dir, { recursive: true, force: true })
	}
}

test('rejects direct UI imports, native controls, palette classes, and fixed radii', () => {
	const { exitCode, output } = lint(`
		import { Button } from '@ui-sdk/react/button'
		import { Input } from '@/components/ui/input'
		import { cn } from '@leitware/composables'
		export function Form({ active }) {
			const classes = cn('px-4', { 'hover:bg-blue-500/40': true })
			return <>
				<button className={classes}>Save</button>
				<Button className={active ? '[&:has(span)]:rounded-[8px]' : 'text-muted-foreground'} />
				<Input className="fill-text-default" style={{ color: '#f06', borderRadius: 12 }} />
				<div className="[background-color:tomato]" />
				<div className="text-brand-2 bg-fill-primary-hover" />
			</>
		}
	`)
	expect(exitCode).toBe(1)
	for (const diagnostic of [
		'@ui-sdk/react/button',
		'@/components/ui/input',
		'Use Button from @leitware/composables',
		'hover:bg-blue-500/40',
		'rounded-[8px]',
		'text-muted-foreground',
		'fill-text-default',
		'[background-color:tomato]',
		'text-brand-2',
		'bg-fill-primary-hover',
		'token for color',
		'token for borderRadius',
	]) {
		expect(output).toContain(diagnostic)
	}
})

test('allows public UI APIs, native hidden fields, layout classes, and semantic styling', () => {
	const result = lint(`
		import { Button, cn } from '@leitware/composables'
		export const form = <form>
			<input type="hidden" name="action" value="save" />
			<Button
				className={cn('w-[18rem] border-2 rounded-md sm:hover:bg-fill-primary text-on-fill-primary', {
					'[&>svg]:fill-icon-inverse': true, 'focus-visible:ring-[var(--border-focus)]': true,
				})}
				style={{ color: 'var(--text-default)', borderRadius: 'var(--radius-sm)' }}
			>Save</Button>
		</form>
	`)
	expect(result.exitCode).toBe(0)
	expect(result.output).not.toContain('composables(')
})
