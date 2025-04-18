import { Button } from "@/components/ui/button";
import { formatNaira } from "@/utils/format-price";
import { ShoppingCart } from "lucide-react";
import TicketPurchaseContainer from "./ticket-purchase-ctn";
import CustomSheet from "@/components/custom/custom-sheet";
import { NavLogo } from "@/components/custom/nav-logo";
import type { IEvents } from "@/data/events";

export default function Cart({ event }: { event: IEvents }) {
  return (
    <CustomSheet
      hasNav
      size="full"
      side="bottom"
      title="Your Shopping Cart"
      description="Review and manage your ticket purchases before checkout"
      contentClassName="pt-[150px]"
      trigger={<SheetTrigger />}
      navChildren={<NavLogo />}
    >
      <TicketPurchaseContainer event={event} />

      <div className="flex h-10 w-full bg-transparent" />
    </CustomSheet>
  );
}

export function SheetTrigger() {
  return (
    <Button
      variant="green"
      type="button"
      className="flex items-center gap-5 w-[378px] h-fit py-4 px-6"
    >
      <ShoppingCart size={57} color="var(--foreground)" className="size-8" />
      <span className="text-xl font-sf-pro-display">{formatNaira(73350)}</span>
    </Button>
  );
}
