import { formatNaira } from "@/lib/format-price";
import { ShoppingCart } from "lucide-react";
import CustomSheet from "@/components/reusable/base-sheet";
import { NavLogo } from "@/components/nav-logo";
import type { IEvents } from "@/data/events";
import { Button } from "@/components/ui/button";
import CartContainer from "./cart-container";

export default function Cart({ event }: { event: IEvents }) {
  return (
    <CustomSheet
      hasNav
      size="full"
      side="bottom"
      title="Your Shopping Cart"
      description="Review and manage your ticket purchases before checkout"
      triggerClassName="flex items-center gap-5 w-full md:w-[378px] h-fit py-4 px-6 bg-[#5BAE0D] hover:bg-[#5BAE0D]/80 rounded-sm"
      trigger={<SheetTrigger />}
      navChildren={<NavLogo />}
      footerContent={<SheetFooter />}
    >
      <CartContainer event={event} />
      <div className="flex h-5 w-full bg-transparent" />
    </CustomSheet>
  );
}

function SheetTrigger() {
  return (
    <>
      <ShoppingCart size={57} color="var(--foreground)" className="size-8" />
      <span className="text-xl font-sf-pro-display">{formatNaira(73350)}</span>
    </>
  );
}

function SheetFooter() {
  return (
    <footer className="w-[595px] flex flex-col items-center gap-2 pl-[81px] pr-[51px] py-[30px] rounded-t-[20px] fixed bottom-0 right-[73px] bg-accent">
      <div className="w-full flex items-center justify-between font-sf-pro-display">
        <span className="font-light text-2xl">{formatNaira(73350)}</span>
        <Button className="bg-white text-black hover:bg-white/90">
          Continue
        </Button>
      </div>
    </footer>
  );
}
