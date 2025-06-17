import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddBtn({
  name,
  onClick,
  custom = false,
}: {
  name: string;
  onClick: () => void;
  custom?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className="text-deep-red flex items-center gap-2 text-xs font-sf-pro-text w-fit hover:bg-black/20 hover:text-deep-red uppercase"
      onClick={onClick}
    >
      <Plus /> {!custom ? `add ${name}` : name}
    </Button>
  );
}
