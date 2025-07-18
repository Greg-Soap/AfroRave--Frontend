import { z } from "zod";

export const SupportSchema = z.object({
  email: z.string().email({
    message: "Kindly provide a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});
