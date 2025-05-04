import z from "zod";

export const ProfileSchema = z.object({
  first_name: z.string().min(3, {
    message: "first_name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Provide a valid email.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long." })
    .max(20, {
      message: "Password too long.",
    }),
  gender: z.string().min(4, { message: "Provide a valid gender." }),
  birthday: z.object({
    month: z.string().min(1, { message: "Provide a valid month." }),
    day: z.string().min(1, { message: "Provide a valid day." }),
    year: z.string().min(4, { message: "Provide a valid year." }),
  }),
  country: z.string().min(4, {
    message: "Provide a valid country.",
  }),
  state: z.string().min(3, {
    message: "Provide a valid state.",
  }),
  phone: z.string().min(7, {
    message: "Provide a valid phone number.",
  }),
});
