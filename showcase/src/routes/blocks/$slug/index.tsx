import { createFileRoute } from '@tanstack/react-router'
import { BlockRoute } from '@/blocks-route'

export const Route = createFileRoute('/blocks/$slug/')({
	component: () => <BlockRoute slug={Route.useParams().slug} />,
})
