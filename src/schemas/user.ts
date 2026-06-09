import { z } from "zod";

export const userScema = z.object({
    email: z.string().email("this not email"),
    password: z.string().min(6, "enter more at 6")
})
export const registerSchema = z.object({
    id: z.number().optional(),
    firstName: z.string().min(1, "FirstName is required"),
    lastName: z.string().min(1, "LastName is required"),
    email: z.string().email("this not email"),
    password: z.string().min(6, "enter more at 6").optional(),
    age: z.number(),
    address: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
    roleId: z.number().optional(),
    isActive: z.boolean().optional(),
})
