import { CalendarIcon } from '@/components/icons/calendar'
import { DashboardCardSkeleton, DashboardCards } from '@/components/shared/dashboard-cards'
import { getRoutePath } from '@/config/get-route-path'
import { useGetVendorAvailableEvents } from '@/hooks/use-event-mutations'
import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'
import { Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import WishListBtn from '../component/wishlist-button'

const SKELETON_IDS = ['1', '2', '3', '4', '5', '6']

export default function VendorDiscoverPage() {
  const { data: response, isPending: isLoading } = useGetVendorAvailableEvents()

  const events = response?.data

  if (isLoading) {
    return (
      <section className='w-full h-full flex flex-col justify-start items-start px-[1px]'>
        <div className='w-full h-14 flex items-center justify-between px-8 bg-white'>
          <AddFilterBUtton />
          <WishListBtn />
        </div>
        <div className='flex flex-wrap gap-7 px-5 md:px-[60px] lg:px-[120px] py-6 md:py-12 lg:py-24'>
          {SKELETON_IDS.map((id) => (
            <DashboardCardSkeleton key={id} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className='w-full h-full flex flex-col justify-start items-start px-[1px]'>
      <div className='w-full h-14 flex items-center justify-between px-8 bg-white'>
        <AddFilterBUtton />
        <WishListBtn />
      </div>

      {events && events.length > 0 ? (
        <div className='flex flex-wrap gap-7 px-5 md:px-[60px] lg:px-[120px] py-6 md:py-12 lg:py-24'>
          {events.map((event) => (
            <DiscoverCard
              key={event.eventId}
              eventId={event.eventId}
              image={event.metadata.desktopMedia.flyer}
              name={event.eventName}
              startDate={event.startDate}
              category={event.category}
            />
          ))}
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <div className='w-fit flex items-center gap-1 stroke-medium-gray text-medium-gray'>
            <CalendarIcon stroke='inherit' className='size-8' />
            <p className='text-2xl font-bold font-sf-pro-display uppercase'>no available events</p>
          </div>
        </div>
      )}
    </section>
  )
}

function DiscoverCard({ eventId, image, name, startDate, category }: IDiscoverCardProps) {
  return (
    <Link to={getRoutePath('individual_event', { eventId })}>
      <DashboardCards
        image={image}
        name={name}
        startDate={startDate}
        cardButtons={[
          { Icon: Bookmark, alt: 'Bookmark' },
          { src: '/assets/dashboard/creator/ellipses.png', alt: 'Ellipses' },
        ]}
        cardInfo={[
          <p key='category' className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
            Category: <span className='text-[#34C759] font-medium'>{category}</span>
          </p>,
        ]}
        className='grid-cols-2'
      />
    </Link>
  )
}

interface IDiscoverCardProps {
  eventId: string
  image: string
  name: string
  startDate: string
  category: string
}
