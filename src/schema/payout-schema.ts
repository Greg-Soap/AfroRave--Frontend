import { z } from "zod";

export const PayoutSchema = z.object({
  currency: z.string().min(3, {
    message: "Currency must be at least 3 characters.",
  }),
  bank: z.string().min(3, {
    message: "Bank must be at least 3 characters long",
  }),
  account_number: z.number().min(10, {
    message: "Account number too short.",
  }),
  account_name: z
    .string()
    .min(6, { message: "Account name must be atleast 6 characters long." })
    .max(30, {
      message: "Account name too long.",
    }),
});
