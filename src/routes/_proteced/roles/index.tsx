import ShowRole from '@/pages/role/showRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/roles/')({
  component: ShowRole,
})
