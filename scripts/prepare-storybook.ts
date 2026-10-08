import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const output = fileURLToPath(new URL('../showcase/dist/', import.meta.url))

// Storybook's manager filenames are stable across builds. Version their URLs
// so a previously cached runtime cannot break a newly deployed gallery.
for (const page of ['index.html', 'iframe.html']) {
	const html = readFileSync(`${output}${page}`, 'utf8')
	const versioned = html.replace(
		/(['"])(\.\/(?!assets\/)[^'"?]+\.js)\1/g,
		(_match, quote, path) => {
			const hash = createHash('sha256')
				.update(readFileSync(`${output}${path}`))
				.digest('hex')
				.slice(0, 16)
			return `${quote}${path}?v=${hash}${quote}`
		},
	)
	writeFileSync(`${output}${page}`, versioned)
}

writeFileSync(
	`${output}_headers`,
	[
		'/',
		'/index.html',
		'/iframe',
		'/iframe.html',
		'/index.json',
		'/sb-manager/*',
		'/sb-addons/*',
		'/sb-preview/*',
	]
		.map((path) => `${path}\n  Cache-Control: no-cache`)
		.join('\n\n') + '\n',
)
