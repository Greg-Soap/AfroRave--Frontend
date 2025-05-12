import { AddFilterBUtton } from "@/pages/standalone/components/add-filter-btn";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export function VendorHeader({
  type = "revenue",
}: {
  type?: "service" | "revenue";
}) {
  return (
    <div className="w-full flex items-center justify-between bg-white h-14 px-8 border-l border-light-gray">
      <AddFilterBUtton />

      <div className="flex items-center gap-8">
        <Button
          variant="ghost"
          disabled={type === "revenue"}
          className="gap-1 py-0.5 px-1.5 hover:bg-black/10"
        >
          <Download color="#000000" size={16} />
          <span className="font-medium text-xs font-sf-pro-rounded text-black">
            Download
          </span>
        </Button>

        <Button
          variant="ghost"
          className="gap-2 py-0.5 px-1.5 hover:bg-black/10"
        >
          <span className="font-medium text-xs font-sf-pro-rounded text-black">
            Blackmarket Flea
          </span>
          <img
            src="/assets/dashboard/creator/live.png"
            alt="Chevron Down"
            width={20}
            height={18}
          />
        </Button>

        <Button variant="destructive" className="p-3 rounded-[6px] gap-8">
          <Plus color="#ffffff" size={12} />
          <span className="font-sf-pro-text text-xs">
            Add {type === "revenue" ? "Slot" : "Offer"}
          </span>
        </Button>
      </div>
    </div>
  );
}
