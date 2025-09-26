import { SectionContainer } from '../_components/section-container'
import { BlockName } from '../../_components/block-name'
import { Clock4 } from 'lucide-react'
// import { EventOutlineButton } from '../../_components/event-otline-btn'
import type { EventDetailData } from '@/types'
import { OnlyShowIf } from '@/lib/environment'

export default function EventDescription({ event }: { event: EventDetailData }) {
  return (
    <SectionContainer>
      <BlockName name='description' />

      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3 font-sf-pro-rounded font-medium text-xs text-white'>
          <OnlyShowIf condition={event.ageRating === '18+'}>
            <p className='px-3 w-16 h-8 rounded-[6px] bg-light-red flex justify-center items-center'>
              18+
            </p>
          </OnlyShowIf>

          <div className='text-white flex items-center gap-2.5 px-3 h-8 rounded-[6px] bg-medium-gray'>
            <Clock4 color='#ffffff' size={16} />

            <p>
              {event.eventDate.startDate} till {event.eventDate.endDate}
            </p>
          </div>

          <p className='text-white flex items-center justify-center px-3 w-24 h-8 rounded-[6px] bg-medium-gray'>
            {eventStatus(
              event.eventDate.startDate,
              event.eventDate.startTime,
              event.eventDate.endDate,
              event.eventDate.endTime,
            )}
          </p>
        </div>

        <p className='font-sf-pro-display text-sm md:max-w-2/3'>{event.description}</p>
      </div>
    </SectionContainer>
  )
}

function eventStatus(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
): string {
  const now = new Date()

  const start = new Date(`${startDate}T${startTime}:00`)
  const end = new Date(`${endDate}T${endTime}:00`)

  if (now < start) {
    const diffMs = start.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours >= 24) {
      const diffDays = Math.floor(diffHours / 24)
      return diffDays === 1 ? '1 Day' : `${diffDays} Days Left`
    }
    return diffHours === 1 ? '1 Hour' : `${diffHours} Hours Left`
  }
  if (now >= start && now < end) {
    return 'Ongoing'
  }
  return 'Event has ended'
}
