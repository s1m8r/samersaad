import ShowStore from '@/pages/storePage/showStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/stores')({
  component: ShowStore,
})

