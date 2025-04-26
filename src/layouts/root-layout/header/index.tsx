import { Search } from "lucide-react";
import BaseDropdown from "@/components/reusable/base-dropdown";
import BaseSheet from "@/components/reusable/base-sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { NavLogo } from "./nav-logo";
import { Button } from "@/components/ui/button";
import MobileMenu from "./mobile-menu";
import { useScroll } from "@/lib/useScroll";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openAuthModal } = useAuth();
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

        <div className="flex items-center gap-5">
          <Search
            size={26}
            color="var(--foreground)"
            className="max-sm:hidden cursor-pointer min-w-[26px] "
          />

          <BaseDropdown
            trigger={
              <Button className="h-9 w-[86px] bg-white text-black font-input-mono hover:bg-white/90">
                Log In
              </Button>
            }
            items={[
              {
                label: "Guest",
                onClick: () => openAuthModal("login", "guest"),
              },
              {
                label: "Creator",
                onClick: () => openAuthModal("login", "creator"),
              },
              {
                label: "Vendor",
                onClick: () => openAuthModal("login", "vendor"),
              },
            ]}
          />

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <img
              src="/assets/landing-page/menu.svg"
              alt=""
              className="min-w-6 h-6"
            />
          </button>
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
        </div>
      </nav>
    </header>
  );
}
