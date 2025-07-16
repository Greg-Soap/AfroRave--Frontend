import { Button } from "@/components/ui/button";

export function SkipBtn({
  action,
  name,
}: {
  action: () => void;
  name?: string;
}) {
  return (
    <Button
      type="button"
      onClick={action}
      className="w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase bg-black text-white hover:bg-black hover:text-white"
    >
      {name ? name : "SKIP"}
    </Button>
  );
}
