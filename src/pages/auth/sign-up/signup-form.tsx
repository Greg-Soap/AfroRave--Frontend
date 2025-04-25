import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/reusable";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { FormControl } from "@/components/ui/form";
import { BaseSelect } from "@/components/reusable";

const formSchema = z.object({
  first_name: z.string().min(2, { message: "Name too short." }),
  last_name: z.string().min(2, { message: "Name too short." }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  email: z.string().email({
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(2, {
      message: "Password too short.",
    })
    .max(20, {
      message: "Password too long.",
    }),
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      country: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="relative flex justify-center">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-[415px] h-fit rounded-[12px] space-y-5 bg-red px-7 py-4 md:px-5 md:py-12 z-10 font-sf-pro-text"
      >
        <div className="flex">
          <img
            src="/assets/resell/lighting.svg"
            alt="Bolt"
            width={22}
            height={32}
          />
          <p className="text-[32px] font-bold text-black font-sf-pro-text">
            Sign Up
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-[9px]">
          <FormField form={form} name="first_name" label="First Name">
            <Input placeholder="Enter your first name." />
          </FormField>

          <FormField form={form} name="last_name" label="Last Name">
            <Input placeholder="Enter your last name." />
          </FormField>
        </div>

        <FormField
          form={form}
          name="country"
          label="Country"
          className="w-full z-20"
        >
          <BaseSelect
            type="auth"
            placeholder="Select a country."
            width={329}
            items={africanCountries}
          />
        </FormField>

        <FormField form={form} name="email" label="Email Address">
          <Input placeholder="Enter email address." />
        </FormField>

        <FormField
          form={form}
          name="password"
          label="Password"
          className="w-full"
        >
          {(field) => (
            <PasswordInput
              placeholder="Enter password."
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        </FormField>

        <Button
          type="submit"
          className="w-full h-[50px] text-xl font-semibold font-sf-pro-text"
        >
          Sign Up
        </Button>
      </FormBase>
    </div>
  );
}

const africanCountries: { value: string; label: string }[] = [
  { value: "DZ", label: "Algeria" },
  { value: "AO", label: "Angola" },
  { value: "BJ", label: "Benin" },
  { value: "BW", label: "Botswana" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "CV", label: "Cabo Verde" },
  { value: "CM", label: "Cameroon" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "KM", label: "Comoros" },
  { value: "CG", label: "Congo (Brazzaville)" },
  { value: "CD", label: "Congo (Kinshasa)" },
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "DJ", label: "Djibouti" },
  { value: "EG", label: "Egypt" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "SZ", label: "Eswatini" },
  { value: "ET", label: "Ethiopia" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GH", label: "Ghana" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "KE", label: "Kenya" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "MG", label: "Madagascar" },
  { value: "MW", label: "Malawi" },
  { value: "ML", label: "Mali" },
  { value: "MR", label: "Mauritania" },
  { value: "MU", label: "Mauritius" },
  { value: "YT", label: "Mayotte" },
  { value: "MA", label: "Morocco" },
  { value: "MZ", label: "Mozambique" },
  { value: "NA", label: "Namibia" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigeria" },
  { value: "RE", label: "Réunion" },
  { value: "RW", label: "Rwanda" },
  { value: "ST", label: "São Tomé and Príncipe" },
  { value: "SN", label: "Senegal" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SO", label: "Somalia" },
  { value: "ZA", label: "South Africa" },
  { value: "SS", label: "South Sudan" },
  { value: "SD", label: "Sudan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TG", label: "Togo" },
  { value: "TN", label: "Tunisia" },
  { value: "UG", label: "Uganda" },
  { value: "EH", label: "Western Sahara" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];
