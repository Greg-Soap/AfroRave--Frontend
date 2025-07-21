import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export default function VendorSelect() {
  return (
    <Select>
      <SelectTrigger className="flex items-center gap-[9px] !w-[122px] !h-8 text-xs text-white uppercase font-sf-pro-display bg-black border-none outline-none shadow-none placeholder:text-white [&>svg]:hidden">
        <SelectValue placeholder="Afro fest" className="text-white" />
        <div>
          <ChevronDown color="#ffffff" size={12} />
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
