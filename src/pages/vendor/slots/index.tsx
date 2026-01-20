import { CalendarIcon } from '@/components/icons/calendar'
import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'
import { DashboardCards } from "@/components/shared/dashboard-cards"
import { Bookmark } from "lucide-react"
import { Link } from 'react-router-dom'
import { getRoutePath } from '@/config/get-route-path'

// Mock Data
const MOCK_EVENTS = [
  {
    id: '1',
    image: '/assets/landing-page/s1.png',
    name: 'Blackmarket Flea',
    startDate: 'Oct 29, 1:00 AM',
    secured_slots: 10,
  }
]

export default function VendorSlotPage() {
  const events = MOCK_EVENTS

  return (
    <section className='w-full h-full flex flex-col justify-start items-start px-[1px]'>
      <div className='w-full h-14 flex items-center justify-between px-4 md:px-8 bg-white'>
        <AddFilterBUtton />
      </div>

      {events.length === 0 ? (
        <div className='w-full h-full flex flex-col items-center justify-center px-4 md:px-8'>
          <div className='w-fit flex items-center gap-2 stroke-medium-gray text-medium-gray'>
            <CalendarIcon stroke='inherit' className='size-6 md:size-8' />
            <p className='text-lg md:text-2xl font-bold font-sf-pro-display uppercase'>no scheduled events</p>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 md:px-8 lg:px-16 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {events.map((event) => (
              <Link key={event.id} to={getRoutePath('vendor_slot_details', { eventId: event.id })}>
                <DiscoverCards
                  image={event.image || '/placeholder.png'}
                  name={event.name}
                  secured_slots={event.secured_slots}
                  startDate={event.startDate}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function DiscoverCards({ image, name, secured_slots, startDate }: IDiscoverCardProps) {
  return (
    <DashboardCards
      image={image}
      name={name}
      startDate={startDate}
      // status="ended" // Optional
      className="w-full"
      cardButtons={[
        { Icon: Bookmark, alt: "Bookmark" },
        { src: "/assets/dashboard/creator/ellipses.png", alt: "Ellipses" },
      ]}
      cardInfo={[
        <p
          key="available_slot"
          className="font-sf-pro-rounded text-xs text-mid-dark-gray"
        >
          Secured Slots:{" "}
          <span className="text-[#34C759] font-medium">{secured_slots}</span>
        </p>,
      ]}
    />
  );
}

interface IDiscoverCardProps {
  image: string;
  name: string;
  secured_slots: number;
  startDate: string;
}
