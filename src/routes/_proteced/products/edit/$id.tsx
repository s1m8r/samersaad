import EditProduct from '@/pages/product/editProduct'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_proteced/products/edit/$id')({
  component: EditProduct,
})

