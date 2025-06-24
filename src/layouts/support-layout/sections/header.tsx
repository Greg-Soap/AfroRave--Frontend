import LoginButton from "@/layouts/components/login-button";
import NavSheet from "@/layouts/components/nav-sheet";
import { NavLogo } from "@/layouts/root-layout/header/nav-logo";

export default function SupportHeader() {
  return (
    <header className="w-full h-fit py-3 px-8 bg-black">
      <nav className=" flex items-center justify-between">
        <NavLogo />

        <div className="flex items-center gap-6">
          <LoginButton />

          <NavSheet />
        </div>
      </nav>
    </header>
  );
}
