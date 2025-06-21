import { z } from "zod";

const slotDetails = z.object({
  type: z.string({ required_error: "Select an option." }),
  category: z.string({ required_error: "Select an option." }),
  name: z.string({ required_error: "Provide a name for the service." }),
  slotAmount: z.string({ required_error: "Provide a valid number." }),
  pricePerSlot: z.string({ required_error: "Provide a valid slot." }),
  description: z
    .string({ required_error: "Provide a detailed description." })
    .max(450, { message: "Description too long." }),
});

export const slotSchema = z.object({
  slot: z.array(slotDetails),
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

export const defaultSlotValue: z.infer<typeof slotSchema> = {
  slot: [
    {
      type: "service_vendor",
      category: "dj_mc",
      name: "",
      slotAmount: "",
      pricePerSlot: "",
      description: "",
    },
  ],
  useDifferentContactDetails: "yes",
  email: "",
  phone: [{ countryCode: "+234", number: "" }],
  showSocialHandles: "yes",
};
