import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { getRoutePath } from '@/config/get-route-path'
import { CalendarDays, MapPin } from 'lucide-react'
import { RenderEventImage } from './render-event-flyer'

export function CategoryBlock({
  name,
  data,
  layout = 'start',
  showLocation,
  display = 'flex',
  homePage = false,
  isLoading = false,
}: ICategoryBlock) {
  const filteredData = homePage ? data?.slice(0, 5) : data

  if (isLoading) {
    return <CategoryBlockSkeleton name={name} />
  }

  return (
    <div className='flex flex-col gap-5 w-full'>
      {name && <CategoryBlockName name={name} />}

      {data && data.length > 0 ? (
        <div
          className={cn({
            'flex gap-5 overflow-x-scroll scrollbar-none w-full': display === 'flex',
            flex: display === 'flex' && homePage,
            'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 justify-center':
              display === 'grid',
          })}>
          {filteredData?.map((item) => (
            <EventCard
              key={item.eventId}
              id={item.eventId}
              image={item.image}
              event_location={item.venue}
              event_date={item.startDate}
              event_name={item.eventName}
              start_time={item.startTime}
              showLocation={showLocation}
              layout={layout}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-12 w-full rounded-lg'>
          <p className='text-lg font-semibold text-muted-foreground mb-1'>No events found</p>
          <span className='text-sm text-muted-foreground'>
            New events will be added soon. Stay tuned!
          </span>
        </div>
      )}
    </div>
  )
}

function EventCard({
  id,
  image,
  event_name,
  event_location,
  event_date,
  start_time,
  showLocation,
  layout = 'start',
}: IEventCardProps) {
  return (
    <Link
      to={getRoutePath('individual_event', { eventId: id })}
      className={cn(
        'flex flex-col gap-1 min-w-[148px] md:min-w-[243px] md:w-fit max-w-[243px]  md:max-w-full lg:min-w-[245px] lg:max-w-[284px]',
        {
          'items-start': layout === 'start',
          'items-center': layout === 'middle',
        },
      )}>
      <RenderEventImage image={image} event_name={event_name} />

      <div className='flex flex-col gap-1 md:gap-2 py-2 px-1'>
        <p
          className={cn('text-sm md:text-base font-bold font-sf-pro-display uppercase', {
            'text-start md:text-center': layout === 'middle',
            'text-start': layout === 'start',
          })}>
          {event_name}
        </p>

        <div className='flex flex-col gap-1'>
          {showLocation && (
            <div
              className={cn('flex items-start gap-1.5 justify-center', {
                'justify-center': layout === 'middle',
                'justify-start': layout === 'start',
              })}>
              <CalendarDays size={10} color='var(--foreground)' />
              <EventDetailsParagraph text={`${event_date} at ${start_time}`} />
            </div>
          )}

          <div
            className={cn('flex items-start gap-1.5', {
              'justify-center': layout === 'middle',
            })}>
            {showLocation && <MapPin size={10} color='var(--foreground)' />}
            <EventDetailsParagraph text={event_location} />
          </div>
        </div>
      </div>
    </Link>
  )
}

function CategoryBlockName({ name }: { name: string }) {
  return <p className='text-xl font-bold font-sf-pro-display'>{name}</p>
}

function EventDetailsParagraph({ text }: { text: string }) {
  return <p className='font-sf-pro-display text-xs font-normal text-start -mt-0.5'>{text}</p>
}

export function CategoryBlockSkeleton({ name }: { name?: string }) {
  return (
    <div className='flex flex-col gap-6 w-full'>
      {name && <CategoryBlockName name={name} />}

      <div className='gap-7 flex pr-7 overflow-x-auto scrollbar-none w-full'>
        {Array.from({ length: 4 }).map((_) => (
          <div
            key={`event-skeleton-${crypto.randomUUID()}`}
            className='flex flex-col gap-4 min-w-[180px] max-w-[220px] w-full'>
            <div className='aspect-square w-full bg-gray-200 rounded-[15px] animate-pulse' />
            <div className='space-y-2'>
              <div className='h-6 w-3/4 bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse' />
              <div className='h-4 w-2/3 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ICategoryBlock {
  name?: string
  data?: IEventCardDataProps[]
  layout?: IEventCardProps['layout']
  showLocation?: IEventCardProps['showLocation']
  display?: 'flex' | 'grid'
  homePage?: boolean
  isLoading?: boolean
}

interface IEventCardProps {
  id: string
  image?: string
  event_name: string
  event_location: string
  event_date: string
  start_time: string
  isTrending?: boolean
  layout?: 'start' | 'middle'
  showLocation?: boolean
}

interface IEventCardDataProps {
  eventId: string
  image?: string
  venue: string
  startDate: string
  eventName: string
  startTime: string
}
