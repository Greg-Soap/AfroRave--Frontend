import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatNaira } from '@/lib/format-price'
import { AddFilterBUtton } from './components/add-filter-btn'
import { getRoutePath } from '@/config/get-route-path'
import StandAloneModal from './components/standalone-modal'
import VendorSelect from '@/components/shared/vendor-select'
import { BasePopover } from '@/components/reusable'
import { DashboardCards, DashboardCardSkeleton } from '@/components/shared/dashboard-cards'
import { useGetOrganizerEvents, useGetEvent } from '@/hooks/use-event-mutations'
import { LoadingFallback } from '@/components/loading-fallback'

export default function StandalonePage() {
  const { data: response, isPending: isLoading } = useGetOrganizerEvents()

  const events = response?.data

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <section className='w-full h-full flex flex-col items-center gap-14 lg:gap-24 mb-[75px]'>
      <StandAloneHeader />

      <div className='max-w-[836px] w-full flex flex-wrap justify-center gap-7'>
        {events && events.length > 0 ? (
          <>
            {events.map((item) => (
              <StandAloneEvents key={item.eventId} id={item.eventId} />
            ))}
          </>
        ) : (
          <div className='w-full h-[300px] flex flex-col gap-2.5 items-center justify-center'>
            <p className='text-3xl text-charcoal font-semibold'>No event found</p>
            <Button asChild>
              <Link to={getRoutePath('add_event')}>Create an event</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function StandAloneHeader() {
  return (
    <div className='w-full flex items-center justify-between bg-white h-14 px-5 lg:px-8 border-l border-light-gray'>
      <AddFilterBUtton />

      <div className='flex items-center gap-3 md:gap-8'>
        <VendorSelect />

        <Button variant='destructive' className='p-3 h-8 rounded-[6px] gap-2 md:gap-8' asChild>
          <Link to={getRoutePath('add_event')}>
            <Plus color='#ffffff' size={12} />
            <span className='font-sf-pro-text text-xs'>Add Event</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

function StandAloneEvents({ id }: { id: string }) {
  const { data: response, isPending: isLoading } = useGetEvent(id)

  const event = response?.data

  if (isLoading) {
    return <DashboardCardSkeleton />
  }

  if (!event) {
    return
  }

  return (
    <DashboardCards
      image={event.eventDetails.desktopMedia?.flyer}
      name={event.eventName}
      startDate={event.eventDate.startDate}
      status={event.isPublished ? undefined : 'DRAFT'}
      cardInfo={[
        <p key='sold_items' className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
          Sold: <span className='text-black font-medium'>{event.eventStat.ticketSold || 0}</span> /{' '}
          {event.eventStat.totalTicket}
        </p>,

        <p key='profit' className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
          Net Profit:{' '}
          <span className='text-black font-medium'>{formatNaira(event.eventStat.netProfit)}</span>
        </p>,
      ]}
      cardButtons={event_buttons}
      customButton={[
        <BasePopover
          key='popover_trigger'
          className='bg-black/50'
          trigger={
            <Button
              variant='ghost'
              className='flex items-center justify-center hover:bg-black/10 rounded-none border-l border-semi-light-gray/28'>
              <img
                src='/assets/dashboard/creator/ellipses.png'
                alt='Ellipses'
                width={12}
                height={10}
              />
            </Button>
          }
          content={<PopoverContent id={id} />}
        />,
      ]}
    />
  )
}

function PopoverContent({ id }: { id: string }) {
  return (
    <div className='w-[117px] flex flex-col bg-black/50 rounded-[5px] p-1 gap-1 text-xs font-sf-pro-text'>
      <Link
        to={getRoutePath('edit_event', { eventId: id })}
        className='text-white border-b border-white h-[22px] hover:bg-black/80'>
        Edit Event
      </Link>
      <Link
        to={getRoutePath('individual_event', { eventId: id })}
        className='border-b border-white text-white h-[22px] hover:bg-black/80'>
        View Event
      </Link>
      <StandAloneModal id={id} />
      <Button
        variant='ghost'
        className='flex h-[22px] items-center bg-transparent rounded-none text-xs text-white font-sf-pro-text px-0 justify-start hover:bg-black/80 hover:text-white'>
        Copy Link
      </Button>
    </div>
  )
}

const event_buttons: { src: string; alt: string }[] = [
  { src: '/assets/dashboard/creator/chart2.png', alt: 'Chart' },
  {
    src: '/assets/dashboard/creator/group-user.png',
    alt: 'Group User',
  },
]
