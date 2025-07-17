import { NavLink } from "react-router-dom";
import { NavLogo } from "../root-layout/header/nav-logo";
import { cn } from "@/lib/utils";
import { account_links } from "@/components/constants";
import { BaseSheet } from "@/components/reusable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MobileMenu from "../root-layout/header/mobile-menu";
import { useScroll } from "@/lib/useScroll";

export default function AccountHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hasScrolled } = useScroll();

  return (
    <header className="w-full fixed top-0 flex justify-center z-50 h-[120px]">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? "h-full bg-black/25 backdrop-blur-sm" : "h-0"
        }`}
      />

      <nav className="relative px-4 md:px-7 w-full flex items-center justify-between py-4">
        <NavLogo />

        <NavigationLinks />

        <Button
          variant="outline"
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-black/70 transition-colors flex items-center gap-[5px] py-1.5 pl-[19px] pr-[11px] rounded-full w-fit h-fit group"
        >
          <span className="font-phosphate text-lg tracking-[-1px] text-white uppercase group-hover:text-white">
            EA
          </span>
          <img
            src="/assets/landing-page/menu.svg"
            alt=""
            className="!w-4 !h-4"
          />
        </Button>
        <BaseSheet
          side="right"
          size="sm"
          title="Menu"
          circleCancel
          open={isMenuOpen}
          setOpen={setIsMenuOpen}
          contentClassName="bg-pure-black text-white px-3"
        >
          <MobileMenu onClose={() => setIsMenuOpen(false)} />
        </BaseSheet>
      </nav>
    </header>
  );
}

function NavigationLinks() {
  return (
    <div className="hidden md:flex items-center gap-14">
      {account_links.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            cn("flex items-center gap-2", {
              "opacity-100": isActive,
              "opacity-60": !isActive,
            })
          }
        >
          <img src={item.icon} alt={item.name} className="size-[19px]" />
          <span className="text-base font-input-mono">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
