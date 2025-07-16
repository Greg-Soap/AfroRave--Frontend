import { Button } from "@/components/ui/button";
import type { IEvents } from "@/data/events";
import { formatNaira } from "@/lib/format-price";
import { Plus, Minus, Clock4, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EventLocation } from "@/pages/landing-page/event-page/event-location";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

export default function EventDetails({
  event,
  layout = "default",
}: IEventDetailsProp) {
  const navigate = useNavigate();

  return (
    <section className="pb-16 w-full flex flex-col">
      <div className="relative w-full flex flex-col">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="absolute top-[100px] left-10 z-10 w-fit h-fit hover:bg-black/30"
        >
          <ChevronLeft size={40} color="#ffffff" className="min-w-7 min-h-10" />
        </Button>

        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full min-h-[400px] xl:h-[720px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="container flex flex-col gap-10 -mt-[349px] xl:-mt-[250px] z-10">
        {/** Contains the event-image and event-name */}
        <EventDetailsSection event={event} layout={layout} />

        {(layout === "no-image" || layout === "ticket-first") && (
          <TicketSection event={event} layout={layout} />
        )}

        {/**Event Description */}
        <EventDescription event={event} />

        {/**Tickets */}
        {layout === "default" && (
          <TicketSection event={event} layout={layout} />
        )}

        {/**Location */}
        <EventLocation event_location={event.event_location} />

        {/**Contact */}
        <ContactSection event={event} />
      </div>
    </section>
  );
}

function EventDetailsSection({ event, layout }: IEventDetailsProp) {
  return (
    <div
      className={cn("flex flex-col gap-3", {
        "mb-[220px]": layout === "no-image",
      })}
    >
      {layout !== "no-image" && (
        <img
          src={event.image}
          alt={event.event_name}
          className="w-[284px] h-[364px] rounded-[10px]"
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
  );
}

function EventDescription({ event }: { event: IEvents }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-0 md:gap-1.5">
        <BlockName name="description" />

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
  );
}

function TicketSection({ event, layout }: IEventDetailsProp) {
  const [tickets, setTickets] = useState<CartTicket[]>(
    event.tickets.map((ticket) => ({ ...ticket, quantity: 0 }))
  );

  const updateTicketQuantity = (index: number, newQuantity: number) => {
    setTickets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: Math.max(0, newQuantity),
      };
      return updated;
    });
  };

  // const calculateTotalPrice = () => {
  //   const totalTicketPrice = tickets.reduce(
  //     (sum, ticket) => sum + ticket.price * ticket.quantity,
  //     0
  //   );
  //   const totalFees = tickets.reduce(
  //     (sum, ticket) => sum + 1350 * ticket.quantity,
  //     0
  //   );
  //   return totalTicketPrice + totalFees;
  // };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-5">
        <BlockName name="tickets" />

        <p className="font-sf-pro-display text-xl font-extrabold text-white/60">
          SALE
        </p>
      </div>

      <div
        className={cn("w-full flex", {
          "gap-7 overflow-x-scroll scrollbar-none":
            layout === "ticket-first" || layout === "no-image",
          "flex-col gap-4": layout === "default",
        })}
      >
        {tickets.map((item, index) => (
          <TicketCard
            key={item.name}
            {...item}
            layout={layout}
            onQuantityChange={(newQuantity) =>
              updateTicketQuantity(index, newQuantity)
            }
          />
        ))}
      </div>

      {/* <Cart
        event={event}
        initialTickets={tickets}
        initialPrice={calculateTotalPrice()}
      /> */}
    </div>
  );
}

function ContactSection({ event }: { event: IEvents }) {
  return (
    <div className="flex flex-col gap-3">
      <BlockName name="contact" />

      <div className="flex flex-col gap-3">
        {event.socials.website && (
          <Link
            to={event.socials.website}
            className="font-sf-pro-text font-normal text-sm w-fit"
          >
            {event.socials.website}
          </Link>
        )}

        <SocialMediaLinks socials={event.socials} />
      </div>
    </div>
  );
}

function TicketCard({
  name,
  price,
  quantity,
  onQuantityChange,
  layout,
}: {
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  layout: IEventDetailsProp["layout"];
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display",
        {
          "w-full max-w-[383px]":
            layout === "no-image" || layout === "ticket-first",
          "w-full md:w-[695px]": layout === "default",
        }
      )}
    >
      <div className="flex flex-col gap-1 font-sf-pro-display text-base font-normal">
        <p>{name}</p>
        <p>{formatNaira(price)}</p>
      </div>

      <div className="flex items-center gap-2 px-3 rounded-full h-12 bg-light-green">
        {quantity > 0 && (
          <>
            <Button
              variant="ghost"
              className="p-1 w-fit h-fit hover:bg-black/10"
              onClick={() => onQuantityChange(quantity - 1)}
            >
              <Minus color="var(--foreground)" size={16} />
            </Button>

            <span className="font-sf-pro-rounded font-bold text-sm">
              {quantity}
            </span>
          </>
        )}

        <Button
          variant="ghost"
          className="p-1 w-fit h-fit hover:bg-black/10"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus color="var(--foreground)" size={16} />
        </Button>
      </div>
    </div>
  );
}

export function BlockName({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <p
      className={`text-2xl font-sf-pro-display font-black tracking-[-0.25px] text-white uppercase ${className}`}
    >
      {name}
    </p>
  );
}

export function EventOutlineButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center justify-center gap-2.5 h-10 w-[188px] rounded-[10px] border-white font-medium text-2xl font-sf-pro-rounded hover:text-white hover:bg-black/10",
        className
      )}
    >
      {children}
    </Button>
  );
}

function SocialMediaLinks({ socials }: { socials: IEvents["socials"] }) {
  const platforms: SocialPlatform[] = [
    { name: "yt", link: socials.youtube_link, alt: "YouTube" },
    { name: "insta", link: socials.instagram_link, alt: "Instagram" },
    { name: "tiktok", link: socials.tiktok_link, alt: "TikTok" },
    { name: "X", link: socials.x_link, alt: "X" },
  ].filter((platform) => platform.link) as SocialPlatform[];

  return (
    <div className="flex items-center gap-2.5">
      {platforms.map((platform) => (
        <SocialMediaIcon
          key={platform.name}
          platform={platform}
          link={platform.link}
        />
      ))}
    </div>
  );
}

function SocialMediaIcon({
  platform,
  link,
}: {
  platform: SocialPlatform;
  link: string;
}) {
  return (
    <Link to={link}>
      <img
        src={`/assets/landing-page/${platform.name}.png`}
        alt={platform.alt}
        className="w-5 h-auto"
      />
    </Link>
  );
}

type SocialPlatform = {
  name: "yt" | "insta" | "tiktok" | "X";
  link: string;
  alt: string;
};

interface IEventDetailsProp {
  event: IEvents;
  layout?: "default" | "ticket-first" | "no-image";
}
