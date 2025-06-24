import { BaseSheet } from "@/components/reusable";
import MobileMenu from "../root-layout/header/mobile-menu";
import { useState } from "react";

export default function NavSheet() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        <img
          src="/assets/landing-page/menu.svg"
          alt=""
          className="min-w-5 h-4"
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
    </>
  );
}
