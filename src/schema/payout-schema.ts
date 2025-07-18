import { z } from "zod";

export const PayoutSchema = z.object({
  currency: z
    .string()
    .length(3, {
      message: "Currency must be a 3-letter ISO code.",
    })
    .toUpperCase(),
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name too long." }),
  card_number: z.string().regex(/^\d{16}$/, {
    message: "Card number must be exactly 16 digits.",
  }),
  expiry_date: z.object({
    year: z.string().regex(/^\d{4}$/, { message: "Year must be 4 digits." }),
    month: z.string().regex(/^(0[1-9]|1[0-2])$/, {
      message: "Month must be between 01 and 12.",
    }),
  }),
  cvc: z
    .string()
    .regex(/^\d{3}$/, { message: "CVC must be exactly 3 digits." }),
});

export const defaultPayoutValues: z.infer<typeof PayoutSchema> = {
  currency: "",
  name: "",
  card_number: "",
  expiry_date: { year: "", month: "" },
  cvc: "",
};
