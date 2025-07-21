import {
  Sidebar,
  SidebarMenu,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { BaseAccordion } from "./base-accordion";
import { Link } from "react-router-dom";
import type { ICreatorSidebarLinks } from "@/layouts/creator-dashboard-layout/creator-side-bar";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function BaseSideBar({
  side = "left",
  variant = "sidebar",
  collapsible = "none",
  className,
  contentClassName,
  sidebar_links,
  collapsibleOnMobile = false,
  children,
}: IBaseSidebar) {
  const location = useLocation();
  const isMobile = useIsMobile();

  const effectiveCollapsible =
    collapsibleOnMobile && isMobile ? "offcanvas" : collapsible;

  return (
    <Sidebar
      side={side}
      variant={variant}
      collapsible={effectiveCollapsible}
      className={cn(className, "w-[320px] min-h-screen h-fit bg-white")}
    >
      <SidebarContent className={cn(contentClassName, "flex flex-col")}>
        <SidebarGroup className="px-0">
          <SidebarGroupLabel className="sr-only">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebar_links?.map((item) => {
                const isActive = item.links.some(
                  (link) =>
                    location.pathname === link.path ||
                    location.pathname.startsWith(`${link.path}/`)
                );

                return (
                  <AccordionSidebarMenuItem
                    key={item.trigger.text}
                    links={item.links}
                    trigger={item.trigger.text}
                    isActive={isActive}
                    icon={item.trigger.icon}
                  />
                );
              })}

              {children}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function AccordionSidebarMenuItem({
  links,
  trigger,
  isActive,
  icon,
}: {
  links: ICreatorSidebarLinks["links"];
  trigger: string;
  isActive: boolean;
  icon: React.ReactNode;
}) {
  const location = useLocation();

  return (
    <BaseAccordion
      style="dashboard"
      icon={icon}
      trigger={trigger}
      isActive={isActive}
    >
      {links.map((item) => {
        const isActiveLink =
          location.pathname === item.path ||
          location.pathname.startsWith(`${item.path}/`);

        return (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "w-full flex items-center px-6 h-[64px] text-xs font-sf-pro-text uppercase transition-colors duration-300",
              {
                "border-l-[3px] bg-deep-red/16 border-l-deep-red text-black":
                  isActiveLink,
                "text-black/60 hover:bg-deep-red/10": !isActiveLink,
              }
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </BaseAccordion>
  );
}

interface IBaseSidebar {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "none" | "offcanvas" | "icon";
  className?: string;
  contentClassName?: string;
  sidebar_links?: ICreatorSidebarLinks[];
  collapsibleOnMobile?: boolean;
  children?: React.ReactNode;
}
