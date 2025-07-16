import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

export function QuantityIncreaseBtn({ action }: { action: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={action}
      className="w-8 p-0 hover:bg-black/10 h-1/2 border-b border-black rounded-none px-0"
    >
      <ChevronUp className="h-3 w-1.5" color="#000000" />
    </Button>
  );
}

export function QuantityDecreaseButton({ action }: { action: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={action}
      className="h-1/2 w-8 p-0 hover:bg-black/10"
    >
      <ChevronDown className="h-3 w-1.5" color="#000000" />
    </Button>
  );
}
