import { cn } from "@/lib/utils";
import type { IEvents } from "@/data/events";
import CartTrigger from "../_components/cart-trigger";

export default function EventDetailsSection({
  event,
  layout,
  totalQuantity,
  tickets,
  calculateTotalPrice,
}: ComponentProps) {
  return (
    <div
      className={cn(
        "relative w-full flex items-end justify-between px-5 lg:px-[120px]",
        {
          "mb-[220px]": layout === "no-flyer",
        }
      )}
    >
      <div className="flex flex-col gap-3">
        {layout !== "no-flyer" && (
          <img
            src={event.image}
            alt={event.event_name}
            className="w-[142px] h-[182px] md:w-[284px] md:h-[364px] rounded-[10px]"
          />
        )}

        <div className="flex flex-col gap-1">
          <p className="text-2xl md:text-[30px] lg:text-[30px] uppercase font-sf-compact tracking-[-0.25px] font-bold">
            {event.event_name}
          </p>

          <div className="flex flex-col gap-2 font-sf-pro-display font-light">
            <p className="text-lg md:text-2xl lg:text-xl">
              {event.event_location}
            </p>
            <p>{event.event_date}</p>
          </div>
        </div>
      </div>

      {layout === "carousel-with-flyer" && (
        <CartTrigger
          event={event}
          totalQuantity={totalQuantity}
          calculateTotalPrice={calculateTotalPrice}
          tickets={tickets}
          className="max-md:hidden py-6 px-4 rounded-t-[8px] bg-mid-dark-gray/50 absolute bottom-0 right-0 w-[562px]"
        />
      )}
    </div>
  );
}

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

interface IEventDetailsProp {
  layout: "default" | "no-flyer" | "carousel-with-flyer";
}

type ComponentProps =
  | {
      layout: "carousel-with-flyer";
      event: IEvents;
      totalQuantity: number;
      tickets: CartTicket[];
      calculateTotalPrice: () => number;
    }
  | {
      layout: Exclude<IEventDetailsProp["layout"], "carousel-with-flyer">;
      event: IEvents;
      totalQuantity?: never;
      tickets?: never;
      calculateTotalPrice?: never;
    };
