import { Button } from "@/components/ui/button";
import type { IEvents } from "@/data/events";
import { formatNaira } from "@/utils/format-price";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventDetails({ event }: { event: IEvents }) {
  return (
    <section className="max-w-[1536px] pb-16 w-full flex flex-col">
      <div className="relative w-full flex flex-col">
        <img
          src={event.thumbnail}
          alt={event.event_name}
          className="w-full h-auto"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/10 to-transparent backdrop-blur-xs" />
      </div>

      <div className="container w-full flex flex-col gap-10 -mt-[250px] z-10">
        <div className="flex flex-col gap-10">
          <img
            src={event.image}
            alt={event.event_name}
            className="w-[301px] h-[388px] rounded-[5px]"
          />

          <div className="flex flex-col gap-2.5">
            <p className="text-[40px] uppercase">{event.event_name}</p>

            <div className="flex flex-col gap-0.5 font-sf-pro-display font-[200]">
              <p className=" text-[32px]">{event.event_location}</p>
              <p className="text-xl">{event.event_date}</p>
            </div>
          </div>
        </div>

        {/**Event Description */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-1.5">
            <BlockName name="description" />

            <div className="flex items-center gap-3">
              <img
                src="/assets/event/age-rating.png"
                alt="Rated 18"
                width={36}
                height={36}
                className="rounded-full"
              />

              <p className="text-xl font-light font-sf-compact">
                {event.event_time.start_time} - {event.event_time.end_time}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 font-sf-pro-rounded max-w-2/3">
            {event.description.map((item) => (
              <p key={item} className="text-xl font-light">
                {item}
              </p>
            ))}

            <div className="flex flex-col gap-0.5 text-xl font-light">
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
            {event.tickets.map((item) => (
              <TicketCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        {/**Location */}
        <div className="flex flex-col gap-7">
          <BlockName name="location" className="underline" />

          <div className="flex flex-col gap-4">
            <div className="flex w-[722px] h-[452px] rounded-[4px] border border-white" />

            <p className="text-xl font-[200] font-sf-pro-display">
              {event.event_location}
            </p>

            <EventOutlineButton>
              <span>Open in Maps</span>
            </EventOutlineButton>
          </div>
        </div>

        {/**Contact */}
        <div className="flex flex-col gap-7">
          <BlockName name="contact" className="text-[32px]" />

          <div className="flex flex-col gap-3">
            {event.socials.website && (
              <Link
                to={event.socials.website}
                className="text-xl text-[#AE0D0D] font-sf-mono w-fit"
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

function BlockName({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return <p className={`text-4xl uppercase ${className}`}>{name}</p>;
}

function TicketCard({ name, price }: { name: string; price: number }) {
  return (
    <div className="relative flex flex-col w-[378px] h-[81px] rounded-[10px] bg-[#686868] px-5 py-2.5 text-xl font-sf-pro-display">
      <p className="font-bold">{name}</p>
      <p>{formatNaira(price)}</p>

      <Button className="absolute top-0 right-0 w-[67px] bg-[#5BAE0D] hover:bg-[#5BAE0D]/80 rounded-l-none rounded-br-none">
        <Plus color="var(--foreground)" size={18} />
      </Button>
    </div>
  );
}

function EventOutlineButton({ children }: { children: React.ReactNode }) {
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
