import EditStore from '@/pages/storePage/editStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/edit/$id')({
component: EditStore,
})