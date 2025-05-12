export interface PromoCodeItem {
  code: string;
  usage: string; // e.g., "10/50"
  visibility: "Public" | "Private";
  type: "Ticket" | "Partnership";
  status: "Active" | "Disabled";
}

export const promoCodeList: PromoCodeItem[] = [
  {
    code: "EARLYBIRD25",
    usage: "10/50",
    visibility: "Private",
    type: "Ticket",
    status: "Active",
  },
  {
    code: "EARLYBIRD65",
    usage: "40/50",
    visibility: "Public",
    type: "Ticket",
    status: "Disabled",
  },
  {
    code: "#DJSPINALL12",
    usage: "40/50",
    visibility: "Public",
    type: "Partnership",
    status: "Active",
  },
];
