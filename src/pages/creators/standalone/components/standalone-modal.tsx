import BaseModal from '@/components/reusable/base-modal'
import { Button } from '@/components/ui/button'
import { getRoutePath } from '@/config/get-route-path'
import { formatNaira } from '@/lib/format-price'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { EventDetailData } from '@/types'

export default function StandAloneModal({ event }: { event: EventDetailData }) {
  return (
    <BaseModal
      removeCancel
      className='min-w-fit py-6 px-7 rounded-[10px] bg-[linear-gradient(180deg,_#F3F3F3_0%,_#D9D9D9_39.42%,_#E6E6E6_86.06%)]'
      trigger={
        <Button
          variant='ghost'
          className='flex h-[22px] items-center justify-start bg-transparent rounded-none border-b border-white text-xs text-white font-sf-pro-text px-1 hover:bg-black/80 hover:text-white'>
          <span>Event Summary</span>
        </Button>
      }>
      <div className='flex flex-col gap-3'>
        <StandAloneModalHeader event={event} />
        <div className='grid grid-cols-5 gap-2'>
          <SummarySection event={event} />
          <VendorSummarySection />
          <AttendeeOverviewSection />
          <EntryManagementSection />
        </div>
      </div>
    </BaseModal>
  )
}

function StandAloneModalHeader({ event }: { event: EventDetailData }) {
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='h-fit w-[384px] flex flex-col py-1 gap-1 font-sf-pro-display capitalize'>
        <p className='font-bold text-black'>{event.eventName}</p>
        <p className='text-[13px] text-black'>{event.venue}</p>
        <p className='text-[13px] text-black'>
          {event.eventDate.startDate} at {event.eventDate.startTime}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          asChild
          className='w-[132px] h-8 rounded-[4px] bg-secondary-white text-xs font-light text-black font-sf-pro-display hover:bg-black/15'>
          <Link to={getRoutePath('individual_event', { eventId: event.eventId })}>
            View Event Page
          </Link>
        </Button>
        <Button
          asChild
          variant='destructive'
          className='w-[132px] h-8 rounded-[4px] text-xs font-light font-sf-pro-display'>
          <Link to={getRoutePath('edit_event', { eventId: event.eventId })}>Edit Event</Link>
        </Button>
      </div>
    </div>
  )
}

function SummarySection({ event }: { event: EventDetailData }) {
  return (
    <SectionContainer className='col-span-3 flex flex-col gap-6'>
      <p className='text-2xl font-bold text-black capitalize'>sales summary</p>

      <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
        {[
          { name: 'total tickets sold', figure: event.eventStat.ticketSold },
          { name: 'total revenue', figure: formatNaira(event.eventStat.netProfit) },
          { name: 'total tickets', figure: event.eventStat.totalTicket },
          { name: 'active promo codes', figure: event.eventStat.activePromoCodes },
        ].map((item) => (
          <div key={item.name} className='flex flex-col gap-1 text-pure-black'>
            <p className='text-sm capitalize'>{item.name}</p>
            <p className='font-semibold'>{item.figure}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

function VendorSummarySection() {
  return (
    <SectionContainer className='w-full col-span-2 flex gap-3 flex-col justify-center'>
      <p className='font-bold text-pure-black capitalize'>vendor summary</p>

      <SectionStats name='confirmed vendors' figure={8} />
      <SectionStats name='pending requests' figure={3} />
    </SectionContainer>
  )
}

function AttendeeOverviewSection() {
  return (
    <SectionContainer className='w-full col-span-2 flex gap-3 flex-col'>
      <p className='font-bold text-pure-black capitalize'>Attendee Overview</p>

      <SectionStats name='resale activity' figure={45} />
      <SectionStats name='checked in ' />
    </SectionContainer>
  )
}

function EntryManagementSection() {
  return (
    <SectionContainer className='w-full col-span-3 flex gap-3 flex-col'>
      <p className='font-bold text-pure-black capitalize'>Entry Management</p>

      <SectionStats name='entry staff' figure={12} />
      <Link
        to='#'
        className='border-t border-mid-dark-gray/50 pt-4 px-1 flex ite justify-between text-pure-black'>
        <p className='text-sm font-medium capitalize'>access control </p>
        <ChevronRight size={12} color='#000000' />
      </Link>
    </SectionContainer>
  )
}

function SectionStats({
  name,
  figure,
}: {
  name: string
  figure?: string | number
}) {
  return (
    <div className='border-t border-mid-dark-gray/50 pt-4 px-1 flex ite justify-between text-pure-black'>
      <p className='text-sm font-medium capitalize'>{name}</p>
      <p className='text-xs font-sf-pro-rounded'>{figure ? figure : '-'}</p>
    </div>
  )
}

function SectionContainer({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col h-full min-h-fit py-6 px-3 bg-secondary-white rounded-[10px] font-sf-pro-display',
        className,
      )}>
      {children}
    </div>
  )
}
