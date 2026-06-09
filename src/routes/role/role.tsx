import ShowRole from '@/pages/role/showRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/role/role')({
  component: ShowRole,
})

