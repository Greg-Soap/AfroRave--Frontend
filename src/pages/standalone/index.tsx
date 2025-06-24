import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNaira } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { AddFilterBUtton } from "./components/add-filter-btn";
import { Badge } from "@/components/ui/badge";
import { getRoutePath } from "@/config/get-route-path";
import StandAloneModal from "./components/standalone-modal";

export default function StandalonePage() {
  return (
    <section className="w-full h-full flex flex-col items-center gap-24 mb-[200px]">
      <StandAloneHeader />

      <div className="max-w-[836px] w-full flex flex-wrap gap-7">
        {standalone_events.map((item) => (
          <StandAloneEvents key={item.id} {...item} />
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

        <Button
          variant="destructive"
          className="p-3 rounded-[6px] gap-8"
          asChild
        >
          <Link to={getRoutePath("add_event")}>
            <Plus color="#ffffff" size={12} />
            <span className="font-sf-pro-text text-xs">Add Event</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

function StandAloneEvents({
  id,
  image,
  name,
  sold,
  net_profit,
  status,
}: IStandaloneEventProps) {
  return (
    <div className="w-[260px] h-fit flex flex-col shadow-xl">
      <Link
        to={`/events/${id}`}
        className="relative flex flex-col items-start justify-end h-[172px] group overflow-hidden"
      >
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full absolute group-hover:scale-105 transition-all duration-300",
            {
              "grayscale-100": status === "ended",
            }
          )}
        />

        <img
          src="/assets/dashboard/creator/link.png"
          alt="Link"
          width={10}
          height={10}
          className="absolute top-1 right-1 z-10"
        />

        {status && (
          <Badge
            className={cn(
              "py-1.5 px-2 rounded-full text-xs font-black text-white font-sf-pro-text absolute top-1 left-1 z-10 uppercase",
              {
                "bg-tech-blue": status === "drafts",
                "bg-deep-red": status === "ended",
              }
            )}
          >
            {status}
          </Badge>
        )}

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300" />

        <p className="capitalize font-sf-pro-text font-medium text-sm z-10 px-1">
          blackmarket flea
        </p>
        <p className="text-[10px] font-sf-pro-display z-10 px-1 mb-1">
          Fri, 6th October, 2025
        </p>
      </Link>
      <div className="flex items-center gap-6 px-[26px] py-4 bg-white">
        <p className="font-sf-pro-rounded text-xs text-mid-dark-gray">
          Sold: <span className="text-black font-medium">{sold.unit}</span> /{" "}
          {sold.total}
        </p>

        <p className="font-sf-pro-rounded text-xs text-mid-dark-gray">
          Net Profit:{" "}
          <span className="text-black font-medium">
            {formatNaira(net_profit)}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-3 border-t border-t-semi-light-gray/28 h-fit bg-white">
        {event_buttons.map((item) => (
          <EventButtons key={item.alt} {...item} className="border-r" />
        ))}

        <StandAloneModal id={id} />
      </div>
    </div>
  );
}

function EventButtons({
  icon,
  alt,
  className,
  action,
}: {
  icon: string;
  alt: string;
  className?: string;
  action?: () => void;
}) {
  return (
    <Button
      onClick={action}
      variant="ghost"
      className={cn(
        "flex items-center justify-center hover:bg-black/10 rounded-none border-r-semi-light-gray/28",
        className
      )}
    >
      <img src={icon} alt={alt} width={12} height={10} />
    </Button>
  );
}

const event_buttons: IEventButtons[] = [
  { icon: "/assets/dashboard/creator/chart2.png", alt: "Chart" },
  {
    icon: "/assets/dashboard/creator/group-user.png",
    alt: "Group User",
  },
];

const standalone_events: IStandaloneEventProps[] = [
  {
    id: 1,
    image: "/assets/landing-page/s1.png",
    name: "Punk fest, unleash your inner rebel",
    status: "drafts",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 2,
    image: "/assets/landing-page/s2.png",
    name: "Punk fest, unleash your inner rebel",
    status: "ended",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 3,
    image: "/assets/landing-page/s1.png",
    name: "Punk fest, unleash your inner rebel",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 4,
    image: "/assets/landing-page/s1.png",
    name: "Punk fest, unleash your inner rebel",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 5,
    image: "/assets/landing-page/s1.png",
    name: "Punk fest, unleash your inner rebel",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 6,
    image: "/assets/landing-page/s1.png",
    name: "Punk fest, unleash your inner rebel",
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
];

interface IStandaloneEventProps {
  id: number;
  image: string;
  name: string;
  status?: "drafts" | "ended";
  sold: { unit: number; total: number };
  net_profit: number;
}

interface IEventButtons {
  icon: string;
  alt: string;
}
