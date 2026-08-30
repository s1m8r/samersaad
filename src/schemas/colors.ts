import z from "zod";

export const colors = z.object({
  data: z.array(
    z.object({
      path: z.string(),
      color: z.string(),
    }),
  ),
});
