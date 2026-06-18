import AddUser from '@/pages/user/addUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/users/adduser')({
  component: AddUser,
})

