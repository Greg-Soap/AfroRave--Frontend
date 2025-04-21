import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomSelect({
  width = 165,
  defaultValue,
  placeholder,
  items,
}: ICustomSelectProps) {
  return (
    <Select>
      <SelectTrigger
        defaultValue={defaultValue ?? defaultValue}
        className={`!min-w-[${width}px] h-[50px] font-input-mono rounded-[3px] border border-white bg-transparent data-[state=open]:bg-[#494747] data-[state=open]:border-none`}
      >
        <SelectValue
          placeholder={placeholder}
          className="font-light font-input-mono"
        />
      </SelectTrigger>
      <SelectContent className="bg-[#494747] border-none flex flex-col">
        {items.map((item) => (
          <SelectItem
            key={item.label}
            value={item.value}
            className="font-input-mono font-light text-white hover:!text-white hover:!bg-white/10 border-b border-white last:border-none rounded-none data-[highlighted]:!bg-white/20 data-[highlighted]:!text-white"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export interface ICustomSelectProps {
  width?: number;
  defaultValue?: string;
  placeholder: string;
  items: { value: string; label: string }[];
}
