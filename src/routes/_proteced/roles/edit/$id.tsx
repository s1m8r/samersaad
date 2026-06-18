import EditRole from '@/pages/role/editRole'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/roles/edit/$id')({
  component: EditRole,
})

