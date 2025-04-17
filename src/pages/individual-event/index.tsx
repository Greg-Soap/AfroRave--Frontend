import { events } from "@/data/events";
import { useParams } from "react-router-dom";
import EventDetails from "./event-details";

export default function IndividualEventPage() {
  const { eventId } = useParams();
  const event = events.find((item) => item.id === Number(eventId));

  if (!event) {
    return <p>No Events Found</p>;
  }

  return <EventDetails event={event} />;
}
