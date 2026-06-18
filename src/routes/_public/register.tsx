import Register from '@/pages/login/register'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/register')({
  component: Register,
})
