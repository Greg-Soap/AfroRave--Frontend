import { Button } from "@/components/ui/button";
import type { IEvents } from "@/data/events";
import { formatNaira } from "@/lib/format-price";
import {
  Plus,
  Minus,
  Clock4,
  type LucideIcon,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EventLocation } from "@/pages/landing-page/event-page/event-location";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BlockName } from "../_components/block-name";
import { EventOutlineButton } from "../_components/event-otline-btn";
import Cart from "../cart";

export default function EventDetails({
  event,
  layout = "default",
}: IEventDetailsProp) {
  const [tickets, setTickets] = useState<CartTicket[]>(
    event.tickets.map((ticket) => ({ ...ticket, quantity: 0 }))
  );

  const totalQuantity =
    tickets?.reduce((sum, ticket) => sum + ticket.quantity, 0) || 0;

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
    <section className="pb-16 w-full flex flex-col items-center">
      <div className="relative w-full flex flex-col">
        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full min-h-[400px] xl:h-[720px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="max-w-[1536px] w-full flex flex-col gap-[120px] -mt-[200px] xl:-mt-[475px] z-10 px-5 lg:px-[120px]">
        {/** Contains the event-image and event-name */}
        <div className="flex flex-col gap-5 md:gap-0 md:items-end">
          <EventDetailsSection event={event} layout={layout} />
          <div className="flex gap-4">
            <div className="flex h-fit gap-[11px] py-4 px-2 rounded-[6px] bg-deep-red">
              <ShoppingCart size={24} color="#ffffff" />
              <p className="h-6 rounded-full bg-white px-3 text-sm font-semibold font-sf-pro-display text-black flex items-center justify-center">
                {totalQuantity}
              </p>
            </div>
            <Cart
              event={event}
              initialTickets={tickets}
              initialPrice={calculateTotalPrice()}
            />
          </div>
        </div>

        {(layout === "no-image" || layout === "ticket-first") && (
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
        <EventLocation event_location={event.event_location} />

        {/**Contact */}
        <ContactSection event={event} />

        <TermsSection />
      </div>
    </section>
  );
}

function EventDetailsSection({ event, layout }: IEventDetailsProp) {
  return (
    <div
      className={cn("w-full flex flex-col gap-3", {
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

function TicketSection({
  layout,
  tickets,
  setTickets,
}: Omit<IEventDetailsProp, "event"> & {
  tickets: CartTicket[];
  setTickets: React.Dispatch<React.SetStateAction<CartTicket[]>>;
}) {
  const updateTicketQuantity = (index: number, newQuantity: number) => {
    setTickets((prev: CartTicket[]) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: Math.max(0, newQuantity),
      };
      return updated;
    });
  };

  return (
    <div className="!w-full flex flex-col gap-7">
      <div className="flex items-center gap-5">
        <BlockName name="tickets" />

        <p className="font-sf-pro-display text-xl font-extrabold text-white/60">
          SALE
        </p>
      </div>

      <div
        className={cn("w-full", {
          "flex gap-7 overflow-x-scroll scrollbar-none":
            layout === "ticket-first" || layout === "no-image",
          "grid sm:grid-cols-2 gap-x-5 gap-y-7": layout === "default",
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
    <SectionContainer>
      <BlockName name="contact" />

      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between p-6 border-b border-mid-dark-gray/30 rounded-t-[8px] bg-[#3d3d3d]">
          <p className="text-xl font-medium leading-[140%] font-sf-pro-display">
            Socials
          </p>

          <SocialMediaLinks socials={event.socials} />
        </div>

        {event.socials.website && (
          <div className="w-full flex items-center justify-between p-6 border-b border-mid-dark-gray/30 rounded-b-[8px] bg-[#3d3d3d]">
            <p className="text-xl font-medium leading-[140%] font-sf-pro-display">
              Website
            </p>

            <Link
              to={event.socials.website}
              className="font-sf-pro-display font-medium text-xl w-fit leading-[140%] underline text-[#419e57] underline-offset-4"
            >
              Click here
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

function TermsSection() {
  return (
    <SectionContainer>
      <div className="w-[150px]">
        <BlockName name="TERMS" />
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-sf-pro-display">
          Step into the vibrant world of ALTÉ — where sound, fashion, and
          self-expression collide. ALTÉ RENAISSANCE is a night curated for the
          bold and the free, a sonic exhibition of Nigeria’s new-wave culture.
        </p>

        <EventOutlineButton>
          <span className="text-sm font-medium font-sf-pro-rounded">
            Read More
          </span>
        </EventOutlineButton>
      </div>
    </SectionContainer>
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
          "w-full": layout === "default",
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
            <TicketButton
              action={() => onQuantityChange(quantity - 1)}
              Icon={Minus}
            />

            <span className="font-sf-pro-rounded font-bold text-sm">
              {quantity}
            </span>
          </>
        )}

        <TicketButton
          action={() => onQuantityChange(quantity + 1)}
          Icon={Plus}
        />
      </div>
    </div>
  );
}

function TicketButton({
  action,
  Icon,
}: {
  action: () => void;
  Icon: LucideIcon;
}) {
  return (
    <Button
      variant="ghost"
      className="p-1 w-fit h-fit hover:bg-black/10"
      onClick={action}
    >
      <Icon color="var(--foreground)" size={16} />
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
    <div className="flex items-center gap-5">
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
        className="w-[18px] h-auto"
      />
    </Link>
  );
}

function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-lg:flex-col gap-[30px] lg:gap-[120px]">
      {children}
    </div>
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

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}
