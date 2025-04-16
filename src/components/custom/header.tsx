import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import logo from "@/assets/landing-page/logo.png";

export default function Header() {
  return (
    <header className="max-w-[1536px] w-full fixed top-0 self-center ml-auto z-50 bg-black/25 px-[2rem]">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width={282}
            height={202}
            className="-ml-7"
          />
        </Link>

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
