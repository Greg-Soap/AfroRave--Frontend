import { SearchData } from "../component/search-data";
import { VendorHeader } from "../component/vendor-header";
import { slots } from "@/data/slots";
import { VendorItem } from "../component/vendor-item";

export default function ServiceVendorPage() {
  return (
    <section className="w-full h-full flex flex-col items-center">
      <VendorHeader type="service" />

      <div className="w-full h-full flex flex-col pt-10 pb-14 px-5">
        <div className="w-full h-full bg-white flex flex-col gap-2.5 rounded-[4px]">
          <SearchData />

          <div className="w-full flex flex-col">
            {slots.map((item) => (
              <VendorItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
