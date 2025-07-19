import { FormBase, FormField } from "@/components/reusable";
import { BaseSelect } from "@/components/reusable";
import type { ICustomSelectProps } from "@/components/reusable/base-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/use-auth";
import { africanCountryCodes } from "@/pages/creators/add-event/constant";
import type { UserRegisterData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HTMLInputTypeAttribute } from "react";
import {
  type FieldValues,
  type Path,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

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
  phone_number: z.string(),
  country_code: z.string(),
  business_name: z.string(),
  web_url: z.string(),
  gender: z.string(),
});

export function VendorSignUp() {
  const registerUser = useRegisterUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      country: "",
      email: "",
      password: "",
      phone_number: "",
      country_code: "",
      business_name: "",
      web_url: "",
      gender: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Transform form data to match API structure
    const userData: UserRegisterData = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      telphone: "", // This field is required by API but not in current form
      gender: "", // This field is required by API but not in current form
      dateOfBirth: "", // This field is required by API but not in current form
      country: values.country,
      state: "", // This field is required by API but not in current form
      password: values.password,
    };

    registerUser.mutate(userData);
  }

  return (
    <div className="relative flex justify-center">
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className="w-[415px] h-fit rounded-[12px] space-y-5 bg-red px-7 py-4 md:px-5 md:py-12 z-10 font-sf-pro-text"
      >
        <div className="flex flex-col gap-2 font-sf-pro-display">
          <p className="uppercase text-2xl font-black text-white">
            own the spotlight
          </p>
          <p className="uppercase text-xs font-light">tell us about you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 gap-y-6">
          <InputField form={form} name="first_name" placeholder="FIRST NAME" />
          <InputField form={form} name="last_name" placeholder="LAST NAME" />
        </div>

        <div className="flex gap-2">
          <SelectField
            form={form}
            name="country_code"
            items={africanCountryCodes}
            className="w-24"
            width={96}
          />

          <InputField
            form={form}
            name="phone_number"
            placeholder="PHONE NUMBER"
          />
        </div>
        <SelectField
          form={form}
          name="gender"
          items={africanCountryCodes}
          className="w-full"
        />
        <InputField
          form={form}
          name="business_name"
          placeholder="BUSINESS NAME"
        />
        <InputField form={form} name="web_url" placeholder="WEB URL" />
        <InputField form={form} name="email" placeholder="EMAIL ADDRESS" />
        <InputField
          form={form}
          name="password"
          placeholder="PASSWORD"
          type="password"
        />

        <Button
          type="submit"
          className="max-w-[239px] w-full h-10 bg-white text-sm ofont-semibold font-semibold font-sf-pro-text"
          disabled={registerUser.isPending}
        >
          {registerUser.isPending ? "Signing Up..." : "Continue"}
        </Button>
      </FormBase>
    </div>
  );
}

function InputField<T extends FieldValues>({
  form,
  name,
  type = "text",
}: InputField<T>) {
  return (
    <FormField form={form} name={name} className="w-full">
      <Input
        type={type}
        className="w-full h-14 rounded-[6px] border border-white py-6 px-3 font-sf-pro-text text-[10px] font-light uppercase"
        placeholder="Enter your first name."
      />
    </FormField>
  );
}

function SelectField<T extends FieldValues>({
  form,
  name,
  width,
  className,
  items,
}: ISelectField<T>) {
  return (
    <FormField form={form} name={name} className={className}>
      {(field) => (
        <BaseSelect
          type="auth"
          placeholder="Country Code"
          width={width}
          value={field.value}
          onChange={(value) => field.onChange(value)}
          items={items}
          triggerClassName="!w-full !h-14 py-6 px-3 border border-white rounded-[6px]"
        />
      )}
    </FormField>
  );
}

interface InputField<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}

interface ISelectField<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  width?: number;
  className?: string;
  items: ICustomSelectProps["items"];
}
