import AddRole from '@/pages/role/addRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/roles/addrole')({
  component: AddRole,
})
