import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Socials({ type = "root" }: { type?: "root" | "account" }) {
  return (
    <div
      className={cn("w-full flex items-center gap-5", {
        "md:justify-end px-[1rem] md:px-[2rem]": type === "root",
        "justify-center": type === "account",
      })}
    >
      {socials.map((item) => (
        <Link
          key={item.alt}
          to={item.href}
          className="cursor-pointer hover:opacity-80"
        >
          <img src={item.icon} alt={item.alt} className="w-10 h-auto" />
        </Link>
      ))}
    </div>
  );
}

const socials: ISocials[] = [
  { href: "/", icon: "/assets/landing-page/insta.png", alt: "Instagram" },
  { href: "/", icon: "/assets/landing-page/X.png", alt: "X" },
  { href: "/", icon: "/assets/landing-page/tiktok.png", alt: "TikTok" },
  { href: "/", icon: "/assets/landing-page/yt.png", alt: "Youtube" },
];

interface ISocials {
  href: string;
  icon: string;
  alt: string;
}
