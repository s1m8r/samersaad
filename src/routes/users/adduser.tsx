import AddUser from '@/pages/user/addUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/adduser')({
    component: AddUser,
})

