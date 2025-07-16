import { VendorHeader } from "@/pages/vendor/component/vendor-header";
import { SearchData } from "@/pages/vendor/component/search-data";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PromoCodeItem } from "@/data/promo-code";
import { promoCodeList } from "@/data/promo-code";

export default function PromoCodesPage() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <VendorHeader type="access-control" />

      <div className="w-full h-full flex flex-col pt-10 pb-14 px-5">
        <div className="w-full h-full bg-white flex flex-col gap-2.5 rounded-[4px]">
          <SearchData />

          <div className="flex flex-col">
            {promoCodeList.map((item) => (
              <PromoCodeList key={item.code} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoCodeList({
  code,
  usage,
  visibility,
  type,
  status,
}: PromoCodeItem) {
  return (
    <div className="flex items-center justify-between px-8 py-5 border-t border-mid-dark-gray/30 last:border-y hover:bg-black/5">
      <p className="font-sf-pro-display text-sm text-black">{code}</p>

      <div className="flex items-center gap-8">
        <p className="font-sf-pro-display text-xs text-black">{usage}</p>
        <p className="font-sf-pro-display text-xs text-black">{visibility}</p>
        <p className="font-sf-pro-display text-xs text-black">{type}</p>

        <Badge
          className={cn(
            "font-sf-pro-display text-xs capitalize p-0 bg-transparent",
            {
              "text-bright-mint": status === "Active",
              "text-deep-red": status === "Disabled",
            }
          )}
        >
          {status}
        </Badge>

        <Info size={20} color="#000000" />
      </div>
    </div>
  );
}
