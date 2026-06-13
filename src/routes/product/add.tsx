import AddProduct from '@/pages/product/addProduct'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/add')({
  component: AddProduct,
})
