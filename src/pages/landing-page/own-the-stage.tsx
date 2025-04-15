import { Link } from "react-router-dom";
import partyImage from "@/assets/landing-page/party.png";

export default function OwnTheStage() {
  return (
    <section className="container flex flex-col gap-10 py-[75px]">
      <DetailsBlock {...details[0]} />

      <div className="flex items-center gap-[50px]">
        <img
          src={partyImage}
          alt="Concert"
          width={813}
          height={469}
          className="rounded-[10px] max-w-1/2"
        />
        <DetailsBlock {...details[1]} />
      </div>

      <DetailsBlock {...details[2]} />

      <Link to="/" className="self-center underline text-[50px]">
        LEARN MORE
      </Link>
    </section>
  );
}

function DetailsBlock({ title, href, linkName, details }: IDetails) {
  return (
    <div className="max-w-1/2 flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center text-[45px] gap-x-3.5">
        <span>{title} </span>
        <Link
          to={href}
          className="w-[200px] h-10 bg-secondary text-[15px] font-light uppercase rounded-[10px] flex items-center justify-center"
        >
          {linkName}
        </Link>
      </div>
      <p className="text-[30px] uppercase">{details}</p>
    </div>
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
