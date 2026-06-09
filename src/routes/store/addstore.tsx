import AddStore from '@/pages/storePage/addStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/store/addstore')({
  component: AddStore,
})

