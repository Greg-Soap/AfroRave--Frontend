import { z } from "zod";

export const upgradeSchema = z.array(
  z
    .object({
      upgrade: z.array(
        z.object({
          from: z.string({ required_error: "Field cannot be empty" }),
          to: z.string({ required_error: "Field cannot be empty" }),
        })
      ),
      automaticFee: z.boolean().optional(),
      customFee: z.boolean().optional(),
      customPrice: z.string({ required_error: "Field cannot be empty." }),
    })
    .refine(
      (data) => {
        if (data.customFee === true) {
          return !!data.customPrice && data.customPrice.trim() !== "";
        }
        return true;
      },
      {
        message: "A custom fee is required.",
        path: ["customPrice"],
      }
    )
);

export const defaultUgradeValues: z.infer<typeof upgradeSchema> = [
  {
    automaticFee: true,
    customFee: false,
    upgrade: [{ from: "", to: "" }],
    customPrice: "",
  },
];
