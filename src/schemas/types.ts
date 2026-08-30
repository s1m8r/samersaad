import z from "zod";

export const types = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      img: z.string(),
      value: z.string(),
    }),
  ),
});
