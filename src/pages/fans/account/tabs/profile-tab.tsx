import { Button } from "@/components/ui/button";
import { FormBase, FormField } from "@/components/reusable";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, type Path, useForm } from "react-hook-form";
import type { z } from "zod";
import { BaseSelect } from "@/components/reusable";
import { defaultProfileValues, ProfileSchema } from "@/schema/profile-shema";
import { date_list } from "@/components/constants";
import type { ICustomSelectProps } from "@/components/reusable/base-select";
import { AccountInput } from "../components/account-input";
import { africanCountryCodes } from "@/pages/creators/add-event/constant";

export default function ProfileTab() {
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultProfileValues,
  });

  function onSubmit(values: z.infer<typeof ProfileSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full md:w-[529px] flex flex-col gap-[30px] pb-[100px]">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-full flex flex-col items-center gap-6 font-input-mono"
      >
        {profile_form.slice(0, 5).map((item) => (
          <AccountInput
            key={item.name}
            form={form}
            name={item.name}
            label={item.label}
          />
        ))}

        {/**Birth day select form field */}
        <div className="grid grid-cols-4 gap-[3px]">
          <p className="py-[22px] pl-2 px-10 rounded-l-[6px] bg-transparent text-center font-sf-pro-display">
            Birthday
          </p>
          {select_fields.map((item) => (
            <FormField
              key={item.placeholder}
              form={form}
              name={item.name}
              label={item.label}
              className="w-full z-20 py-2.5 px-2 bg-transparent"
            >
              {(field) => (
                <BaseSelect
                  type="auth"
                  placeholder={item.placeholder}
                  width={329}
                  onChange={(value) => field.onChange(value)}
                  items={item.items}
                  triggerClassName="w-full border-none text-white"
                />
              )}
            </FormField>
          ))}
        </div>

        <div className="w-full flex items-end gap-1">
          <FormField form={form} name="number.country_code" className="h-10">
            {(field) => (
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label="Country Codes"
                placeholder="+123"
                items={africanCountryCodes}
                width={150}
                triggerClassName="h-10 w-24 rounded-none px-3 rounded-t-[5px] text-sm font-sf-pro-display !text-white border-none"
              />
            )}
          </FormField>

          {profile_form.slice(5).map((item) => (
            <AccountInput
              key={item.name}
              form={form}
              name={item.name}
              label={item.label}
              type="number"
            />
          ))}
        </div>

        <Button className="w-[200px] text-sm h-10 font-sf-pro-display font-normal bg-white text-deep-red hover:bg-white/80">
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

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const profile_form: IProfileForm[] = [
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "password", label: "Password" },
  { name: "gender", label: "Gender" },
  { name: "country", label: "Country" },
  { name: "state", label: "State" },
  { name: "number.digits", label: "Phone" },
];

const select_fields: ISelectProps<ProfileFormFields>[] = [
  {
    name: "birthday.year",
    placeholder: "Select year",
    label: "Year",
    items: years,
  },
  {
    name: "birthday.month",
    placeholder: "Select month",
    label: "Month",
    items: date_list.items,
  },
  {
    name: "birthday.day",
    placeholder: "Select day",
    label: "Day",
    items: days,
  },
];

type ProfileFormFields = z.infer<typeof ProfileSchema>;

interface IProfileForm {
  name: Path<ProfileFormFields>;
  label: string;
}

interface ISelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  items: ICustomSelectProps["items"];
}
