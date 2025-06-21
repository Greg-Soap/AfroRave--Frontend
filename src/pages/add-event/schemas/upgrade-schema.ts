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
      automaticFee: z.enum(["yes", "no"]),
      customFee: z.enum(["yes", "no"]),
      customPrice: z.string({ required_error: "Field cannot be empty." }),
    })
    .refine(
      (data) => {
        if (data.customFee === "yes") {
          return !!data.customFee && data.customFee.trim() !== "";
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
    automaticFee: "yes",
    customFee: "no",
    upgrade: [{ from: "", to: "" }],
    customPrice: "",
  },
];
