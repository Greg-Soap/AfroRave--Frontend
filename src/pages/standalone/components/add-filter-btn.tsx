import { Button } from "@/components/ui/button";

export function AddFilterBUtton() {
  return (
    <Button variant="ghost" className="gap-2 p-2.5 hover:bg-black/10">
      <img
        src="/assets/dashboard/creator/filter.png"
        alt="Filter"
        width={20}
        height={18}
      />
      <span className="font-medium text-xs font-sf-pro-rounded text-black">
        Add Filter
      </span>
    </Button>
  );
}
