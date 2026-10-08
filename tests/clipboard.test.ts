import { afterEach, expect, test } from 'bun:test'
import { copyText } from '../src/lib/clipboard'

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
afterEach(() => {
	if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator)
	else Reflect.deleteProperty(globalThis, 'navigator')
})

test('copies the exact value, including whitespace and unicode', async () => {
	const copied: string[] = []
	Object.defineProperty(globalThis, 'navigator', {
		configurable: true,
		value: {
			clipboard: {
				writeText: async (text: string) => {
					copied.push(text)
				},
			},
		},
	})
	await copyText('  hello 👋\nsecond line  ')
	expect(copied).toEqual(['  hello 👋\nsecond line  '])
})
test('propagates clipboard permission failures rather than reporting success', async () => {
	const error = new Error('Permission denied')
	Object.defineProperty(globalThis, 'navigator', {
		configurable: true,
		value: {
			clipboard: {
				writeText: async () => {
					throw error
				},
			},
		},
	})
	await expect(copyText('example')).rejects.toBe(error)
})
test('fails explicitly when no browser clipboard mechanism is available', async () => {
	Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} })
	await expect(copyText('example')).rejects.toThrow('Clipboard access is unavailable')
})
