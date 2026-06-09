import EditRole from '@/pages/role/editRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/role/edit/$id')({
  component: EditRole,
})
