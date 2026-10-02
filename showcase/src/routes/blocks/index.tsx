import { createFileRoute } from '@tanstack/react-router'
import { BlocksRoute } from '@/blocks-route'

export const Route = createFileRoute('/blocks/')({ component: BlocksRoute })
