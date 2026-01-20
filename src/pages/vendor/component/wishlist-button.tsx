import { Button } from "@/components/ui/button";
import { getRoutePath } from "@/config/get-route-path";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function WishListBtn() {
  return (
    <Link to={getRoutePath('vendor_wishlist')}>
      <Button
        variant="ghost"
        className="flex items-center gap-1 hover:bg-black/10"
      >
        <span className="text-xs font-sf-pro-display text-black">Wishlist</span>
        <Bookmark color="#AE2323" />
      </Button>
    </Link>
  );
}
