import { z } from "zod";

export const contactUsSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be at most 50 characters" })
    .nonempty({ message: "First name is required" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be at most 50 characters" })
    .nonempty({ message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(56, { message: "Country must be at most 56 characters" })
    .nonempty({ message: "Country is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be at most 1000 characters" })
    .nonempty({ message: "Message is required" }),
});

export const defaultContactUsValue: z.infer<typeof contactUsSchema> = {
  firstname: "",
  lastname: "",
  email: "",
  country: "",
  message: "",
};
