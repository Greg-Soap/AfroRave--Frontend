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
    <div className="max-w-[700px] flex flex-col gap-5 items-center justify-center text-center font-sf-pro text-white uppercase">
      <p className={cn("text-[40px] font-black", className)}>{name}</p>

      {children}
    </div>
  );
}
