import { Link } from "react-router-dom";
import { getRoutePath } from "@/config/get-route-path";
import type { IEvents } from "@/data/events";

export function Tickets({ id, image, event_name }: ITickets) {
  return (
    <Link
      key={id}
      to={getRoutePath("active_tickets", { eventId: id })}
      className="w-[200px] h-[306px] flex flex-col gap-3 rounded-[5px]"
    >
      <div className="w-fit h-fit relative">
        <img
          src={image}
          alt={event_name}
          className="w-full h-[256px] rounded-[10px]"
        />

        <span className="absolute size-6 top-1.5 right-1 bg-white text-black text-sm font-semibold font-sf-pro-rounded flex items-center justify-center rounded-full">
          3
        </span>
      </div>

      <p className="max-w-full font-sf-pro-display font-extrabold tracking-[-0.25px] text-wrap uppercase">
        {event_name}
      </p>
    </Link>
  );
}

interface ITickets {
  id: IEvents["id"];
  event_name: IEvents["event_name"];
  image: IEvents["image"];
}
