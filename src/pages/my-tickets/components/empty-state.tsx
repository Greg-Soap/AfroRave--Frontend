import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function EmptyState({ type, btn_name, path }: IEmptyState) {
  return (
    <div className="w-[331px] flex flex-col items-center mt-[104px] gap-[37px] font-input-mono mb-[640px]">
      <p className="uppercase text-xl font-bold">no {type} tickets</p>

      <Button
        asChild
        className="w-full h-fit py-2.5 rounded-[10px] bg-white text-sm text-pure-black hover:bg-white/80"
      >
        <Link to={path}>{btn_name}</Link>
      </Button>
    </div>
  );
}

interface IEmptyState {
  type: string;
  btn_name: string;
  path: string;
}
