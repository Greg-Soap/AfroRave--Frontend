import { z } from "zod";

export const SupportSchema = z.object({
  first_name: z.string().min(3, {
    message: "First name must be at least three characters long.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least three characters long.",
  }),
  email: z.string().email({
    message: "Kindly provide a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters long.",
  }),
});
