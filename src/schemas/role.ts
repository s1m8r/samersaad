import {  z } from "zod";

export  const roleScema = z.object({
    name: z.string().min(1,"enter name"),
    description: z.string().min(1,"enter description"),
    permissionIds: z.array(z.any()).min(1),
    permissions: z.array(z.any()).optional(),
    id: z.number().optional(),
    isActive: z.boolean().optional()
    
})