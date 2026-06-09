import {  z } from "zod";

export const ProdectScema = z.object({
    id:z.number().optional(),
    storeId: z.number(),
    storeName: z.string().min(1,"enter store Name"),
    nameProdect: z.string().min(1,"enter Name Prodect"),
    description: z.string().min(1,"enter description"),
    image: z.string().min(1,"enter image"),
    type: z.string().min(1,"enter type"),
    price: z.number().min(1,"enter price"),
})