import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useState } from "react";

const SHEET_SIZES = {
  default: "max-w-fit",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "max-w-full h-full overflow-y-auto",
} as const;

const sheetVariants = cva(
  "gap-0 border-none flex flex-col items-center scrollbar-none",
  {
    variants: {
      size: SHEET_SIZES,
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export default function BaseSheet({
  open = false,
  footerContent,
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
  circleCancel = false,
}: CustomSheetProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open);
    setOpen?.(open);
  };

  return (
    <div className="relative w-full h-full">
      <Sheet open={open ? open : internalOpen} onOpenChange={handleOpenChange}>
        {trigger && (
          <SheetTrigger className={triggerClassName}>{trigger}</SheetTrigger>
        )}
        <SheetContent
          side={side}
          circleCancel={circleCancel}
          className={cn(
            contentClassName,
            sheetVariants({ size }),
            `${hasNav ? "[&>button]:hidden" : ""}`
          )}
        >
          <div className="relative flex flex-col items-center w-full h-full">
            <div className="fixed h-full inset-0 bg-gradient-to-t from-[#2d2d2d] via-[#2d2d2d]/80 to-[#2d2d2d]/60 backdrop-blur-xs" />

            {hasNav && <SheetNav>{navChildren}</SheetNav>}

            <SheetHeader className="w-full flex flex-col items-center justify-center font-input-mono sr-only z-10">
              <SheetTitle className="text-2xl">{title}</SheetTitle>
              <SheetDescription className="text-lg">
                {description}
              </SheetDescription>
            </SheetHeader>

            {children}

            {footerContent && (
              <SheetFooter className="sticky bottom-0 pt-4 left-full mr-[73px] z-[11]">
                {footerContent || null}
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
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
      className={cn(
        "w-full flex items-center px-[1rem] md:px-[2rem] sticky top-0 z-[13]",
        {
          "justify-end py-3 bg-transparent": !children,
          "justify-between": children,
        }
      )}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 h-full bg-black/25 backdrop-blur-sm`}
      />

      <div className="z-[10]">{children}</div>

      <SheetClose
        onClick={closeFunction}
        className="p-2 hover:bg-white/10 rounded-lg w-fit h-fit z-[11]"
      >
        <X />
      </SheetClose>
    </nav>
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
  description?: string;
  contentClassName?: string;
  children: ReactNode;
  hasNav?: boolean;
  navChildren?: ReactNode;
  footerContent?: ReactNode;
  closeFunction?: () => void;
  circleCancel?: boolean;
}
