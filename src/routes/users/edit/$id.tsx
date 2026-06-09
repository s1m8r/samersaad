import EditUser from '@/pages/user/editUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/edit/$id')({
  component: EditUser,
})

