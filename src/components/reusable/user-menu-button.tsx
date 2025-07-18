import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BaseSheet } from "@/components/reusable";
import MobileMenu from "@/layouts/root-layout/header/mobile-menu";
import { getUserInitials } from "@/lib/utils";
import type { User } from "@/types/auth";

interface UserMenuButtonProps {
  user: User | null;
}

export function UserMenuButton({ user }: UserMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
        className="p-2 hover:bg-black/70 transition-colors flex items-center gap-[5px] py-1.5 pl-[19px] pr-[11px] rounded-full w-fit h-fit group"
      >
        <span className="font-phosphate text-lg tracking-[-1px] text-white uppercase group-hover:text-white">
          {getUserInitials(user)}
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
    </>
  );
} 