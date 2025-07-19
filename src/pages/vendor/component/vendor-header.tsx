import { AddFilterBUtton } from "@/pages/creators/standalone/components/add-filter-btn";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import VendorSelect from "@/components/custom/vendor-select";

export function VendorHeader({
  type = "revenue",
}: {
  type?: "service" | "revenue" | "access-control";
}) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between bg-white h-36 md:h-14 px-8 border-l border-light-gray">
      <AddFilterBUtton />

      <div className="flex items-center gap-2 md:gap-8">
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

        <VendorSelect />

        <Button variant="destructive" className="p-3 rounded-[6px] gap-8">
          <Plus color="#ffffff" size={12} />
          <span className="font-sf-pro-text text-xs">
            Add {RenderText(type)}
          </span>
        </Button>
      </div>
    </div>
  );
}

function RenderText(text: "service" | "revenue" | "access-control") {
  if (text === "revenue") return "Slot";
  if (text === "service") return "Offer";
  if (text === "access-control") return "Staff";
}
