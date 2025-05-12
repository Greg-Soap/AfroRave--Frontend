export interface AccessControlItem {
  name: string;
  action: string;
  status: string;
}

export const accessControlList: AccessControlItem[] = [
  {
    name: "Henry William",
    action: "Check-In Ticket",
    status: "Pending",
  },
  {
    name: "Henry William",
    action: "Sell Ticket",
    status: "Active",
  },
];
