import { formatNaira } from "@/lib/format-price";
import { ShoppingCart } from "lucide-react";
import BaseModal from "@/components/reusable/base-modal";
import type { IEvents } from "@/data/events";
import { Button } from "@/components/ui/button";
import CartContainer from "./cart-container";
import { NavLogo } from "@/layouts/root-layout/header/nav-logo";
import { useState, useEffect } from "react";

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  event: IEvents;
  initialTickets?: CartTicket[];
  initialPrice?: number;
}

export default function Cart({
  event,
  initialTickets,
  initialPrice = 0,
}: CartProps) {
  const [totalPrice, setTotalPrice] = useState(initialPrice);
  const [isOpen, setIsOpen] = useState(false);

  const totalQuantity =
    initialTickets?.reduce((sum, ticket) => sum + ticket.quantity, 0) || 0;

  useEffect(() => {
    setTotalPrice(initialPrice);
  }, [initialPrice]);

  return (
    <>
      <Button
        className="flex items-center gap-5 w-full md:w-[378px] h-fit py-4 px-6 bg-bright-green hover:bg-bright-green/80 rounded-sm"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart
            size={57}
            color="var(--foreground)"
            className="size-8"
          />
          {totalQuantity > 0 && (
            <span className="font-sf-pro-display text-xl">{totalQuantity}</span>
          )}
        </div>
        <span className="text-xl font-sf-pro-display">
          {formatNaira(totalPrice)}
        </span>
      </Button>

      <BaseModal
        size="full"
        className="bg-transparent"
        floatingCancel
        onClose={() => setIsOpen(false)}
        open={isOpen}
        hasFooter
        footerContent={
          <footer className="w-[595px] flex flex-col items-center gap-2 pl-[81px] pr-[51px] py-[30px] rounded-t-[20px] self-end ml-auto right-[73px] bg-secondary">
            <div className="w-full flex items-center justify-between font-sf-pro-display">
              <span className="font-light text-2xl">
                {formatNaira(totalPrice)}
              </span>
              <Button className="bg-white text-black hover:bg-white/90">
                Continue
              </Button>
            </div>
          </footer>
        }
      >
        <div className="fixed top-0 left-0 w-full pointer-events-none">
          <NavLogo />
        </div>
        <div className="flex flex-col h-fit w-full justify-center items-center mt-[100px]">
          <CartContainer
            event={event}
            onTotalPriceChange={setTotalPrice}
            initialTickets={initialTickets}
          />
        </div>
      </BaseModal>
    </>
  );
}
