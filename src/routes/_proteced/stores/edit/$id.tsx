import EditStore from '@/pages/storePage/editStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/stores/edit/$id')({
  component: EditStore,
})
