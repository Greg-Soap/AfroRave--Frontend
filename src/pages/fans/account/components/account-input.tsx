import { FormField } from "@/components/reusable";
import { Input } from "@/components/ui/input";
import type { HTMLInputTypeAttribute } from "react";
import type { FieldValues, UseFormReturn, Path } from "react-hook-form";

export function AccountInput<T extends FieldValues>({
  name,
  label,
  form,
  type = "text",
}: IAccountInputProps<T> & { form: UseFormReturn<T> }) {
  return (
    <FormField
      name={name}
      label={label}
      form={form}
      className="w-full flex flex-col gap-2.5 px-3 py-1 rounded-[5px] bg-transparent text-white font-sf-pro-display h-14"
    >
      <Input
        type={type}
        className="border-none bg-transparent pl-0 text-lg py-0 h-fit text-white"
      />
    </FormField>
  );
}

interface IAccountInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
}
