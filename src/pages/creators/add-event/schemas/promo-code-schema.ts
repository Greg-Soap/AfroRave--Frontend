import { z } from "zod";

export const promoCodeSchema = z.array(
  z
    .object({
      code: z
        .string()
        .min(5, { message: "Code too short." })
        .max(20, { message: "Code too short" }),
      discount: z.object({
        type: z.string({ required_error: "Select a discount type." }),
        amount: z.string({ required_error: "Provide a valid amount." }),
      }),
      usageLimit: z.string({ required_error: "Provide a usage limit" }),
      onePerCustomer: z.boolean().optional(),
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
          minimum: z.boolean().optional(),
          amount: z.string().optional(),
        }),
        purchased: z.object({
          minimum: z.boolean().optional(),
          amount: z.string().optional(),
        }),
      }),
      private: z.boolean().optional(),
      notes: z.string().max(250, { message: "Note too long." }).optional(),
      perks: z.array(z.string().optional()),
      partnershipCode: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.conditions.spend.minimum === true) {
          return (
            !!data.conditions.spend.amount &&
            data.conditions.spend.amount.trim() !== ""
          );
        }
        return true;
      },
      {
        message: "Amount is required when spend minimum is required",
        path: ["conditions", "spend", "amount"],
      }
    )
    .refine(
      (data) => {
        if (data.conditions.purchased.minimum === true) {
          return (
            !!data.conditions.purchased.amount &&
            data.conditions.purchased.amount.trim() !== ""
          );
        }
        return true;
      },
      {
        message: "Amount is required when purchased minimum is required",
        path: ["conditions", "purchased", "amount"],
      }
    )
);

export const defaultPromoCodeValues: z.infer<typeof promoCodeSchema> = [
  {
    code: "",
    discount: {
      type: "percentage",
      amount: "",
    },
    usageLimit: "100",
    onePerCustomer: true,
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
        minimum: false,
        amount: "",
      },
      purchased: {
        minimum: false,
        amount: "",
      },
    },
    private: true,
    notes: "",
    perks: [],
    partnershipCode: false,
  },
];
