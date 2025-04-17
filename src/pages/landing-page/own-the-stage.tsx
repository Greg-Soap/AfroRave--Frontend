import { Link } from "react-router-dom";
import clsx from "clsx";

export default function OwnTheStage() {
  return (
    <section className="flex flex-col gap-10 py-[75px]">
      <div className="container w-full">
        <DetailsBlock {...details[0]} />
      </div>

      <div className="relative max-w-[1536px] px-[1rem] py-10 md:px-[2rem] flex items-center justify-end gap-[50px] bg-[url(assets/landing-page/section-bg.png)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <DetailsBlock {...details[1]} isSecond />
      </div>

      <div className="container w-full flex items-center gap-[30px]">
        <DetailsBlock {...details[2]} />

        <img
          src="/assets/landing-page/bolt.png"
          alt="BOLT"
          width={644}
          height={756}
          className="max-w-1/2 h-auto opacity-40"
        />
      </div>

      <Link to="/" className="self-center underline text-[50px]">
        LEARN MORE
      </Link>
    </section>
  );
}

function DetailsBlock({
  title,
  href,
  linkName,
  details,
  isSecond = false,
}: IDetailsBlockProps) {
  return (
    <div
      className={clsx("max-w-1/2 flex flex-col", {
        "items-center gap-0.5 z-10": isSecond,
        "gap-3.5": !isSecond,
      })}
    >
      <div className="flex flex-wrap items-center text-[45px] gap-x-3.5">
        <span className={isSecond ? "text-center" : "text-left"}>{title}</span>
        {!isSecond && <LinkToAuth href={href} linkName={linkName} />}
      </div>
      <p
        className={clsx("text-[30px] uppercase", {
          "text-center mb-2": isSecond,
        })}
      >
        {details}
      </p>
      {isSecond && <LinkToAuth href={href} linkName={linkName} />}
    </div>
  );
}

function LinkToAuth({ href, linkName }: { href: string; linkName: string }) {
  return (
    <Link
      to={href}
      className="w-[200px] h-10 bg-secondary text-[15px] font-light uppercase rounded-[10px] flex items-center justify-center"
    >
      {linkName}
    </Link>
  );
}

const details: IDetails[] = [
  {
    title: "OWN THE STAGE!",
    href: "/",
    linkName: "Create Your Event",
    details:
      "Ready to bring your event to life? With Afro Revive, creating and managing your event has never been easier! From ticket sales to attendee insights, we give you all the tools you need to sell out your event and make it unforgettable.",
  },
  {
    title: "CAN'T MAKE IT TO A CONCERT?",
    href: "/",
    linkName: "RESELL YOUR TICKET",
    details:
      "Our Ticket Resell feature lets you easily sell your tickets to other fans, safely and securely. List, set your price, and let us handle the rest!",
  },
  {
    title: "READY TO CONNECT WITH MORE EVENTS?",
    href: "/",
    linkName: "REGISTER AS A VENDOR",
    details:
      "Get notified about open slots, express interest, and let organizers come to you. Whether you're offering food, tech, logistics, or entertainment—we'll help you stay booked and busy!",
  },
];

interface IDetails {
  title: string;
  href: string;
  linkName: string;
  details: string;
}

interface IDetailsBlockProps extends IDetails {
  isSecond?: boolean;
}
