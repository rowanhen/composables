import React from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/composable.css'
import { App } from './app'

// biome-ignore lint/style/noNonNullAssertion: root element always exists
createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
