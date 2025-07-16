import { Link } from "react-router-dom";
import { getRoutePath } from "@/config/get-route-path";
import type { IEvents } from "@/data/events";

export function Tickets({
  id,
  image,
  event_name,
  event_location,
  event_date,
}: ITickets) {
  return (
    <Link
      key={id}
      to={getRoutePath("active_tickets", { eventId: id })}
      className="w-[232px] flex flex-col gap-[3px] px-2 py-[5px] rounded-[5px]"
    >
      <div className="w-fit h-fit relative">
        <img
          src={image}
          alt={event_name}
          className="w-[217px] h-[282px] rounded-[10px]"
        />

        <span className="absolute w-6 h-[18px] top-1.5 right-1 bg-medium-gray/80 font-sf-pro-rounded text-[10px] text-center rounded-[10px]">
          3
        </span>
      </div>

      <div className="w-full flex flex-col gap-[3px]">
        <p className="max-w-full font-phosphate text-[15px] tracking-[-0.25px] text-wrap uppercase">
          {event_name}
        </p>
        <div className="flex flex-col gap-[3px]">
          <p className="text-xs font-extralight font-sf-pro-display">
            {event_location}
          </p>
          <p className="text-xs font-extralight font-sf-pro-rounded">
            {event_date}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface ITickets {
  id: IEvents["id"];
  event_name: IEvents["event_name"];
  image: IEvents["image"];
  event_location: IEvents["event_location"];
  event_date: IEvents["event_location"];
}
