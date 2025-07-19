import { BaseSideBar } from "@/components/reusable/base-sidebar";
import { getRoutePath } from "@/config/get-route-path";

export default function CreatorSidebar() {
  return (
    <BaseSideBar
      className="pt-24 sticky top-0"
      sidebar_links={creator_sidebar_links}
      collapsibleOnMobile={true}
    />
  );
}

const creator_sidebar_links: ICreatorSidebarLinks[] = [
  {
    trigger: { icon: "/assets/dashboard/creator/event.png", text: "EVENTS" },
    links: [
      { path: getRoutePath("standalone"), name: "STANDALONE" },
      { path: getRoutePath("season"), name: "SEASON" },
    ],
  },
  {
    trigger: { icon: "/assets/harmburger/ticket.png", text: "ANALYTICS" },
    links: [
      { path: getRoutePath("reports"), name: "REPORTS" },
      { path: getRoutePath("charts"), name: "CHARTS" },
      { path: getRoutePath("realtime"), name: "REALTIME" },
    ],
  },
  {
    trigger: { icon: "/assets/harmburger/ticket.png", text: "VENDOR" },
    links: [
      { path: getRoutePath("revenue_vendor"), name: "REVENUE VENDOR" },
      { path: getRoutePath("service_vendor"), name: "SERVICE VENDOR" },
    ],
  },
  {
    trigger: { icon: "/assets/harmburger/ticket.png", text: "TOOLS" },
    links: [
      { path: getRoutePath("access_control"), name: "ACCESS CONTROL" },
      { path: getRoutePath("promo_codes"), name: "PROMO CODES" },
      { path: getRoutePath("seating_maps"), name: "SEATING MAPS" },
    ],
  },
];

export interface ICreatorSidebarLinks {
  trigger: { icon: string; text: string };
  links: { path: string; name: string }[];
}
