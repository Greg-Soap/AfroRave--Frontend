import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/reusable";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { BaseSelect } from "@/components/reusable";

const formSchema = z.object({
  first_name: z.string().min(3, {
    message: "first_name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Provide a valid email.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long." })
    .max(20, {
      message: "Password too long.",
    }),
  gender: z.string().min(4, { message: "Provide a valid gender." }),
  birthday: z.object({
    month: z.string().min(1, { message: "Provide a valid month." }),
    day: z.string().min(1, { message: "Provide a valid day." }),
    year: z.string().min(4, { message: "Provide a valid year." }),
  }),
  country: z.string().min(4, {
    message: "Provide a valid country.",
  }),
  state: z.string().min(3, {
    message: "Provide a valid state.",
  }),
  phone: z.string().min(7, {
    message: "Provide a valid phone number.",
  }),
});

export default function ProfileTab() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      birthday: {
        month: "",
        day: "",
        year: "",
      },
      country: "",
      state: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-[529px] flex flex-col gap-[30px] pb-[415px]">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-[15px] font-input-mono"
      >
        {profile_form.slice(0, 5).map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            label={item.label}
            form={form}
            className="flex flex-col gap-2 p-2.5 rounded-[6px] bg-charcoal text-white"
          >
            <Input
              className={cn(
                "border-none bg-transparent pl-0 text-lg py-0 h-fit",
                {
                  "opacity-50": item.opacity === "half",
                  "opacity-100": item.opacity === "full",
                }
              )}
            />
          </FormField>
        ))}

        <div className="grid grid-cols-4 gap-[3px]">
          <p className="py-[22px] pl-2 px-10 rounded-l-[6px]">Birthday</p>

          <FormField
            form={form}
            name="birthday.year"
            label="Year"
            className="w-full z-20 py-2.5 px-2"
          >
            {(field) => (
              <BaseSelect
                type="auth"
                placeholder="Select year"
                width={329}
                onChange={(value) => field.onChange(value)}
                items={years}
                triggerClassName="w-full border-none text-white"
              />
            )}
          </FormField>

          <FormField
            form={form}
            name="birthday.month"
            label="Month"
            className="w-full z-20 py-2.5 px-2"
          >
            {(field) => (
              <BaseSelect
                type="auth"
                placeholder="Select month."
                width={329}
                onChange={(value) => field.onChange(value)}
                items={months}
                triggerClassName="w-full border-none text-white"
              />
            )}
          </FormField>

          <FormField
            form={form}
            name="birthday.day"
            label="Day"
            className="w-full z-20 py-2.5 px-2 rounded-r-[6px]"
          >
            {(field) => (
              <BaseSelect
                type="auth"
                placeholder="Select day."
                width={329}
                onChange={(value) => field.onChange(value)}
                items={days}
                triggerClassName="w-full border-none text-white"
              />
            )}
          </FormField>
        </div>

        {profile_form.slice(5).map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            label={item.label}
            form={form}
            className="flex flex-col gap-2 p-2.5 rounded-[6px] bg-charcoal text-white"
          >
            <Input
              className={cn(
                "border-none bg-transparent pl-0 text-lg py-0 h-fit",
                {
                  "opacity-50": item.opacity === "half",
                  "opacity-100": item.opacity === "full",
                }
              )}
            />
          </FormField>
        ))}

        <Button className="w-full mt-[15px] font-sf-pro-text text-xl font-bold bg-deep-red hover:bg-deep-red/80 h-[69px]">
          Save
        </Button>
      </FormBase>
    </div>
  );
}

const years = Array.from({ length: 100 }, (_, i) => {
  const year = `${new Date().getFullYear() - i}`;
  return { value: year, label: year };
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((month) => ({
  value: month,
  label: month,
}));

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const profile_form: IProfileForm[] = [
  { name: "first_name", label: "First Name", opacity: "full" },
  { name: "last_name", label: "Last Name", opacity: "full" },
  { name: "email", label: "Email", opacity: "half" },
  { name: "password", label: "Password", opacity: "half" },
  { name: "gender", label: "Gender", opacity: "full" },
  { name: "country", label: "Country", opacity: "full" },
  { name: "state", label: "State", opacity: "full" },
  { name: "phone", label: "Phone", opacity: "full" },
];

type ProfileFormFields = z.infer<typeof formSchema>;

interface IProfileForm {
  name: keyof ProfileFormFields;
  label: string;
  opacity: "half" | "full";
}
