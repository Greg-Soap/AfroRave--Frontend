import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function VendorSelect() {
  const [value, setValue] = useState("afro-fest");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="flex items-center gap-[9px] !w-[122px] !h-8 text-xs text-white uppercase font-sf-pro-display font-semibold bg-black border-none outline-none shadow-none [&>svg]:hidden [&>span]:text-white [&>span]:opacity-100">
        <SelectValue />
        <div>
          <ChevronDown color="#ffffff" size={12} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="afro-fest">Afro Fest</SelectItem>
        <SelectItem value="afro-nation">Afro Nation</SelectItem>
        <SelectItem value="afro-beats">Afro Beats</SelectItem>
      </SelectContent>
    </Select>
  );
}
