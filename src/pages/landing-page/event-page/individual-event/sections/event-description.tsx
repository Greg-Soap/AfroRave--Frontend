import { SectionContainer } from "../_components/section-container";
import { BlockName } from "../../_components/block-name";
import { Clock4, Plus } from "lucide-react";
import { EventOutlineButton } from "../../_components/event-otline-btn";
import type { IEvents } from "@/data/events";

export default function EventDescription({ event }: { event: IEvents }) {
  return (
    <SectionContainer>
      <BlockName name="description" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 font-sf-pro-rounded font-medium text-xs text-white">
          {event.rated_18 && (
            <p className="px-3 w-16 h-8 rounded-[6px] bg-light-red flex justify-center items-center">
              18+
            </p>
          )}

          <div className="text-white flex items-center gap-2.5 px-3 h-8 rounded-[6px] bg-medium-gray">
            <Clock4 color="#ffffff" size={16} />

            <p>
              {event.event_time.start_time} - {event.event_time.end_time}
            </p>
          </div>

          <p className="text-white flex items-center justify-center px-3 w-24 h-8 rounded-[6px] bg-medium-gray">
            6 Days Left
          </p>
        </div>

        <div className="flex flex-col gap-1 font-sf-pro-display text-sm md:max-w-2/3">
          {event.description.map((item) => (
            <p key={item} className="text-sm">
              {item}
            </p>
          ))}

          <div className="flex flex-col gap-0.5">
            <p>Artist Lineup Includes:</p>
            <ul className="flex flex-col gap-0.5">
              {event.artist_lineup.map((item) => (
                <li key={item} className="list-disc list-inside">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <EventOutlineButton className="justify-between">
          <>
            <span className="text-sm font-medium font-sf-pro-rounded">
              Read More
            </span>
            <Plus color="var(--foreground)" size={12} />
          </>
        </EventOutlineButton>
      </div>
    </SectionContainer>
  );
}
