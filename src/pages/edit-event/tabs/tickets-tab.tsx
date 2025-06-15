import { Button } from "@/components/ui/button";
import { Plus, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TicketsTab() {
  return (
    <div className="w-full flex flex-col gap-14 p-14">
      <div className="flex flex-col pl-2 gap-[13px]">
        <div className="flex items-center justify-between">
          <p className="font-sf-pro-display font-black text-black text-xl">
            Ticket Types
          </p>

          <Button className="hover:bg-black/10 rounded-[5px] bg-white flex items-center gap-1.5 px-2 py-[13px] font-sf-pro-text font-medium text-deep-red text-[11px]">
            <Plus size={12} />
            ADD TICKET
          </Button>
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <TicketCard key={i} />
        ))}
      </div>

      <TicketSales />
    </div>
  );
}

function TicketSales() {
  return (
    <div className="w-full bg-white p-8 flex flex-col gap-5 rounded-[10px]">
      <div className="flex items-center gap-1">
        <img
          src="/assets/harmburger/ticket.png"
          alt="Ticket"
          className="size-5"
        />
        <p className="text-black font-medium text-xl font-sf-pro-display">
          Ticket Sales
        </p>
      </div>

      <TicketSalesTable />
    </div>
  );
}

function TicketSalesTable() {
  return (
    <Table className="w-full">
      <TableCaption className="sr-only text-black">
        A table of your ticket sales.
      </TableCaption>
      <TableHeader className="bg-charcoal">
        <TableRow className="hover:bg-charcoal">
          {["Ticket Name", "Ticket Sold", "Price", "Status"].map((item) => (
            <TableHead
              key={item}
              className="text-xs font-sf-pro-rounded font-semibold capitalize first:rounded-tl-[5px] last:rounded-tr-[5px]"
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-x border-b border-charcoal/50 rounded-b-[5px]">
        {ticketData.map((ticket) => (
          <TableRow
            key={ticket.ticketName}
            className="text-xs text-black font-sf-pro-rounded capitalize"
          >
            <TableCell className="text-inherit">{ticket.ticketName}</TableCell>
            <TableCell className="text-inherit">{ticket.ticketSold}</TableCell>
            <TableCell className="text-inherit">{ticket.price}</TableCell>
            <TableCell className="text-inherit">{ticket.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TicketCard() {
  return (
    <div className="w-full h-16 bg-white py-4 pl-3 pr-1 rounded-[8px] flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Button
          variant="ghost"
          className="py-0 px-1 w-fit h-fit hover:bg-black/20"
        >
          <img src="/assets/event/menu.png" alt="Grip" className="size-4" />
        </Button>
        <p className="text-sm text-black font-sf-pro-display">Vip Access</p>
      </div>

      <Button variant="ghost" className="p-1 !w-fit h-fit hover:bg-black/20">
        <EllipsisVertical className="w-[3px] h-[13px]" color="#000000" />
      </Button>
    </div>
  );
}

const ticketData: ITicketData[] = [
  {
    ticketName: "General Admission",
    ticketSold: "1000/1200",
    price: "₦20,000",
    status: "ONGOING",
  },
  {
    ticketName: "Vip Access",
    ticketSold: "150/150",
    price: "₦100,000",
    status: "SOLD OUT",
  },
  {
    ticketName: "Standard Premium",
    ticketSold: "80/100",
    price: "₦50,000",
    status: "ONGOING",
  },
  {
    ticketName: "Standard",
    ticketSold: "500/500",
    price: "₦25,000",
    status: "ONGOING",
  },
];

interface ITicketData {
  ticketName: string;
  ticketSold: string;
  price: string;
  status: "ONGOING" | "SOLD OUT";
}
