import { FormBase, FormField } from "@/components/reusable";
import {
  type FieldValues,
  type Path,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";
import { contactUsSchema, defaultContactUsValue } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/reusable";
import { africanCountries } from "@/components/constants";

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: defaultContactUsValue,
  });

  function onSubmit(data: z.infer<typeof contactUsSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full flex flex-col items-center">

    <FormBase
      form={form}
      onSubmit={onSubmit}
      className="max-w-[502px] w-full mt-20 py-[120px] flex flex-col items-center gap-6 max-md:px-5"
    >
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-white text-2xl font-sf-pro-display">Contact Us</p>

        <InputField form={form} name="firstname" label="First Name" />
        <InputField form={form} name="lastname" label="Last Name" />
        <InputField form={form} name="email" label="Email" />
        <FormField
          form={form}
          name="country"
          className="w-full border border-white rounded-[5px] py-2 px-3 h-fit"
          label="Country"
        >
          {(field) => (
            <BaseSelect
              placeholder="e.g NIgeria"
              {...field}
              items={africanCountries}
              triggerClassName="w-full px-0 border-none placeholder:text-white shadow-none"
            />
          )}
        </FormField>
        <FormField form={form} name="message" className="w-full">
          <Textarea
            className="h-[240px] p-3 border border-white rounded-[5px] text-white placeholder:text-white"
            placeholder="How can we help you"
          />
        </FormField>
      </div>
      <Button className="max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px]">
        Submit
      </Button>
    </FormBase>
    </div>
  );
}

function InputField<T extends FieldValues>({
  form,
  name,
  label,
}: InputField<T>) {
  return (
    <FormField
      form={form}
      name={name}
      label={label}
      className="w-full border border-white rounded-[5px] py-2 px-3 h-[60px]"
    >
      <Input className="w-full px-0 border-none" />
    </FormField>
  );
}

interface InputField<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}
