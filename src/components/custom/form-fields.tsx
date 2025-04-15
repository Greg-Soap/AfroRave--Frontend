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
  name,
  label,
  placeholder,
  form,
  className = "",
  submitButton,
}: {
  name: Path<T>;
  label: string;
  placeholder: string;
  form: UseFormReturn<T>;
  className?: string;
  submitButton?: React.ReactElement;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`text-xl font-[275] ${className}`}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-5">
              <Input
                placeholder={placeholder}
                {...field}
                className="max-w-[321px] h-[43px] rounded-[4px] text-[15px] font-light text-primary-foreground"
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
