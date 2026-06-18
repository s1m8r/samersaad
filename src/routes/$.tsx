import ErrorPage from '@/pages/pageError/erroePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: ErrorPage,
})
