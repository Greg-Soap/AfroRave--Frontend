import type { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { BaseDatePicker } from "../reusable/base-date-picker";
import { FormField } from "../reusable";
import { TimeForm } from "./time-form";

export function DateForm<T extends FieldValues>({
  name,
  form,
  input_name,
  hour_name,
  period_name,
  minute_name,
}: IDateFormProps<T>) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="w-fit text-xs text-black font-sf-pro-text">{name}</p>
      <div className="w-full md:w-[448px] flex flex-col md:flex-row md:items-center gap-y-3.5 gap-x-2 md:justify-between">
        <FormField
          form={form}
          name={input_name}
          className="w-full md:w-[316px] flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <BaseDatePicker
              value={field.value as Date}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="w-full min-h-10 bg-white border-mid-dark-gray/50 rounded-[4px] hover:bg-black/10 font-sf-pro-display"
            />
          )}
        </FormField>

        <TimeForm
          form={form}
          hour_name={hour_name}
          period_name={period_name}
          minute_name={minute_name}
        />
      </div>
    </div>
  );
}

interface IDateFormProps<T extends FieldValues> {
  name: string;
  input_name: Path<T>;
  form: UseFormReturn<T>;
  hour_name: Path<T>;
  minute_name: Path<T>;
  period_name: Path<T>;
}
