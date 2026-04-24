import * as React from 'react'
import { TokenConfigPanel } from './token-config-panel'

/**
 * ThemeInjector — drop this anywhere in your app to get a floating theme
 * control panel. It renders a fixed palette button in the top-right corner
 * of the viewport that opens the full token config sheet.
 *
 * Works on any page without modifying your layout — the button lives outside
 * normal document flow via `position: fixed`.
 *
 * Usage:
 *   import { ThemeInjector } from './theme-injector'
 *
 *   // Add inside your root layout or any page component:
 *   <ThemeInjector />
 */
export function ThemeInjector() {
	return (
		<div
			style={{
				position: 'fixed',
				top: '1rem',
				right: '1rem',
				zIndex: 9999,
			}}
		>
			<TokenConfigPanel />
		</div>
	)
}
