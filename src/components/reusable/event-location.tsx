import type { IEvents } from "@/data/events";
import {
  BlockName,
  EventOutlineButton,
} from "@/pages/individual-event/event-details";

export function EventLocation({
  event_location,
}: {
  event_location: IEvents["event_location"];
}) {
  return (
    <div className="flex flex-col gap-[43px]">
      <BlockName name="location" className="underline" />

      <div className="flex flex-col gap-4">
        <div className="flex w-full md:w-2/3 lg:w-[722px] h-[452px] rounded-[4px] border border-white" />

        <p className="text-xl font-[200] font-sf-pro-display">
          {event_location}
        </p>

        <EventOutlineButton>
          <span>Open in Maps</span>
        </EventOutlineButton>
      </div>
    </div>
  );
}
