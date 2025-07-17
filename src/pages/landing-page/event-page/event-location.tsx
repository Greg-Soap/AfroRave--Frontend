"use client";

import type { IEvents } from "@/data/events";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { geocodeLocation } from "@/lib/geocode";
import type { LatLngTuple } from "leaflet";
import { BlockName } from "./_components/block-name";
import { EventOutlineButton } from "./_components/event-otline-btn";
import { Icon } from "leaflet";

function createCustomIcon() {
  return new Icon({
    iconUrl: "/assets/resell/lighting.svg",
    iconRetinaUrl: "/assets/resell/lighting.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export function EventLocation({
  event_location,
}: {
  event_location: IEvents["event_location"];
}) {
  const [position, setPosition] = useState<LatLngTuple>([6.5244, 3.3792]);

  useEffect(() => {
    geocodeLocation(event_location).then((coords) => {
      if (coords) {
        setPosition([coords.lat, coords.lon]);
      }
    });
  }, [event_location]);

  if (!position)
    return (
      <div className="flex gap-[120px]">
        <BlockName name="location" className="underline" />

        <div className="flex w-full xl:w-[722px] h-[452px] rounded-[4px] border border-white items-center justify-center">
          <p>Loading Map...</p>
        </div>
      </div>
    );

  return (
    <div className="flex max-lg:flex-col gap-[30px] lg:gap-[120px]">
      <BlockName name="location" />

      <div className="flex flex-col gap-8">
        <div className="w-full lg:w-[525px] xl:w-[722px] h-[452px]">
          <MapContainer
            center={position}
            zoom={13}
            className="w-full h-full rounded-[4px] border border-white"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <Marker position={position} icon={createCustomIcon()}>
              <Popup>{event_location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-sf-pro-display">{event_location}</p>

          <EventOutlineButton>
            <span className="text-sm font-sf-pro-rounded font-medium">
              Open in Maps
            </span>
          </EventOutlineButton>
        </div>
      </div>
    </div>
  );
}
