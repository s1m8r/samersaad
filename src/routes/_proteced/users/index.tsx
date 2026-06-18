import ShowUser from '@/pages/user/showUsers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/users/')({
  component: ShowUser,
})

