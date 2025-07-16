import { cn } from "@/lib/utils";

export function FormCount({ idx, name }: { idx: number; name: string }) {
  return (
    <p
      className={cn("text-black font-bold uppercase", {
        hidden: idx === 0,
        flex: idx > 0,
      })}
    >
      {name} {idx + 1}
    </p>
  );
}
