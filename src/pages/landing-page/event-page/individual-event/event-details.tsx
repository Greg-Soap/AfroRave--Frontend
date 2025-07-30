import type { IEvents } from "@/data/events";
import { EventLocation } from "@/pages/landing-page/event-page/event-location";
import { useState } from "react";
import EventDescription from "./sections/event-description";
import EventDetailsSection from "./sections/event-details";
import TicketSection from "./sections/tickets";
import ContactSection from "./sections/contact";
import TermsSection from "./sections/terms";
import CartTrigger from "./_components/cart-trigger";
import { SectionContainer } from "./_components/section-container";

export default function EventDetails({
  event,
  layout = "default",
}: IEventDetailsProp) {
  const [tickets, setTickets] = useState<CartTicket[]>(
    event.tickets.map((ticket) => ({ ...ticket, quantity: 0 }))
  );

  const totalQuantity =
    tickets?.reduce((sum, ticket) => sum + ticket.quantity, 0) || 0;

  function calculateTotalPrice() {
    const totalTicketPrice = tickets.reduce(
      (sum, ticket) => sum + ticket.price * ticket.quantity,
      0
    );
    const totalFees = tickets.reduce(
      (sum, ticket) => sum + 1350 * ticket.quantity,
      0
    );
    return totalTicketPrice + totalFees;
  }

  return (
    <section className="md:pb-16 w-full flex flex-col items-center">
      <div className="relative w-full flex flex-col">
        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full min-h-[400px] xl:h-[720px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="max-w-[1536px] w-full flex flex-col gap-[60px] md:gap-[120px] -mt-[200px] xl:-mt-[475px] z-10">
        {/** Contains the event-image and event-name */}
        <div className="flex flex-col gap-5 md:gap-0 md:items-end">
          {layout === "carousel-with-flyer" ? (
            <EventDetailsSection
              layout={layout}
              event={event}
              totalQuantity={totalQuantity}
              tickets={tickets}
              calculateTotalPrice={calculateTotalPrice}
            />
          ) : (
            <EventDetailsSection layout={layout} event={event} />
          )}

          {layout !== "carousel-with-flyer" && (
            <CartTrigger
              event={event}
              totalQuantity={totalQuantity}
              calculateTotalPrice={calculateTotalPrice}
              tickets={tickets}
              className="mx-[120px] max-md:hidden"
            />
          )}
        </div>

        {(layout === "carousel-with-flyer" || layout === "no-flyer") && (
          <TicketSection
            layout={layout}
            tickets={tickets}
            setTickets={setTickets}
          />
        )}

        {/**Event Description */}
        <EventDescription event={event} />

        {/**Tickets */}
        {layout === "default" && (
          <TicketSection
            layout={layout}
            tickets={tickets}
            setTickets={setTickets}
          />
        )}

        {/**Location */}
        <SectionContainer>
          <EventLocation event_location={event.event_location} />
        </SectionContainer>

        {/**Contact */}
        <ContactSection event={event} />

        <TermsSection />

        <CartTrigger
          event={event}
          totalQuantity={totalQuantity}
          calculateTotalPrice={calculateTotalPrice}
          tickets={tickets}
          className="md:hidden bg-[#686868] rounded-t-[8px] px-4 py-6"
        />
      </div>
    </section>
  );
}

interface IEventDetailsProp {
  event: IEvents;
  layout?: "default" | "no-flyer" | "carousel-with-flyer";
}

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}
