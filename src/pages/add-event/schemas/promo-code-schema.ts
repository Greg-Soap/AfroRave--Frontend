import { z } from "zod";

export const promoCodeSchema = z.array(
  z.object({
    code: z
      .string()
      .min(5, { message: "Code too short." })
      .max(20, { message: "Code too short" }),
    discount: z.object({
      type: z.string({ required_error: "Select a discount type." }),
      amount: z.string({ required_error: "Provide a valid amount." }),
    }),
    usageLimit: z.string({ required_error: "Provide a usage limit" }),
    onePerCustomer: z.enum(["yes", "no"]),
    startDate: z.object({
      date: z.date({ required_error: "A start date is required." }),
      hour: z.string().min(1).max(2),
      minute: z.string().min(1).max(2),
      period: z.enum(["AM", "PM"]),
    }),
    endDate: z.object({
      date: z.date({ required_error: "A start date is required." }),
      hour: z.string().min(1).max(2),
      minute: z.string().min(1).max(2),
      period: z.enum(["AM", "PM"]),
    }),
    conditions: z.object({
      spend: z.object({
        minimum: z.enum(["yes", "no"]).optional(),
        amount: z.string().optional(),
      }),
      purchased: z.object({
        minimum: z.enum(["yes", "no"]).optional(),
        amount: z.string().optional(),
      }),
    }),
    private: z.enum(["yes", "no"]),
    notes: z.string().max(250, { message: "Note too long." }).optional(),
    perks: z.array(z.string().optional()),
    partnershipCode: z.enum(["yes", "no"]),
  })
);

export const defaultPromoCodeValues: z.infer<typeof promoCodeSchema> = [
  {
    code: "",
    discount: {
      type: "percentage",
      amount: "",
    },
    usageLimit: "100",
    onePerCustomer: "yes",
    startDate: {
      date: new Date(),
      hour: "12",
      minute: "00",
      period: "AM",
    },
    endDate: {
      date: new Date(),
      hour: "12",
      minute: "00",
      period: "AM",
    },
    conditions: {
      spend: {
        minimum: "no",
        amount: "",
      },
      purchased: {
        minimum: "no",
        amount: "",
      },
    },
    private: "yes",
    notes: "",
    perks: [],
    partnershipCode: "no",
  },
];
