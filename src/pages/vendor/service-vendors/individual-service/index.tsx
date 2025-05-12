import { useParams } from "react-router-dom";
import { services } from "@/data/services";
import { SearchData } from "../../component/search-data";
import { IndividualHeader } from "../../component/individual-header";
import { IndividualVendorItem } from "../../component/individual-vendor-item";

export default function IndividualServicePage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === Number(serviceId));

  return (
    <section className="w-full h-full flex flex-col items-center">
      <IndividualHeader name={service ? service.name : "Service Name"} />

      <div className="w-full h-full flex flex-col pt-10 pb-14 px-5">
        <div className="w-full h-full bg-white flex flex-col gap-2.5 rounded-[4px]">
          <SearchData />

          <div className="w-full flex flex-col">
            {service ? (
              <>
                {service.vendors.map((item) => (
                  <IndividualVendorItem key={item.id} {...item} />
                ))}
              </>
            ) : (
              <p className="text-black w-full text-center opacity-60">
                No Services Found!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
