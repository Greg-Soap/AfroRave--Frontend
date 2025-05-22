import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { AddFilterBUtton } from "@/pages/standalone/components/add-filter-btn";
import { Download } from "lucide-react";

export function IndividualHeader({ name }: { name: string }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between bg-white h-14 px-8 border-l border-light-gray">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="py-0.5 px-1.5 hover:bg-black/10"
        >
          <ChevronLeft color="#000000" size={16} />
        </Button>

        <span className="font-medium text-xs font-sf-pro-rounded text-black">
          {name}
        </span>

        <AddFilterBUtton />
      </div>

      <div className="flex items-center gap-8">
        <Button
          variant="ghost"
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
      </div>
    </div>
  );
}
