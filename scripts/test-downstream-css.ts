/** Check the CSS shipped by build:css, including optional Tailwind variants. */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { semanticUtilities } from '../src/styles/theme'
import { readPresetStyles } from './preset-css'

const root = join(import.meta.dir, '..')
const read = (file: string) => readFileSync(join(root, file), 'utf8')
const styles = read('dist/styles.css')
const adapter = read('src/styles/tailwind.css')
const utilities = semanticUtilities(adapter)
assert.ok(utilities.length > 0, 'Public semantic utilities must be registered')
assert.equal(read('dist/tailwind.css'), adapter)

for (const fragment of [
	'--kf-speed:',
	'--text-7xl--line-height:',
	'var(--alert-radius,var(--radius-2xl))',
	'var(--alert-font,var(--body-font-size))',
	'var(--field-font,var(--control-font-size))',
	'line-height:var(--heading-line-height)',
	'var(--menu-radius,var(--overlay-radius,var(--radius-2xl)))',
	'var(--input-height,var(--field-height,2.25rem))',
	'var(--dialog-face,var(--overlay-face,var(--popover)))',
	'var(--button-primary-face,var(--button-face,var(--primary)))',
	'var(--combobox-accent,var(--accent))',
	'var(--checkbox-accent,var(--primary))',
	'var(--switch-on,var(--primary))',
	'var(--tabs-track,var(--muted))',
	'.flex{',
	'.bg-primary{',
	'.motion-overlay{',
]) {
	assert.ok(styles.includes(fragment), `Missing from styles.css: ${fragment}`)
}
function assertUtility(css: string, selector: string, property: string, token: string) {
	// Tailwind can emit a built-in color declaration alongside a custom utility.
	const start = css.indexOf(`${selector}{`)
	const end = css.indexOf('}', start)
	assert.ok(
		start !== -1 && css.slice(start, end).includes(`${property}:var(${token})`),
		`Missing utility ${selector} using ${token}`,
	)
}

for (const { name, property, token } of utilities) {
	assertUtility(styles, `.${name}`, property, token)
}

const presets = readPresetStyles(join(root, 'src/styles/presets'))
for (const { file, css } of presets) {
	assert.equal(read(`dist/presets/${file}`), css, `Published preset differs: ${file}`)
}
const defaults = presets.find(({ name }) => name === 'default')
assert.ok(defaults, 'Missing default preset')
for (const mode of [defaults.light, defaults.dark]) {
	const color = mode['--bg-default'].toLowerCase().replace(/^(#[0-9a-f]{6})ff$/, '$1')
	assert.ok(styles.includes(`--bg-default:${color}`), 'styles.css must include Default')
}

const temp = mkdtempSync(join(root, '.test-tailwind-'))
try {
	const input = join(temp, 'input.css')
	const output = join(temp, 'output.css')
	const variants = utilities.map(({ name }) => `hover:${name}`).join(' ')
	writeFileSync(
		input,
		`@import 'tailwindcss' source(none);\n@import '../dist/tailwind.css';\n@source inline("${variants}");\n`,
	)
	execFileSync('bunx', ['--no-install', 'tailwindcss', '-i', input, '-o', output, '--minify'], {
		cwd: root,
		stdio: 'pipe',
		timeout: 60_000,
	})
	const css = readFileSync(output, 'utf8')
	for (const { name, property, token } of utilities) {
		assertUtility(css, `.hover\\:${name}:hover`, property, token)
	}
} finally {
	rmSync(temp, { recursive: true, force: true })
}

console.log(
	`Verified ${utilities.length} semantic utilities and variants, plus ${presets.length} published presets.`,
)
