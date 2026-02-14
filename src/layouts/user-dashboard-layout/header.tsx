import { account_links } from "@/components/constants";
import { UserMenuButton } from "@/components/reusable/user-menu-button";
import { cn } from "@/lib/utils";
import { useAfroStore } from "@/stores";
import { Link, useLocation } from "react-router-dom";
import { NavLogo } from "../root-layout/header/nav-logo";

export default function AccountHeader() {
  const { user } = useAfroStore();

  return (
    <header className="w-full fixed top-0 z-50 bg-[#1A1A1A] border-b border-white/10">
      <nav className="w-full px-10 h-[80px] flex items-center justify-between">
        {/* Left: Logo */}
        <div className="w-[200px]">
          <NavLogo />
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 flex justify-center">
          <NavigationLinks />
        </div>

        {/* Right: User Menu */}
        <div className="w-[200px] flex justify-end">
          <UserMenuButton user={user} />
        </div>
      </nav>
    </header>
  );
}

function NavigationLinks() {
  const location = useLocation();

  const isLinkActive = (itemLink: string) => {
    if (itemLink.includes('?')) {
      const linkQuery = itemLink.split('?')[1];
      return location.search.includes(linkQuery);
    }

    if (location.pathname === itemLink) {
      if (itemLink.endsWith('/account') && location.search.includes('account=wallet')) {
        return false;
      }
      return true;
    }

    return false;
  };

  return (
    <div className="hidden md:flex items-center gap-10">
      {account_links.map((item) => {
        const active = isLinkActive(item.link);

        return (
          <Link
            key={item.name}
            to={item.link}
            className={cn(
              "relative flex items-center gap-[14px] transition-all pb-1 group font-input-mono",
              active ? "opacity-100 text-white" : "opacity-60 hover:opacity-80 text-white"
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-[18px] h-[18px]"
              style={{
                filter: active
                  ? 'brightness(0) saturate(100%) invert(19%) sepia(98%) saturate(6947%) hue-rotate(356deg) brightness(91%) contrast(113%)'
                  : 'brightness(0) invert(1)'
              }}
            />
            <span className="text-[14px] uppercase tracking-[0.05em] font-medium">
              {item.name}
            </span>
            {active && (
              <div className="absolute -bottom-[2px] left-0 right-0 h-[2.5px] bg-[#C30010] rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}