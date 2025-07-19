import type { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { FormField } from "../reusable";
import { Button } from "../ui/button";
import { Clock, ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
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
    <div className="relative h-10 flex flex-row gap-1 items-center">
      <div className="h-10 flex items-center bg-white justify-between border border-mid-dark-gray/50 w-full rounded-l-[4px] px-3 py-2">
        <Clock className="h-[18px] min-w-4 mr-2 text-muted-foreground" />

        <FormField
          form={form}
          name={hour_name}
          className="w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text"
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
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
              type="number"
              {...field}
              maxLength={2}
              className="w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0"
            />
          )}
        </FormField>
      </div>

      <div className="ml-auto flex flex-col items-center justify-center">
        <ToggleBtn action={togglePeriod} Icon={ChevronUp} />

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

        <ToggleBtn action={togglePeriod} Icon={ChevronDown} />
      </div>
    </div>
  );
}

function ToggleBtn({ action, Icon }: { action: () => void; Icon: LucideIcon }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={action}
      className="h-3 w-8 p-0 hover:bg-black/10"
    >
      <Icon className="h-3 w-1.5" color="#000000" />
    </Button>
  );
}

interface ITimeFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  hour_name: Path<T>;
  minute_name: Path<T>;
  period_name: Path<T>;
}
