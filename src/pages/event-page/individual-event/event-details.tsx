import { Button } from "@/components/ui/button";
import type { IEvents } from "@/data/events";
import { formatNaira } from "@/lib/format-price";
import { Plus, Minus, Clock4 } from "lucide-react";
import { Link } from "react-router-dom";
import { EventLocation } from "@/pages/event-page/event-location";
import Cart from "../cart";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

export default function EventDetails({ event }: { event: IEvents }) {
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

  const calculateTotalPrice = () => {
    const totalTicketPrice = tickets.reduce(
      (sum, ticket) => sum + ticket.price * ticket.quantity,
      0
    );
    const totalFees = tickets.reduce(
      (sum, ticket) => sum + 1350 * ticket.quantity,
      0
    );
    return totalTicketPrice + totalFees;
  };

  return (
    <section className="pb-16 w-full flex flex-col">
      <div className="relative w-full flex flex-col">
        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full min-h-[400px] xl:h-auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="container w-full flex flex-col gap-10 -mt-[200px] xl:-mt-[250px] z-10">
        <div className="flex flex-col gap-10">
          <img
            src={event.image}
            alt={event.event_name}
            className="w-[284px] h-[364px] rounded-[10px]"
          />

          <div className="flex flex-col gap-1">
            <p className="text-2xl md:text-[30px] lg:text-[32px] uppercase font-sf-compact tracking-[-0.25px] font-bold">
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

        {/**Event Description */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0 md:gap-1.5">
            <BlockName name="description" />

            <div className="flex items-center gap-3 font-sf-pro-rounded font-medium text-xs text-white">
              {event.rated_18 && (
                <p className="px-3 h-8 rounded-[6px] bg-light-red  flex items-center">
                  18+
                </p>
              )}

              <div className="text-white flex items-center gap-2.5 px-3 h-8 rounded-[6px] bg-medium-gray">
                <Clock4 color="#ffffff" size={16} />

                <p>
                  {event.event_time.start_time} - {event.event_time.end_time}
                </p>
              </div>

              <p className="text-white flex items-center px-3 h-8 rounded-[6px] bg-medium-gray">
                6 Days Left
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 font-sf-pro-display text-sm md:max-w-2/3">
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

        {/**Tickets */}
        <div className="flex flex-col gap-7">
          <BlockName name="tickets" />

          <div className="flex flex-col gap-4">
            {tickets.map((item, index) => (
              <TicketCard
                key={item.name}
                {...item}
                onQuantityChange={(newQuantity) =>
                  updateTicketQuantity(index, newQuantity)
                }
              />
            ))}
          </div>

          <Cart
            event={event}
            initialTickets={tickets}
            initialPrice={calculateTotalPrice()}
          />
        </div>

        {/**Location */}
        <EventLocation event_location={event.event_location} />

        {/**Contact */}
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
      </div>
    </section>
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

function TicketCard({
  name,
  price,
  quantity,
  onQuantityChange,
}: {
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <div className="flex items-center justify-between w-full md:w-[695px] h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display">
      <div className="flex flex-col gap-1 font-sf-pro-display text-base font-normal">
        <p>{name}</p>
        <p>{formatNaira(price)}</p>
      </div>

      <div className="flex items-center gap-2 px-3 rounded-full h-12 bg-light-green">
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
