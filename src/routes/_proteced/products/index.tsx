import ShowProduct from '@/pages/product/showProduct'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/products/')({
  component: ShowProduct,
})
