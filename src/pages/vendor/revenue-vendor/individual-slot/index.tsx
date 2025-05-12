import { useParams } from "react-router-dom";
import { slots } from "@/data/slots";
import { SearchData } from "../../component/search-data";
import { IndividualHeader } from "../../component/individual-header";
import { IndividualVendorItem } from "../../component/individual-vendor-item";

export default function IndividualSlots() {
  const { slotId } = useParams();
  const slot = slots.find((item) => item.id === Number(slotId));

  return (
    <section className="w-full h-full flex flex-col items-center">
      <IndividualHeader name={slot ? slot.name : "Slot Name"} />

      <div className="w-full h-full flex flex-col pt-10 pb-14 px-5">
        <div className="w-full h-full bg-white flex flex-col gap-2.5 rounded-[4px]">
          <SearchData />

          <div className="w-full flex flex-col">
            {slot ? (
              <>
                {slot.vendors.map((item) => (
                  <IndividualVendorItem key={item.id} {...item} />
                ))}
              </>
            ) : (
              <p className="text-black w-full text-center opacity-60">
                No Vendors Found!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
