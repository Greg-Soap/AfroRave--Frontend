import { EmptyState } from "../components/empty-state";
import { getRoutePath } from "@/config/get-route-path";
import { events } from "@/data/events";
import { Tickets } from "../components/tickets";

export default function PastTicketsTab() {
  const isEmpty = false;

  return (
    <>
      {isEmpty ? (
        <EmptyState
          type="past"
          btn_name="Discover Events"
          path={getRoutePath("events")}
        />
      ) : (
        <PastTickets />
      )}
    </>
  );
}

function PastTickets() {
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
