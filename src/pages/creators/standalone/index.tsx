import { LoadingFallback } from '@/components/loading-fallback'
import { BasePopover } from '@/components/reusable'
import { DashboardCardSkeleton, DashboardCards } from '@/components/shared/dashboard-cards'
import VendorSelect from '@/components/shared/vendor-select'
import { Button } from '@/components/ui/button'
import { getRoutePath } from '@/config/get-route-path'
import { useDeleteEvent, useGetEvent, useGetOrganizerEvents } from '@/hooks/use-event-mutations'
import { formatNaira } from '@/lib/format-price'
import type { EventDetailData } from '@/types'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AddFilterBUtton } from './components/add-filter-btn'
import StandAloneModal from './components/standalone-modal'
// import { useDeleteEvent } from '@/hooks/use-event-mutations'

export default function StandalonePage() {
  const { data: response, isPending: isLoading } = useGetOrganizerEvents()

  const events = response?.data

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <section className='w-full h-full flex flex-col items-center gap-14 mb-[75px]'>
      <StandAloneHeader />

      <div className='max-w-[1099px] w-full flex flex-wrap gap-5 px-10'>
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
      status={event.isPublished ? undefined : 'drafts'}
      cardInfo={[
        <StatParagraph
          key='sold_tickets'
          name='Sold'
          stats={{ value: event.eventStat.ticketSold, totalValue: event.eventStat.totalTicket }}
        />,
        <StatParagraph
          key='profit'
          name='Net Profit'
          stats={{ totalValue: formatNaira(event.eventStat.netProfit) }}
        />,
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
          content={<PopoverContent event={event} />}
        />,
      ]}
    />
  )
}

function PopoverContent({ event }: { event: EventDetailData }) {
  const eventLink = getRoutePath('individual_event', { eventId: event.eventId })

  const deleteEventMutation = useDeleteEvent()

  return (
    <div className='w-[117px] flex flex-col bg-black/50 rounded-[5px] p-1 gap-1 text-xs font-sf-pro-text'>
      {[
        { href: getRoutePath('edit_event', { eventId: event.eventId }), name: 'Edit Event' },
        { href: eventLink, name: 'View Event' },
      ].map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className='text-white border-b border-white h-[22px] hover:bg-black/80 px-1'>
          {item.name}
        </Link>
      ))}

      <StandAloneModal event={event} />

      <Button
        onClick={() => copyToClipboard(eventLink)}
        variant='ghost'
        className='flex h-[22px] items-center bg-transparent rounded-none text-xs text-white font-sf-pro-text px-1 justify-start hover:bg-black/80 hover:text-white'>
        Copy Link
      </Button>
      <Button
        onClick={() => deleteEventMutation.mutate(event.eventId)}
        variant='ghost'
        className='flex h-[22px] items-center bg-transparent rounded-none text-xs text-white font-sf-pro-text px-1 justify-start hover:bg-black/80 hover:text-white'>
        Delete Event
      </Button>
    </div>
  )
}

function StatParagraph({ key, name, stats }: IStatParagraph) {
  return (
    <p key={key} className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
      {name}: <span className='text-black font-medium'>{stats.value}</span>
      {typeof stats.value === 'number' ? <span> / </span> : null}
      {stats.totalValue}
    </p>
  )
}

function copyToClipboard(text: string) {
  if (navigator?.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'absolute'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

const event_buttons: { src: string; alt: string }[] = [
  { src: '/assets/dashboard/creator/chart2.png', alt: 'Chart' },
  {
    src: '/assets/dashboard/creator/group-user.png',
    alt: 'Group User',
  },
]

interface IStatParagraph {
  key: string
  name: string
  stats: { value?: number; totalValue: number | string }
}
