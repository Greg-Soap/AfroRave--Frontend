import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

export function BaseBooleanCheckbox({
  data,
  value,
  onChange,
  labelClassName,
  descriptionClassName,
  defaultChecked,
  orientation = "horizontal",
}: {
  data: IBaseCheckbox;
  labelClassName?: string;
  descriptionClassName?: string;
  defaultChecked?: boolean;
  orientation?: "horizontal" | "vertical";
} & Partial<ControllerRenderProps>) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-start gap-2">
        <div
          className={cn("flex", {
            "flex-col gap-5": orientation === "vertical",
            "flex-row items-center gap-3": orientation === "horizontal",
          })}
        >
          {data.items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Checkbox
                  defaultChecked={defaultChecked ? defaultChecked : false}
                  name={item.id}
                  checked={value}
                  onCheckedChange={(checked) => {
                    onChange?.(checked === true);
                  }}
                  className="size-4"
                />

                <Label
                  htmlFor={item.id}
                  className={cn(
                    "text-sm uppercase font-sf-pro-text",
                    labelClassName
                  )}
                >
                  {item.label}
                </Label>
              </div>
              {item.description && (
                <p className="text-xs font-light font-sf-pro-display">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {data.description && (
          <p
            className={cn(
              "text-xs font-light font-sf-pro-display",
              descriptionClassName
            )}
          >
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
}

export interface IBaseCheckbox {
  description?: string;
  items: { label: string; id: string; description?: string }[];
}
