import { Button } from "@/components/ui/button";
import type { IEvents } from "@/data/events";
import { formatNaira } from "@/lib/format-price";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { EventLocation } from "@/pages/event-page/event-location";
import Cart from "../cart";
import { useState } from "react";

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
    <section className=" pb-16 w-full flex flex-col">
      <div className="relative w-full flex flex-col">
        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full min-h-[400px] xl:h-auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="container w-full flex flex-col gap-16 -mt-[200px] xl:-mt-[250px] z-10">
        <div className="flex flex-col gap-10">
          <img
            src={event.image}
            alt={event.event_name}
            className="w-[301px] h-[388px] rounded-[5px]"
          />

          <div className="flex flex-col gap-2.5">
            <p className="text-2xl md:text-[30px] lg:text-[40px] uppercase">
              {event.event_name}
            </p>

            <div className="flex flex-col gap-0.5 font-sf-pro-display font-[200]">
              <p className="text-lg md:text-2xl lg:text-[32px]">
                {event.event_location}
              </p>
              <p className="md:text-xl">{event.event_date}</p>
            </div>
          </div>
        </div>

        {/**Event Description */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-0 md:gap-1.5">
            <BlockName name="description" />

            <div className="flex items-center gap-3">
              <img
                src="/assets/event/age-rating.png"
                alt="Rated 18"
                width={36}
                height={36}
                className="rounded-full max-md:size-6"
              />

              <p className="md:text-xl font-light font-sf-compact">
                {event.event_time.start_time} - {event.event_time.end_time}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 font-sf-pro-rounded md:max-w-2/3">
            {event.description.map((item) => (
              <p key={item} className="md:text-xl font-light">
                {item}
              </p>
            ))}

            <div className="flex flex-col gap-0.5 md:text-xl font-light">
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

          <EventOutlineButton>
            <>
              <span>Read More</span>
              <Plus color="var(--foreground)" size={19} />
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
        <div className="flex flex-col gap-7">
          <BlockName name="contact" className="text-[32px]" />

          <div className="flex flex-col gap-3">
            {event.socials.website && (
              <Link
                to={event.socials.website}
                className="text-xl text-deep-red font-sf-mono w-fit"
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
    <p className={`text-xl md:text-[26px] lg:text-4xl uppercase ${className}`}>
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
    <div className="relative flex flex-col w-full md:w-[378px] h-[81px] rounded-[10px] bg-medium-gray px-5 py-2.5 text-xl font-sf-pro-display">
      <p className="font-bold">{name}</p>
      <p>{formatNaira(price)}</p>

      <div className="absolute top-0 right-0 flex items-center gap-2">
        {quantity > 0 && (
          <Button
            variant="ghost"
            className="hover:bg-white/10"
            onClick={() => onQuantityChange(quantity - 1)}
          >
            <Minus color="var(--foreground)" size={18} />
          </Button>
        )}
        {quantity > 0 && <span className="font-input-mono">{quantity}</span>}
        <Button
          variant="green"
          className="w-[67px] rounded-l-none rounded-br-none"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          <Plus color="var(--foreground)" size={18} />
        </Button>
      </div>
    </div>
  );
}

export function EventOutlineButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2.5 h-11 w-[244px] rounded-[10px] border-white font-medium text-2xl font-sf-pro-rounded hover:text-white hover:bg-black/10"
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
        className="w-10 h-auto"
      />
    </Link>
  );
}

type SocialPlatform = {
  name: "yt" | "insta" | "tiktok" | "X";
  link: string;
  alt: string;
};
