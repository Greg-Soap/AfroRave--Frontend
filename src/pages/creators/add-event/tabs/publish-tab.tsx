import { BasePopover } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { getRoutePath } from '@/config/get-route-path'
import { useGetEventPromoCodes, usePublishEvent } from '@/hooks/use-event-mutations'
import { useGetEvent, useGetEventTickets, useGetEventVendors } from '@/hooks/use-event-mutations'
import { cn } from '@/lib/utils'
import { useEventStore } from '@/stores'
import { Ellipsis } from 'lucide-react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContinueButton } from '../component/continue-button'
import { RenderEventImage } from '@/components/shared/render-event-flyer'
import { LoadingFallback } from '@/components/loading-fallback'

export default function PublishTab({
  setStep,
}: {
  setStep: (step: number) => void
}) {
  useEffect(() => setStep(5), [setStep])

  const { eventId } = useEventStore()

  const { data: vendors, isLoading: isLoadingVendors } = useGetEventVendors(eventId || '')
  const { data: eventData, isLoading: isLoadingEvent } = useGetEvent(eventId || '')
  const { data: ticket, isLoading: isLoadingTicket } = useGetEventTickets(eventId || '')
  const { data: promocode, isLoading: isLoadingPromocode } = useGetEventPromoCodes(eventId || '')

  const event = eventData?.data
  const tickets = ticket?.data
  const promoCodes = promocode?.data

  const publishEventMutation = usePublishEvent()

  const navigate = useNavigate()

  const isLoading = isLoadingVendors || isLoadingEvent || isLoadingTicket || isLoadingPromocode

  const vendorNames = useMemo(() => {
    if (!vendors || !Array.isArray(vendors)) return []
    return vendors.map((v) => v.vendorName || '').filter((n: string) => n && typeof n === 'string')
  }, [vendors])

  const ticketNames = useMemo(() => {
    if (!tickets || !Array.isArray(tickets)) return []

    return tickets.map((item) => item.ticketName).filter((n: string) => n && typeof n === 'string')
  }, [tickets])

  const handlePublishEvent = async () => {
    if (!eventId) {
      console.error('No event ID found')
      return
    }

    await publishEventMutation.mutateAsync(eventId, {
      onSuccess: () => {
        navigate(getRoutePath('standalone'))
      },
    })
  }

  if (isLoading) {
    return <LoadingFallback />
  }

  return (
    <div className='max-w-[640px] w-full flex flex-col self-center rounded-[10px] py-10 px-5 bg-secondary-white mb-[75px]'>
      <div className='w-full flex gap-3'>
        <div className='w-full flex flex-col gap-3 '>
          <div className='flex flex-col gap-2 px-1 font-sf-pro-display text-charcoal'>
            <div className='flex items-center justify-between'>
              <p className='text-xl font-bold leading-[100%] uppercase'>{event?.eventName}</p>
            </div>
            <p className='text-sm leading-[100%]'>{event?.venue}</p>
            <p className='text-sm leading-[100%]'>
              {event?.eventDate.startDate} at {event?.eventDate.startTime}
            </p>
          </div>

          <SectionContainer
            name='Tickets'
            quantity={tickets?.length || 0}
            href={`${getRoutePath('add_event')}/?tab=tickets`}
            data={ticketNames.map((item) => ({ tool: item, enabled: false }))}
          />
        </div>

        <RenderEventImage
          image={event?.eventDetails.desktopMedia?.flyer}
          event_name={event?.eventName || ''}
          className='rounded-[5px] w-[180px] min-h-[200px] max-h-[234px] !bg-black/50'
        />
      </div>

      <SectionContainer
        name='Vendor Listings'
        quantity={vendors?.data.length || 0}
        href={`${getRoutePath('add_event')}/?tab=vendor`}
        data={vendorNames.map((name) => ({ tool: name, enabled: false }))}
      />

      <SectionContainer
        name='Advanced Options'
        href={`${getRoutePath('add_event')}/?tab=tickets`}
        data={[{ tool: 'Promo Codes', enabled: (promoCodes?.length ?? 0) > 0 }]}
      />

      <ContinueButton
        isLoading={publishEventMutation.isPending}
        onClick={handlePublishEvent}
        text='Publish'
        updatingText='Publishing'
      />
    </div>
  )
}

function SectionContainer({ name, quantity, href, data }: ISectionContainer) {
  return (
    <div className='w-full flex flex-col p-1'>
      <div className='w-full flex items-center justify-between border-b border-mid-dark-gray/50 py-4 px-1'>
        <p className='font-sf-pro-display font-bold leading-[100%] text-charcoal capitalize'>
          {name}
        </p>

        <div className='flex items-center'>
          {quantity && (
            <p className='size-6 rounded-full flex items-center justify-center bg-[#CB342C] text-white text-sm font-semibold leading-[100%] font-sf-pro-rounded'>
              {quantity}
            </p>
          )}
          <ActionPopover href={href} />
        </div>
      </div>

      {data.map((item) => (
        <div
          key={item.tool}
          className='flex items-center justify-between border-b border-mid-dark-gray/50 py-4 px-1'>
          <p className='text-sm font-sf-pro-display leading-[100%] capitalize text-charcoal'>
            {item.tool}
          </p>
          {name === 'Advanced Options' && (
            <p
              className={cn('text-xs font-sf-pro-rounded leading-[100%] capitalize', {
                'text-[#34C759]': item.enabled,
                'text-deep-red': !item.enabled,
              })}>
              {item.enabled ? 'Enabled' : 'Disabled'}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function ActionPopover({ href }: { href: string }) {
  return (
    <BasePopover
      trigger={
        <Button variant='ghost' className='hover:bg-black/10'>
          <Ellipsis width={3} height={15} color='#1E1E1E' />
        </Button>
      }
      content={
        <Button variant='ghost' asChild>
          <Link to={href}>Edit</Link>
        </Button>
      }
    />
  )
}

interface ISectionContainer {
  name: string
  quantity?: number
  data: { tool: string; enabled: boolean }[]
  href: string
}
