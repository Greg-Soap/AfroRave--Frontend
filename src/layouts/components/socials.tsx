import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Socials({
  className,
  data = socials,
}: {
  className?: string;
  data?: ISocials[];
}) {
  return (
    <div className={cn("w-full flex items-center gap-2.5", className)}>
      {data.map((item) => (
        <Link
          key={item.alt}
          to={item.href}
          className="cursor-pointer hover:opacity-80"
        >
          <img src={item.icon} alt={item.alt} className="w-[18px] h-auto" />
        </Link>
      ))}
    </div>
  );
}

const socials: ISocials[] = [
  { href: "/", icon: "/assets/landing-page/insta.png", alt: "Instagram" },
  { href: "/", icon: "/assets/landing-page/X.png", alt: "X" },
  { href: "/", icon: "/assets/landing-page/yt.png", alt: "Youtube" },
];

export interface ISocials {
  href: string;
  icon: string;
  alt: string;
}
