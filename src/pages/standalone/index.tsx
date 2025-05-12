import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNaira } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { AddFilterBUtton } from "./components/add-filter-btn";

export default function StandalonePage() {
  return (
    <section className="w-full h-full flex flex-col items-center gap-24 mb-[200px]">
      <StandAloneHeader />

      <div className="max-w-[836px] w-full flex flex-wrap gap-7">
        {Array.from({ length: 6 }).map((_, i) => (
          <StandAloneEvents key={i} />
        ))}
      </div>
    </section>
  );
}

function StandAloneHeader() {
  return (
    <div className="w-full flex items-center justify-between bg-white h-14 px-8 border-l border-light-gray">
      <AddFilterBUtton />

      <div className="flex items-center gap-8">
        <Button
          variant="ghost"
          className="gap-2 py-0.5 px-1.5 hover:bg-black/10"
        >
          <span className="font-medium text-xs font-sf-pro-rounded text-black">
            Live
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
          <span className="font-sf-pro-text text-xs">Add Event</span>
        </Button>
      </div>
    </div>
  );
}

function StandAloneEvents() {
  return (
    <div className="w-[260px] h-fit flex flex-col">
      <Link
        to="#"
        className="relative flex flex-col gap-1 items-start justify-end h-[172px] group overflow-hidden"
      >
        <img
          src="/assets/landing-page/s1.png"
          alt="Punk fest, unleash your inner rebel"
          className="w-full h-full absolute group-hover:scale-105 transition-all duration-300"
        />

        <img
          src="/assets/dashboard/creator/link.png"
          alt="Link"
          width={10}
          height={10}
          className="absolute top-1 right-1 z-10"
        />

        <div className="absolute inset-0 bg-black/40" />

        <p className="capitalize font-sf-pro-text font-medium text-xs z-10 px-1">
          blackmarket flea
        </p>
        <p className="text-[10px] font-sf-pro-display z-10 px-1 mb-1">
          Fri, 6th October, 2025
        </p>
      </Link>
      <div className="flex items-center gap-6 px-[26px] py-4 bg-white">
        <p className="font-sf-pro-rounded text-xs text-mid-dark-gray">
          Sold: <span className="text-black font-medium">1200</span> / 2000
        </p>

        <p className="font-sf-pro-rounded text-xs text-mid-dark-gray">
          Net Profit:{" "}
          <span className="text-black font-medium">{formatNaira(5.4)}M</span>
        </p>
      </div>
      <div className="grid grid-cols-3 border-t border-t-semi-light-gray/28 h-fit bg-white">
        {event_buttons.map((item, index) => (
          <Button
            key={item.icon}
            variant="ghost"
            className={cn(
              "flex items-center justify-center hover:bg-black/10 rounded-none",
              {
                "border-r border-r-semi-light-gray/28":
                  index === 0 || index === 1,
              }
            )}
          >
            <img src={item.icon} alt={item.alt} width={12} height={10} />
          </Button>
        ))}
      </div>
    </div>
  );
}

const event_buttons: IEventButtons[] = [
  { icon: "/assets/dashboard/creator/chart2.png", alt: "Chart", action: "" },
  {
    icon: "/assets/dashboard/creator/group-user.png",
    alt: "Group User",
    action: "",
  },
  {
    icon: "/assets/dashboard/creator/ellipses.png",
    alt: "Ellipses",
    action: "",
  },
];

interface IEventButtons {
  icon: string;
  alt: string;
  action: string; // a placeholder
}
