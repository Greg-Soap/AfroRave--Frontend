import { z } from "zod";

export const ticketSchema = z.object({
  ticketName: z.string().min(3, { message: "Provide a valid ticket name." }),
  type: z.enum(["paid", "free", "invite-only"]),
  salesType: z.string({ required_error: "Select a sale type." }),
  ticketType: z.string({ required_error: "Select a type of ticket." }),
  quantity: z.object({
    availability: z.enum(["limited", "unlimited"]),
    amount: z.string().min(2, { message: "Provide a valid quantity." }),
  }),
  price: z.string().min(3, { message: "Provide a valid amount." }),
  description: z
    .string()
    .min(10, { message: "Description too short." })
    .max(450, { message: "Description too long." }),
  perks: z.string().min(3, { message: "Provide a perk." }),
  tags: z.string({ required_error: "Select a tag." }),
  advancedOptions: z.boolean().default(false).optional(),
  allowResell: z.boolean().default(false).optional(),
  startSales: z
    .object({
      whenToStart: z.enum(["immediately", "at-a-scheduled-date"]),
      scheduledDate: z
        .object({
          date: z.date({ required_error: "A start date is required." }),
          hour: z.string().min(1).max(2),
          minute: z.string().min(1).max(2),
          period: z.enum(["AM", "PM"]),
        })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.whenToStart === "at-a-scheduled-date") {
          return data.scheduledDate !== undefined;
        }
        return true;
      },
      {
        message: "Scheduled date is required when starting at a scheduled date",
        path: ["scheduledDate"],
      }
    ),
  confirmationMailText: z.string().optional(),
  email: z.string().email(),
});

export const defaultTicketValues: z.infer<typeof ticketSchema> = {
  ticketName: "",
  type: "paid",
  salesType: "",
  ticketType: "",
  quantity: {
    availability: "limited",
    amount: "",
  },
  price: "",
  description: "",
  perks: "",
  tags: "",
  advancedOptions: false,
  startSales: {
    whenToStart: "immediately",
    scheduledDate: {
      date: new Date(),
      hour: "12",
      minute: "00",
      period: "AM",
    },
  },
  confirmationMailText: "",
  email: "",
};
