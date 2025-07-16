import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { events } from "@/data/events";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function IndividualActiveTicketsPage() {
  const { eventId } = useParams();
  const event = events.find((item) => item.id === Number(eventId));
  const navigate = useNavigate();

  if (!event) {
    return <p>No Events Found</p>;
  }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-[58px] mt-[124px] mb-[275px]">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="ml-[50px] self-start w-fit hover:bg-white/10"
      >
        <ChevronLeft color="#ffffff" className="w-[14px] h-[30px]" />
      </Button>

      <div className="flex flex-col gap-[50px]">
        <div className="flex gap-[25px]">
          <div className="w-fit h-fit relative">
            <img
              src={event.image}
              alt={event.image}
              className="w-[217px] h-[282px] rounded-[10px]"
            />

            <span className="absolute w-6 h-[18px] top-1.5 right-1 bg-medium-gray/80 font-sf-pro-rounded text-[10px] text-center rounded-[10px]">
              3
            </span>
          </div>

          <div className="flex flex-col gap-[66px]">
            <div className="flex flex-col">
              <p className="uppercase text-4xl font-phosphate tracking-[-0.25px]">
                {event.event_name}
              </p>
              <div className="flex flex-col gap-[3px] text-xs font-extralight">
                <p className="font-sf-pro-display">{event.event_location}</p>
                <p className="font-sf-pro-rounded">{event.event_location}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <p className="uppercase font-phosphate text-[15px]">
                Your Orders
              </p>

              <div className="flex py-[18px] px-[13px] gap-2.5">
                {event.tickets.map((item, index) => (
                  <OrderCards key={item.name} name={item.name} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <OtherActions />
      </div>
    </section>
  );
}

function OrderCards({ name, index }: { name: string; index: number }) {
  return (
    <div
      className={cn(
        "relative w-[117px] h-[74px] flex flex-col gap-1 pt-3 px-[7px] rounded-[10px] border-white",
        { "bg-white": index === 0, "bg-transparent border": index !== 0 }
      )}
    >
      <span className="absolute w-3.5 h-[18px] top-[5px] right-[7px] bg-medium-gray/48 font-sf-pro-rounded text-[10px] text-center rounded-[10px]">
        3
      </span>

      <div
        className={cn("flex flex-col font-sf-pro-rounded font-semibold", {
          "text-black": index === 0,
          "text-white": index !== 0,
        })}
      >
        <p className="text-[8px]">{name}</p>
        <p className="text-[5px] opacity-60">05:40PM </p>
      </div>

      <p
        className={cn(
          "w-[53px] text-[8px] flex flex-col font-sf-pro-rounded font-bold",
          {
            "text-black/59": index === 0,
            "text-white/60": index !== 0,
          }
        )}
      >
        Order ID: SKB1F63
      </p>

      <Link
        to="/"
        className={cn("font-sf-pro-display text-[6px] self-center ", {
          "text-black underline": index === 0,
          "text-white": index !== 0,
        })}
      >
        View Order
      </Link>
    </div>
  );
}

function OtherActions() {
  return (
    <div className="flex gap-3.5 py-3.5 px-[13px] font-sf-pro-rounded ">
      {actions.map((item) => (
        <Link
          key={item.name}
          to="#"
          className="w-[157px] h-[74px] flex flex-col gap-1 py-[15px] px-[13px] bg-medium-gray rounded-[10px]"
        >
          <img src={item.icon} alt={item.name} className="size-4" />
          <p className="font-bold text-xs">{item.name}</p>
          <p className="text-[9px]">{item.description}</p>
        </Link>
      ))}
    </div>
  );
}

const actions = [
  {
    icon: "/assets/dashboard/sell.png",
    name: "SELL",
    description: "Sell tickets at your own price",
  },
  {
    icon: "/assets/dashboard/transfer.png",
    name: "TRANSFER",
    description: "Send tickets and items to anyone",
  },
  {
    icon: "/assets/dashboard/upgrade.png",
    name: "UPGRADE",
    description: "View available upgrade offers",
  },
];
