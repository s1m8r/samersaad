import { z } from "zod";
export const imageObject = z.object({
  color: z.string().min(1, "is required"),
  path: z.string().min(1, "is required"),
});
export const ProdectScema = z.object({
  id: z.number().optional(),
  storeId: z.number(),
  discountPercentage: z
    .number()
    .min(0, "Discount must be at least 0%")
    .max(100, "Discount cannot exceed 100%"),
  storeName: z.string().min(1, "Store name is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required"),
  type: z.string().min(1, "Product type is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  rating: z.number().min(0, "Rating must be greater than 0"),
  badge: z.number().min(0, "Badge must be greater than 0"),
  images: z.array(imageObject).min(1, "this is required"),
  createdAt: z.string().optional(),
});
