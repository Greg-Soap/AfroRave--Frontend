import { z } from "zod";

export const EditEventDetailsSchema = z.object({
  name: z.string().max(85, {
    message: "Event name must not exceed 85 characters.",
  }),
  age_rating: z.string({
    required_error: "Select an age rating.",
  }),
  category: z.string().min(3, { message: "Provide a valid category." }),
  venue: z.string().min(3, { message: "Provide a valid venue." }),
  description: z
    .string()
    .max(950, { message: "Description must not exceed 950 characters." }),
  custom_url: z.string().min(3, { message: "URL too short." }),
  time_zone: z.string({ required_error: "Select a time zone." }),
  date: z.object({
    start_date: z.date({ required_error: "A start date is required." }),
    end_date: z.date({ required_error: "A end date is required." }),
  }),
  time: z.object({
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    period: z.enum(["am", "pm"]),
    start_time: z
      .string()
      .min(4, { message: "Provide a valid time." })
      .max(4, { message: "Provide a valid time." }),
    end_time: z
      .string()
      .min(4, { message: "Provide a valid time." })
      .max(4, { message: "Provide a valid time." }),
  }),
  email: z.string().email(),
  website_url: z.string().min(7, { message: "Provide a valid link." }),
  socials: z.object({
    instagram: z
      .string()
      .min(3, { message: "Provide a valid Instagram link." })
      .optional(),
    x: z.string().min(3, { message: "Provide a valid X link." }).optional(),
    tiktok: z
      .string()
      .min(3, { message: "Provide a valid Tiktok link." })
      .optional(),
    facebook: z
      .string()
      .min(3, { message: "Provide a valid Facebook link." })
      .optional(),
  }),
});
