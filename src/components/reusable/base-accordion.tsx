import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function BaseAccordion({
  style,
  trigger,
  stringContent,
  children,
  isActive,
  icon,
}: IBaseAccordion) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className={cn("flex flex-col w-full", {
          "p-0": style === "dashboard",
        })}
      >
        <AccordionTrigger
          className={cn("hover:no-underline", {
            "items-center justify-between h-[50px] px-6 [&>svg]:hidden":
              style === "dashboard",
          })}
        >
          <div className="flex items-center gap-2.5">
            {/* Icon — turns red when active, gray when not */}
            <span className={cn({
              "text-deep-red": isActive && style === "dashboard",
              "text-black/40": !isActive && style === "dashboard",
            })}>
              {icon}
            </span>
            {/* Text — always black, dims slightly when inactive */}
            <p className={cn("font-sf-pro-display uppercase", {
              "text-[13px] font-normal tracking-widest text-black": style === "dashboard",
              "opacity-40": !isActive && style === "dashboard",
            })}>{trigger}</p>
          </div>

          <div className="flex w-fit h-fit text-black/40">
            <Plus color="currentColor" className="size-[13px]" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col p-0">
          {stringContent}

          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

interface IBaseAccordion {
  style?: "dashboard" | "others";
  trigger: string;
  stringContent?: string;
  children?: React.ReactNode;
  isActive?: boolean;
  icon?: React.ReactNode;
}
