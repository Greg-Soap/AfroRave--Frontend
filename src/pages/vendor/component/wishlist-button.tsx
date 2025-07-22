import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

export default function WishListBtn() {
  return (
    <Button
      variant="ghost"
      className="flex items-center gap-1 hover:bg-black/10"
    >
      <span className="text-xs font-sf-pro-display text-black">Wishlist</span>
      <Bookmark color="#AE2323" />
    </Button>
  );
}
