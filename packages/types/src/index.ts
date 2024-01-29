import { z } from "zod";

export const input = z.object({
  name: z.string(),
});

export const output = z.object({
  number: z.number(),
});
