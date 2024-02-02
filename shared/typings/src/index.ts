import { z } from "zod";

export const INPUT_LOGIN_FORM = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export type INPUT_LOGIN_FORM = z.infer<typeof INPUT_LOGIN_FORM>;
