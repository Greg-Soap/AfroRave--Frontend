import type { ICustomSelectProps } from "./reusable/base-select";
import { getRoutePath } from "@/config/get-route-path";

export const date_list: ICustomSelectProps = {
  defaultValue: "jan",
  placeholder: "Select Date",
  items: [
    { value: "jan", label: "January" },
    { value: "feb", label: "February" },
    { value: "mar", label: "March" },
    { value: "apr", label: "April" },
    { value: "may", label: "May" },
    { value: "jun", label: "June" },
    { value: "jul", label: "July" },
    { value: "aug", label: "August" },
    { value: "sep", label: "September" },
    { value: "oct", label: "October" },
    { value: "nov", label: "November" },
    { value: "dec", label: "December" },
  ],
};

export const account_links: { link: string; icon: string; name: string }[] = [
  {
    link: getRoutePath("profile"),
    icon: "/assets/harmburger/round-user.png",
    name: "Account",
  },
  {
    link: getRoutePath("my_tickets"),
    icon: "/assets/harmburger/ticket.png",
    name: "My Tickets",
  },
  {
    link: getRoutePath("listed_tickets"),
    icon: "/assets/harmburger/ticket.png",
    name: "Listed Tickets",
  },
];
