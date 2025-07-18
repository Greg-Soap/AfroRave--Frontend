import { Search } from "lucide-react";
import { NavLogo } from "./nav-logo";
import { useScroll } from "@/lib/useScroll";
import LoginButton from "@/layouts/components/login-button";
import NavSheet from "@/layouts/components/nav-sheet";
import { useAuthStore } from "@/stores/auth-store";

export default function Header() {
  const { hasScrolled } = useScroll();
  const { user } = useAuthStore();
  console.log(user);

  return (
    <header className="w-full fixed top-0 flex justify-center z-50 h-[120px]">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? "h-full bg-black/25 backdrop-blur-sm" : "h-0"
        }`}
      />

      <nav className="relative px-4 md:px-8 w-full flex items-center justify-between py-4">
        <NavLogo />

        <div className="flex items-center gap-5">
          <Search
            size={20}
            color="var(--foreground)"
            className="max-sm:hidden cursor-pointer min-w-[26px] "
          />

          <LoginButton />

          <NavSheet />
        </div>
      </nav>
    </header>
  );
}
