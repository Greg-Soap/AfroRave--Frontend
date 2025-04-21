import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useState } from "react";
import { formatNaira } from "@/utils/format-price";
import { Button } from "../ui/button";
import clsx from "clsx";

const SHEET_SIZES = {
  default: "max-w-fit",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "max-w-full h-full sm:overflow-y-auto",
} as const;

const sheetVariants = cva("gap-10 border-none", {
  variants: {
    size: SHEET_SIZES,
  },
  defaultVariants: {
    size: "md",
  },
});

export default function CustomSheet({
  open = false,
  hasFooter = true,
  setOpen,
  side = "right",
  size = "md",
  title,
  description,
  trigger,
  triggerClassName = "",
  contentClassName = "",
  children,
  hasNav = false,
  navChildren,
}: CustomSheetProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open);
    setOpen?.(open);
  };

  return (
    <Sheet open={open ? open : internalOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <SheetTrigger className={triggerClassName}>{trigger}</SheetTrigger>
      )}
      <SheetContent
        side={side}
        className={cn(
          contentClassName,
          sheetVariants({ size }),
          `${hasNav ? "[&>button]:hidden scrollbar-none" : ""}`
        )}
      >
        {hasNav && <SheetNav>{navChildren}</SheetNav>}

        <SheetHeader className="w-full flex flex-col items-center justify-center font-input-mono sr-only">
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription className="text-lg">{description}</SheetDescription>
        </SheetHeader>

        {children}

        {hasFooter && <SheetFooter />}
      </SheetContent>
    </Sheet>
  );
}

function SheetNav({
  children,
  closeFunction,
}: {
  children: ReactNode;
  closeFunction?: CustomSheetProps["closeFunction"];
}) {
  return (
    <nav
      className={clsx(
        "max-w-[1536px] w-full flex items-center px-[1rem] md:px-[2rem] fixed top-0  backdrop-blur-sm",
        {
          "justify-end py-3 bg-transparent": !children,
          "bg-white/10 justify-between": children,
        }
      )}
    >
      {children}
      <SheetClose
        onClick={closeFunction}
        className="p-2 hover:bg-white/10 rounded-lg"
      >
        <X />
      </SheetClose>
    </nav>
  );
}

function SheetFooter() {
  return (
    <footer className="w-fit flex flex-col items-center gap-2 px-5 py-3 rounded-t-[20px] sticky bottom-0 left-[calc(100%-450px)] bg-accent">
      <div className="w-full flex items-center justify-between font-sf-pro-display">
        <span className="font-light text-2xl">{formatNaira(73350)}</span>
        <Button className="bg-white text-black hover:bg-white/90">
          Continue
        </Button>
      </div>

      <p className="font-input-mono text-sm opacity-70">
        Please checkout within 10:00 minutes
      </p>
    </footer>
  );
}

type SheetVariantProps = VariantProps<typeof sheetVariants>;

interface CustomSheetProps extends SheetVariantProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  trigger?: ReactNode;
  triggerClassName?: string;
  title: string;
  description: string;
  children: ReactNode;
  contentClassName?: string;
  hasNav?: boolean;
  navChildren?: ReactNode;
  hasFooter?: boolean;
  closeFunction?: () => void;
}
