import { cn } from "@/lib/utils";

export function TextSectionContainer({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full max-w-[700px] flex flex-col gap-4 md:gap-5 items-center justify-center text-center font-sf-pro text-white uppercase px-5 md:px-0">
      <p className={cn("text-2xl md:text-[40px] font-black leading-tight tracking-wide", className)}>{name}</p>

      <div className="flex flex-col gap-4 text-xs md:text-base leading-relaxed md:leading-normal font-light tracking-wide">
        {children}
      </div>
    </div>
  );
}
