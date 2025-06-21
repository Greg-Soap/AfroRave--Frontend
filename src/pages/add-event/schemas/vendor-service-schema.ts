import { z } from "zod";

const serviceDetails = z.object({
  type: z.string({ required_error: "Select an option." }),
  category: z.string({ required_error: "Select an option." }),
  name: z.string({ required_error: "Provide a name for the service." }),
  budgetRange: z.enum(["yes", "no"]).optional(),
  workDuration: z.object({
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    second: z.string().min(1).max(2),
  }),
  start: z.object({
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    period: z.enum(["AM", "PM"]),
  }),
  stop: z.object({
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    period: z.enum(["AM", "PM"]),
  }),
  description: z
    .string({ required_error: "Provide a detailed description." })
    .max(450, { message: "Description too long." }),
});

export const serviceSchema = z.object({
  service: z.array(serviceDetails),
  useDifferentContactDetails: z.enum(["yes", "no"]),
  email: z.string().email(),
  phone: z.array(
    z.object({
      countryCode: z.string({ required_error: "Select a country code." }),
      number: z
        .string({ required_error: "Provide valid number" })
        .max(11, { message: "Provide a valid number." }),
    })
  ),
  showSocialHandles: z.enum(["yes", "no"]),
});

export const defaultServiceValue: z.infer<typeof serviceSchema> = {
  service: [
    {
      type: "service_vendor",
      category: "dj_mc",
      budgetRange: "yes",
      name: "",
      workDuration: { hour: "12", minute: "12", second: "12" },
      start: { hour: "12", minute: "12", period: "AM" },
      stop: { hour: "12", minute: "12", period: "AM" },
      description: "",
    },
  ],
  useDifferentContactDetails: "yes",
  email: "",
  phone: [{ countryCode: "+234", number: "" }],
  showSocialHandles: "yes",
};
