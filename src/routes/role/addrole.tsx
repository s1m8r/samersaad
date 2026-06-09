import AddRole from '@/pages/role/addRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/role/addrole')({
  component: AddRole,
})
