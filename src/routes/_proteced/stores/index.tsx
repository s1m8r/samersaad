import ShowStore from '@/pages/storePage/showStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/stores/')({
  component: ShowStore,
})

