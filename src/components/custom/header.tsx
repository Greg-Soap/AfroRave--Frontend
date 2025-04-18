import { Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { NavLogo } from "./nav-logo";

export default function Header() {
  return (
    <header className="w-full fixed top-0 flex justify-center z-50 bg-black/25 backdrop-blur-sm px-[2rem]">
      <nav className="max-w-[1536px] w-full flex items-center justify-between">
        <NavLogo />

        <div className="flex items-center gap-5">
          <Search size={26} color="var(--foreground)" />

          <Button className="h-9 w-[86px] bg-white text-black font-input-mono hover:bg-white/90">
            Log In
          </Button>

          <Menu size={26} color="var(--foreground)" />
        </div>
      </nav>
    </header>
  );
}
