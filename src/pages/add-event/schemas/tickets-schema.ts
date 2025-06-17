import { z } from "zod";

const ticketObjectSchema = z.object({
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
  perks: z
    .array(
      z.string().min(3, { message: "Each perk must be at least 3 characters." })
    )
    .min(1, { message: "Provide at least one perk." }),
  tags: z.string({ required_error: "Select a tag." }),
  advancedOptions: z.enum(["allow", "dont-allow"]).optional(),
  allowResell: z.enum(["allow", "dont-allow"]).optional(),
});

export const ticketSchema = z
  .object({
    tickets: z.array(ticketObjectSchema),
    whenToStart: z.enum(["immediately", "at-a-scheduled-date"]),
    scheduledDate: z
      .object({
        date: z.date({ required_error: "A start date is required." }),
        hour: z.string().min(1).max(2),
        minute: z.string().min(1).max(2),
        period: z.enum(["AM", "PM"]),
      })
      .optional(),
    confirmationMailText: z.string().optional(),
    email: z.string().email().optional(),
  })
  .refine(
    (data) => {
      if (data.whenToStart === "immediately") {
        return !data.scheduledDate;
      }
      return data.scheduledDate;
    },
    {
      message: "Scheduled date is required when schedule start is enabled",
      path: ["whenToStart"],
    }
  );

export const defaultTicketValues: z.infer<typeof ticketSchema> = {
  tickets: [
    {
      ticketName: "",
      type: "paid",
      salesType: "online",
      ticketType: "single_ticket",
      quantity: {
        availability: "limited",
        amount: "",
      },
      price: "",
      description: "",
      perks: [],
      tags: "",
      advancedOptions: "allow",
      allowResell: "allow",
    },
  ],
  whenToStart: "at-a-scheduled-date",
  scheduledDate: {
    date: new Date(),
    hour: "12",
    minute: "00",
    period: "AM",
  },
  confirmationMailText: "",
  email: undefined,
};
