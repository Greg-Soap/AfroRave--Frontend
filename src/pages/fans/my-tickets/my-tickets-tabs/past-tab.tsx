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
    <div className="flex flex-wrap items-center justify-center gap-7 px-5 md:px-[50px] lg:px-[100px] mb-[100px]">
      {events.map(({ event_name, image, id }) => (
        <Tickets key={id} id={id} event_name={event_name} image={image} />
      ))}
    </div>
  );
}
