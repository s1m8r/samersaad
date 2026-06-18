import EditUser from '@/pages/user/editUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/users/edit/$id')({
  component: EditUser,
})
