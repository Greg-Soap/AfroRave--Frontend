import { getRoutePath } from "@/config/get-route-path";
import { events } from "@/data/events";
import { EmptyState } from "@/pages/fans/my-tickets/components/empty-state";
import { Tickets } from "@/pages/fans/my-tickets/components/tickets";

export default function SoldTicketsTab() {
  const isEmpty = false;

  return (
    <>
      {isEmpty ? (
        <EmptyState
          type="sold"
          btn_name="Resell Tickets"
          path={getRoutePath("resale")}
        />
      ) : (
        <SoldTickets />
      )}
    </>
  );
}

function SoldTickets() {
  return (
    <div className="flex flex-wrap items-center gap-7 px-[100px] mb-[499px]">
      {events.map(({ event_name, image, id, event_location, event_date }) => (
        <Tickets
          key={id}
          id={id}
          event_name={event_name}
          event_date={event_date}
          image={image}
          event_location={event_location}
        />
      ))}
    </div>
  );
}
