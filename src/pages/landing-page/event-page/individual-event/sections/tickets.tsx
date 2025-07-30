import { BlockName } from "../../_components/block-name";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/format-price";
import { type LucideIcon, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TicketSection({
  layout,
  tickets,
  setTickets,
}: ITicketProps) {
  const updateTicketQuantity = (index: number, newQuantity: number) => {
    setTickets((prev: CartTicket[]) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: Math.max(0, newQuantity),
      };
      return updated;
    });
  };

  return (
    <div
      className={cn("!w-full flex flex-col gap-7", {
        "px-5 lg:px-[120px]": layout === "default",
        "pl-5 lg:pl-[120px]": layout !== "default",
      })}
    >
      <div className="flex items-center gap-5">
        <BlockName name="tickets" />

        <p className="font-sf-pro-display text-xl font-extrabold text-white/60">
          SALE
        </p>
      </div>

      <div
        className={cn("w-full", {
          "flex gap-7 overflow-x-scroll scrollbar-none":
            layout === "carousel-with-flyer" || layout === "no-flyer",
          "grid sm:grid-cols-2 gap-x-5 gap-y-7": layout === "default",
        })}
      >
        {tickets.map((item, index) => (
          <TicketCard
            key={item.name}
            {...item}
            layout={layout}
            onQuantityChange={(newQuantity) =>
              updateTicketQuantity(index, newQuantity)
            }
          />
        ))}
      </div>
    </div>
  );
}

function TicketCard({
  name,
  price,
  quantity,
  onQuantityChange,
  layout,
}: ITicketCard) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display",
        {
          "min-w-[480px] last:mr-5":
            layout === "carousel-with-flyer" || layout === "no-flyer",
          "w-full": layout === "default",
        }
      )}
    >
      <div className="flex flex-col gap-1 font-sf-pro-display text-base font-normal">
        <p>{name}</p>
        <p>{formatNaira(price)}</p>
      </div>

      <div className="flex items-center gap-2 px-3 rounded-full h-12 bg-light-green">
        {quantity > 0 && (
          <>
            <TicketButton
              action={() => onQuantityChange(quantity - 1)}
              Icon={Minus}
            />

            <span className="font-sf-pro-rounded font-bold text-sm">
              {quantity}
            </span>
          </>
        )}

        <TicketButton
          action={() => onQuantityChange(quantity + 1)}
          Icon={Plus}
        />
      </div>
    </div>
  );
}

function TicketButton({ action, Icon }: ITicketButton) {
  return (
    <Button
      variant="ghost"
      className="p-1 w-fit h-fit hover:bg-black/10"
      onClick={action}
    >
      <Icon color="var(--foreground)" size={16} />
    </Button>
  );
}

interface ITicketProps {
  layout: "default" | "no-flyer" | "carousel-with-flyer";
  tickets: CartTicket[];
  setTickets: React.Dispatch<React.SetStateAction<CartTicket[]>>;
}

interface CartTicket {
  name: string;
  price: number;
  quantity: number;
}

interface ITicketButton {
  action: () => void;
  Icon: LucideIcon;
}

interface ITicketCard {
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  layout: ITicketProps["layout"];
}
