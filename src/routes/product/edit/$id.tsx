import EditProduct from '@/pages/product/editProduct'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/edit/$id')({
  component: EditProduct,
})

