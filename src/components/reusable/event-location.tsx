import type { IEvents } from "@/data/events";
import {
  BlockName,
  EventOutlineButton,
} from "@/pages/individual-event/event-details";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { geocodeLocation } from "@/lib/geocode";

export function EventLocation({
  event_location,
}: {
  event_location: IEvents["event_location"];
}) {
  const [position, setPosition] = useState<[number, number] | null>([
    6.5244,
    3.3792, //lagos
  ]);

  useEffect(() => {
    geocodeLocation(event_location).then((coords) => {
      //this converts the location from a string to an array of number, as leaflet only accepts cordinates.
      if (coords) {
        setPosition([coords.lat, coords.lon]);
        console.log(coords);
      }
    });
  }, [location]);

  if (!position)
    return (
      <div className="flex flex-col gap-[43px]">
        <BlockName name="location" className="underline" />

        <div className="flex w-full md:w-2/3 lg:w-[722px] h-[452px] rounded-[4px] border border-white items-center justify-center">
          <p>Loading Map...</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-[43px]">
      <BlockName name="location" className="underline" />

      <div className="flex flex-col gap-4">
        <MapContainer
          center={position} //this is the actual event location, i dont understand the error
          zoom={13}
          className="flex w-full md:w-2/3 lg:w-[722px] h-[452px] rounded-[4px] border border-white"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap Contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{event_location}</Popup>
          </Marker>
        </MapContainer>

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
