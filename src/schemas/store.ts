import {  z } from "zod";

export const storeScema = z.object({
    id:z.number().optional(),
    name: z.string().min(1,"enter name"),
    email: z.string().email("this not email"),
    phone: z.string().min(1,"enter phone"),
    website: z.string().min(1,"enter website"),
    image: z.string().min(1, "enter image"),
    address: z.object({
        street:z.string().min(1, "enter street"),
        city:z.string().min(1, "enter city"),
        state:z.string().min(1, "enter state"),
        zipCode:z.string().min(1, "enter zipCode"),
        country:z.string().min(1, "enter country"),
    }),
    owner:z.string().min(1, "enter owner"),
    employees: z.number().min(1, "enter employees"),
    openingHours: z.object({
        sunday:z.string().min(1, "enter sunday"),
        monday:z.string().min(1, "enter monday"),
        tuesday:z.string().min(1, "enter tuesday"),
        wednesday:z.string().min(1, "enter wednesday"),
        thursday:z.string().min(1, "enter thursday"),
        friday:z.string().min(1, "enter friday"),
        saturday:z.string().min(1, "enter saturday"),
    }),
    rating:z.number().min(1, "enter rating"),
    reviews:z.number().min(1, "enter reviews"),
    categories:z.array(z.string()).min(1)
})