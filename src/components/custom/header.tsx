import { Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { NavLogo } from "./nav-logo";
import { CustomPopover } from "./custom-popover";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed top-0 flex justify-center z-50 bg-black/25 backdrop-blur-sm px-[1rem] md:px-[2rem]">
      <nav className="max-w-[1536px] w-full flex items-center justify-between">
        <NavLogo />

        <div className="flex items-center gap-5">
          <Search
            size={26}
            color="var(--foreground)"
            className="max-sm:hidden"
          />

          <CustomPopover
            trigger={
              <Button className="h-9 w-[86px] bg-white text-black font-input-mono hover:bg-white/90">
                Log In
              </Button>
            }
            content={<LoginPopoverContent />}
          />

          <Menu size={26} color="var(--foreground)" />
        </div>
      </nav>
    </header>
  );
}

function LoginPopoverContent() {
  const location = useLocation();

  const auth_links: { href: string; name: string }[] = [
    { href: `${location.pathname}?login=true&auth=guest`, name: "Guest" },
    { href: `${location.pathname}?login=true&auth=creator`, name: "Creator" },
    { href: `${location.pathname}?login=true&auth=vendor`, name: "Vendor" },
  ];

  return (
    <>
      {auth_links.map((item) => (
        <Button
          key={item.name}
          asChild
          className="w-[157px] rounded-none border-b border-white last:border-none font-input-mono text-[13px] bg-[#686868] first:rounded-t-[6px] last:rounded-b-[6px] hover:bg-white/10"
        >
          <Link to={item.href} className="text-left">
            {item.name}
          </Link>
        </Button>
      ))}
    </>
  );
}
