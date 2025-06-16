import type { FieldValues } from "react-hook-form";
import {
  type FormFieldProps,
  FormField as BaseFormField,
} from "../reusable/base-form";
import { Input as ShadcnInput, type InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

export function CustomFormField<T extends FieldValues>({
  name,
  children,
  form,
  label,
  className,
}: FormFieldProps<T>) {
  return (
    <BaseFormField
      form={form}
      name={name}
      label={label}
      className={cn(
        "w-full flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text",
        className
      )}
    >
      {children}
    </BaseFormField>
  );
}

export function CustomInput({
  placeholder,
  className,
  ...props
}: { placeholder?: string; className?: string } & Omit<InputProps, "ref">) {
  return (
    <ShadcnInput
      placeholder={placeholder}
      className={cn(
        "w-full h-10 text-black px-3 py-[11px] rounded-[4px] bg-white border border-mid-dark-gray/50 text-sm font-sf-pro-display",
        className
      )}
      {...props}
    />
  );
}
