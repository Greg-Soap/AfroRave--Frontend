import { ShoppingCart } from "lucide-react";
import Cart from "../../cart";
import type { IEvents } from "@/data/events";
import { cn } from "@/lib/utils";

export default function CartTrigger({
  totalQuantity,
  event,
  tickets,
  calculateTotalPrice,
  className,
}: ICartTriggerProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex h-fit gap-[11px] py-4 px-2 rounded-[6px] bg-deep-red">
        <ShoppingCart size={24} color="#ffffff" />
        <p className="h-6 rounded-full bg-white px-3 text-sm font-semibold font-sf-pro-display text-black flex items-center justify-center">
          {totalQuantity}
        </p>
      </div>
      <div className="w-full">
        <Cart
          event={event}
          initialTickets={tickets}
          initialPrice={calculateTotalPrice()}
        />
      </div>
    </div>
  );
}

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

interface ICartTriggerProps {
  totalQuantity: number;
  event: IEvents;
  tickets: CartTicket[];
  calculateTotalPrice: () => number;
  className?: string;
}
