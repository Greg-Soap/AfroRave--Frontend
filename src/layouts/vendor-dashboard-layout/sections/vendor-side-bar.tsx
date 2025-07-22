import { BaseSideBar } from "@/components/reusable/base-sidebar";
import { getRoutePath } from "@/config/get-route-path";
import { CalendarIcon } from "@/components/icons/calendar";
import { VendorIcon } from "@/components/icons/vendor";
import { SlotIcon } from "@/components/icons/slots";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export default function VendorSidebar() {
  const location = useLocation();

  return (
    <BaseSideBar className="pt-24 sticky top-0" collapsibleOnMobile={true}>
      {creator_sidebar_links.map((item) => {
        const isActiveLink = location.pathname === item.href;

        return (
          <Link
            key={item.text}
            to={item.href}
            className={cn(
              "w-full flex gap-2 items-center px-6 h-[64px] text-xs font-sf-pro-text uppercase transition-colors duration-300",
              {
                "border-l-[3px] bg-deep-red/16 border-l-deep-red text-black stroke-deep-red":
                  isActiveLink,
                "text-black/60 hover:bg-deep-red/10 stroke-black":
                  !isActiveLink,
              }
            )}
          >
            {item.icon}
            {item.text}
          </Link>
        );
      })}
    </BaseSideBar>
  );
}

const creator_sidebar_links: ICreatorSidebarLinks[] = [
  {
    icon: <VendorIcon />,
    text: "PROFILE",
    href: getRoutePath("vendor_profile"),
  },
  {
    icon: <CalendarIcon />,
    text: "DISCOVER",
    href: getRoutePath("vendor_discover"),
  },
  {
    icon: <SlotIcon />,
    text: "MY SLOTS",
    href: getRoutePath("vendor_slots"),
  },
];

export interface ICreatorSidebarLinks {
  icon: React.ReactNode;
  text: string;
  href: string;
}
