import type { UseFormReturn, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function InputTypeField<T extends object>({
  type = "text",
  name,
  label,
  placeholder,
  form,
  className = "",
  inputClassName = "",
  submitButton,
}: {
  type?: string;
  name: Path<T>;
  label: string;
  placeholder: string;
  form: UseFormReturn<T>;
  className?: string;
  inputClassName?: string;
  submitButton?: React.ReactElement;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full flex flex-col max-md:gap-2.5">
          <FormLabel className={`text-xl font-[275] ${className}`}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex max-md:flex-col md:items-center gap-5">
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                className={`md:max-w-[321px] h-[43px] rounded-[4px] text-[15px] font-light text-primary-foreground ${inputClassName}`}
              />

              {submitButton}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
