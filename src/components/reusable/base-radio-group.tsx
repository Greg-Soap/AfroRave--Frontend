import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { ControllerRenderProps } from "react-hook-form";

export function BaseRadioGroup({
  data,
  value,
  onChange,
}: {
  data: IRadioGroupProps[];
} & Partial<ControllerRenderProps>) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid md:grid-cols-2 gap-6"
    >
      {data.map((item) => (
        <div key={item.value} className="w-full flex items-center">
          <RadioGroupItem
            value={item.value}
            id={item.value}
            className="hidden"
          />
          <Label
            htmlFor={item.value}
            className={cn(
              "rounded-[10px] transition-colors duration-150 p-0.5",
              {
                "border border-primary hover:border-primary":
                  value === item.value,
                "border border-border hover:border-primary":
                  value !== item.value,
              }
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-auto max-h-[456px] rounded-[10px]"
            />
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export interface IRadioGroupProps {
  value: string;
  src: string;
  alt: string;
}
