import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { getRoutePath } from "@/config/get-route-path";
import { cn } from "@/lib/utils";

export function FooterLinks({ type = "root" }: { type?: "root" | "account" }) {
  return (
    <div
      className={cn("w-full flex gap-2.5 font-sf-pro-rounded h-5", {
        "max-md:flex-col md:items-center md:h-5": type === "root",
        "items-center justify-center": type === "account",
      })}
    >
      <Link
        to={getRoutePath("privacy_policy")}
        className="font-light hover:underline text-sm"
      >
        Privacy Policy
      </Link>

      <Separator
        orientation="vertical"
        className="h-full bg-white max-md:hidden"
      />

      <Link
        to={getRoutePath("terms_and_conditions")}
        className="font-light hover:underline text-sm"
      >
        Terms & Conditions
      </Link>
    </div>
  );
}
