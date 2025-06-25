import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleChevronDown } from "lucide-react";

export default function VendorSelect() {
  return (
    <Select>
      <SelectTrigger className="dlex items-center gap-[9px] max-w-[180px] text-xs text-black font-sf-pro-display border-none outline-none bg-transparent shadow-none placeholder:text-black [&>svg]:hidden">
        <SelectValue placeholder="Afro fest" />

        <div>
          <CircleChevronDown color="#000000" size={16} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
