import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function LinkButton({ href, name }: { href: string; name: string }) {
  return (
    <Button
      asChild
      className="max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px]"
    >
      <Link to={href}>{name}</Link>
    </Button>
  );
}
