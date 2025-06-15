import type { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { FormField } from "../reusable";
import { Button } from "../ui/button";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "../ui/input";

export function TimeForm<T extends FieldValues>({
  form,
  hour_name,
  minute_name,
  period_name,
}: ITimeFormProps<T>) {
  const togglePeriod = () => {
    const currentPeriod = form.getValues(period_name);
    const newPeriod = currentPeriod === "AM" ? "PM" : "AM";
    form.setValue(period_name, newPeriod as any);
  };

  return (
    <div className="relative w-full h-10 flex gap-1 items-center">
      <div className="h-10 flex items-center bg-white justify-between border border-mid-dark-gray/50 w-full rounded-l-[4px] px-3 py-2">
        <Clock className="h-[18px] min-w-4 mr-2 text-muted-foreground" />

        <FormField
          form={form}
          name={hour_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0 text-black px-3 py-[11px] rounded-[4px] bg-white text-sm font-sf-pro-display"
            />
          )}
        </FormField>

        <span className="px-1 text-black">:</span>

        <FormField
          form={form}
          name={minute_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>
      </div>

      <div className="ml-auto flex flex-col items-center justify-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePeriod}
          className="h-3 w-8 p-0 hover:bg-black/10"
        >
          <ChevronUp className="h-3 w-1.5" color="#000000" />
        </Button>

        <FormField
          form={form}
          name={period_name}
          className="border border-mid-dark-gray/50 rounded-r-[4px] w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              {...field}
              readOnly
              maxLength={2}
              className="w-10 text-center text-xs font-bold border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={togglePeriod}
          className="h-3 w-8 p-0 hover:bg-black/10"
        >
          <ChevronDown className="h-3 w-1.5" color="#000000" />
        </Button>
      </div>
    </div>
  );
}

interface ITimeFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  hour_name: Path<T>;
  minute_name: Path<T>;
  period_name: Path<T>;
}
