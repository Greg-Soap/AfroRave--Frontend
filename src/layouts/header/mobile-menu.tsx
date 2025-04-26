import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const isLoggedIn = false;

  return (
    <div className="flex flex-col h-full z-[10] overflow-y-auto scrollbar-none">
      {isLoggedIn ? <AccountLinks /> : <AuthButtons />}

      {isLoggedIn && <LogOutButton />}

      <Separator
        className={cn("bg-white/20 mb-12", {
          "mt-[19px]": isLoggedIn,
          "mt-16": !isLoggedIn,
        })}
      />

      <div className="flex flex-col gap-4 py-6">
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="text-white hover:text-white/80 transition-colors font-input-mono text-xl font-light hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="mt-auto py-6">
        <Separator className="bg-white/20 mb-6" />
        <div className="flex items-center gap-4 justify-end">
          {socials.map((social) => (
            <Link
              key={social.alt}
              to={social.href}
              className="cursor-pointer hover:opacity-80"
            >
              <img src={social.icon} alt={social.alt} className="w-8 h-auto" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthButtons() {
  const { openAuthModal } = useAuth();

  return (
    <div className="flex flex-col gap-4 py-6 px-8">
      <Button
        className="w-full h-12 bg-white text-black hover:bg-white/90"
        onClick={() => openAuthModal("login", "guest")}
      >
        Log In
      </Button>
      <Button
        variant="secondary"
        onClick={() => openAuthModal("signup")}
        className="w-full h-12  border-white text-white hover:bg-white/10"
      >
        Sign Up
      </Button>
    </div>
  );
}

function AccountLinks() {
  return (
    <div className="flex flex-col items-center gap-[19px]">
      {account_links.map((item) => (
        <Link
          key={item.name}
          to={item.link}
          className="max-w-[calc(100%-39px)] w-full py-4 pl-[22px] pr-[11px] bg-[#1E1E1E] rounded-[8px] flex items-center justify-between"
        >
          <div className="flex items-center gap-[5px]">
            <img src={item.icon} alt={item.name} width={19} height={19} />
            <p className="font-input-mono text-[15px]">{item.name}</p>
          </div>

          <ChevronRight
            color="#ffffff"
            strokeWidth={2}
            className="!min-w-1.5 !min-h-3.5"
          />
        </Link>
      ))}
    </div>
  );
}

function LogOutButton() {
  return (
    <Button className="w-full min-h-fit border-t !border-[#525252] px-[11px] bg-transparent hover:bg-transparent hover:text-white rounded-none mt-[42px]">
      <div className="w-full flex items-center gap-[5px] pt-4">
        <img
          src="/assets/harmburger/logout.png"
          alt="Log Out"
          className="!min-w-4 !min-h-4 h-4 w-4"
        />
        <p className="font-input-mono text-[15px]">Log Out</p>
      </div>
    </Button>
  );
}

const menuLinks = [
  { href: "/event", name: "Discover" },
  { href: "/sell", name: "Sale" },
  { href: "/blog", name: "Blog" },
  { href: "/creators", name: "Creators" },
  { href: "/support", name: "Support" },
  { href: "/faq", name: "FAQ" },
];

const socials = [
  { href: "/", icon: "/assets/landing-page/insta.png", alt: "Instagram" },
  { href: "/", icon: "/assets/landing-page/X.png", alt: "X" },
  { href: "/", icon: "/assets/landing-page/tiktok.png", alt: "TikTok" },
  { href: "/", icon: "/assets/landing-page/yt.png", alt: "Youtube" },
];

const account_links: { link: string; icon: string; name: string }[] = [
  {
    link: "/profile",
    icon: "/assets/harmburger/round-user.png",
    name: "Account",
  },
  {
    link: "/profile",
    icon: "/assets/harmburger/ticket.png",
    name: "My Tickets",
  },
  {
    link: "/profile",
    icon: "/assets/harmburger/ticket.png",
    name: "Listed Tickets",
  },
];
