// import { Bookmark } from "lucide-react";
// import { DashboardCards } from "@/components/custom/dashboard-cards";
import { CalendarIcon } from '@/components/icons/calendar'
import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'

export default function VendorSlotPage() {
  return (
    <section className='w-full h-full flex flex-col justify-start items-start px-[1px]'>
      <div className='w-full h-14 flex items-center justify-between px-8 bg-white'>
        <AddFilterBUtton />
      </div>

      <div className='w-full h-full flex flex-col items-center justify-center'>
        <div className='w-fit flex items-center gap-1 stroke-medium-gray text-medium-gray'>
          <CalendarIcon stroke='inherit' className='size-8' />
          <p className='text-2xl font-bold font-sf-pro-display uppercase'>no scheduled events</p>
        </div>
      </div>

      {/* Uncomment this section when you have events to display **/}

      {/* <div className="flex flex-wrap gap-7 px-5 md:px-[60px] lg:px-[120px] py-6 md:py-12 lg:py-24">
        <DiscoverCards
          image="/assets/landing-page/s1.png"
          name="Punk fest, unleash your inner rebel"
          available_slots={10}
        />
      </div> */}
    </section>
  )
}

// function DiscoverCards({ image, name, available_slots }: IDiscoverCardProps) {
//   return (
//     <DashboardCards
//       image={image}
//       name={name}
//       status="ended"
//       className="grid-cols-2"
//       cardButtons={[
//         { Icon: Bookmark, alt: "Bookmark" },
//         { src: "/assets/dashboard/creator/ellipses.png", alt: "Ellipses" },
//       ]}
//       cardInfo={[
//         <p
//           key="available_slot"
//           className="font-sf-pro-rounded text-xs text-mid-dark-gray"
//         >
//           Secured Slots:{" "}
//           <span className="text-[#34C759] font-medium">{available_slots}</span>
//         </p>,
//       ]}
//     />
//   );
// }

// interface IDiscoverCardProps {
//   image: string;
//   name: string;
//   available_slots: number;
// }
