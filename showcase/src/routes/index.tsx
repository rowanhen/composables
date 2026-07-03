import { createFileRoute } from '@tanstack/react-router'
import { CatalogPage } from '@/catalog-page'

export const Route = createFileRoute('/')({
	component: CatalogPage,
})
