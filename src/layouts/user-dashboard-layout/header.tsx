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
      <nav className="w-full px-6 md:px-8 h-[70px] flex items-center justify-between">
        {/* Left: Logo - Hidden on mobile when sidebar shows, visible on desktop */}
        <div className="md:w-[180px]">
          <NavLogo />
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 flex justify-center">
          <NavigationLinks />
        </div>

        {/* Right: User Menu */}
        <div className="md:w-[180px] flex justify-end">
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
    <div className="flex items-center gap-6 md:gap-8">
      {account_links.map((item) => {
        const active = isLinkActive(item.link);

        return (
          <Link
            key={item.name}
            to={item.link}
            className={cn(
              "relative flex items-center gap-2 transition-all pb-1 text-sm",
              active ? "opacity-100 text-white" : "opacity-50 hover:opacity-75 text-white"
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="size-[16px]"
              style={{
                filter: active
                  ? 'brightness(0) saturate(100%) invert(19%) sepia(98%) saturate(6947%) hue-rotate(356deg) brightness(91%) contrast(113%)'
                  : 'brightness(0) invert(1)'
              }}
            />
            <span className="font-input-mono text-xs md:text-sm uppercase tracking-wider">{item.name}</span>
            {active && (
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C30010]" />
            )}
          </Link>
        );
      })}
    </div>
  );
}