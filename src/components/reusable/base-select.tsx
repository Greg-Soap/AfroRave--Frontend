import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function BaseSelect({
  type = "others",
  width = 165,
  defaultValue,
  placeholder,
  items,
}: ICustomSelectProps) {
  return (
    <Select>
      <SelectTrigger
        defaultValue={defaultValue ?? defaultValue}
        className={cn(
          `!max-w-[${width}px] w-full border bg-transparent z-[9999]`,
          {
            "border-[#1E1E1E] h-[35px] font-sf-pro-text rounded-[4px] text-black":
              type === "auth",
            "border-white h-[50px] data-[state=open]:bg-[#494747] data-[state=open]:border-none font-input-mono rounded-[3px]":
              type === "others",
          }
        )}
      >
        <SelectValue
          placeholder={placeholder}
          className={cn("leading-normal", {
            "font-light font-input-mono": type === "others",
            "font-normal font-sf-pro-text": type === "auth",
          })}
        />
      </SelectTrigger>
      <SelectContent
        className={cn("flex flex-col z-[9999]", {
          "bg-[#494747] border-none": type === "others",
          "border-[#1E1E1E]": type === "auth",
        })}
      >
        {items.map((item) => (
          <SelectItem
            key={item.label}
            value={item.value}
            className={cn("border-b last:border-none rounded-none", {
              "font-input-mono font-light text-white hover:!text-white hover:!bg-white/10 data-[highlighted]:!bg-white/20 data-[highlighted]:!text-white border-white":
                type === "others",
              "font-sf-pro-text text-black hover:!text-black hover:!bg-black/10 data-[highlighted]:!bg-black/20 data-[highlighted]:!black-white border-black":
                type === "auth",
            })}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export interface ICustomSelectProps {
  type?: "auth" | "others";
  width?: number;
  defaultValue?: string;
  placeholder: string;
  items: { value: string; label: string }[];
}
