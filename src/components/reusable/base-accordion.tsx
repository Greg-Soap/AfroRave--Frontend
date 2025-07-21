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
            "items-center justify-between h-[64px] px-6 [&>svg]:hidden":
              style === "dashboard",
          })}
        >
          <div
            className={cn("flex items-center gap-1", {
              "opacity-100 stroke-deep-red": isActive && style === "dashboard",
              "opacity-50 stroke-black": !isActive && style === "dashboard",
            })}
          >
            {icon}
            <p className="font-sf-pro-display text-sm text-black">{trigger}</p>
          </div>

          <div className="flex w-fit h-fit">
            <Plus color="#000000" className="size-[15px]" />
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
