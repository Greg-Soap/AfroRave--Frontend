import { BaseSelect, type ICustomSelectProps } from '@/components/reusable/base-select'
import { CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type IEvents, events } from '@/data/events'
import clsx from 'clsx'

export default function EventCategoryBlocks() {
  return (
    <section className='max-w-[var(--max-width)] w-full pl-[1rem] md:pl-[2rem] flex flex-col gap-20 mt-36 pb-16'>
      <CategoryBlock name='Trending' data={events} />

      <div className='flex flex-col gap-10'>
        <div className='flex items-center gap-3 overflow-x-scroll scrollbar-none'>
          <BaseSelect
            placeholder={category_list.placeholder}
            defaultValue={category_list.placeholder}
            width={category_list.width}
            items={category_list.items}
          />

          <BaseSelect
            placeholder={date_list.placeholder}
            defaultValue={date_list.placeholder}
            items={date_list.items}
          />
        </div>

        <CategoryBlock data={events} displayType='grid' />
      </div>
    </section>
  )
}

function CategoryBlock({
  name,
  data,
  displayType = 'flex',
}: {
  name?: string
  data: IEvents[]
  displayType?: 'flex' | 'grid'
}) {
  return (
    <div
      className={clsx('flex flex-col gap-6', {
        'pr-[1rem] md:pr-[2rem]': displayType === 'grid',
      })}>
      <p className='text-xl font-bold font-input-mono'>{name}</p>

      <div
        className={clsx('gap-7', {
          'flex pr-7 overflow-x-scroll scrollbar-none': displayType === 'flex',
          'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': displayType === 'grid',
        })}>
        {data.map((item) => (
          <EventCard key={item.id} {...item} start_time={item.event_time.start_time} />
        ))}
      </div>
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
}: IEventCardProps) {
  return (
    <Link to={`/events/${id}`} className='flex flex-col gap-4'>
      <img src={image} alt={event_name} className='rounded-[15px] min-w-[290px] h-[290px]' />

      <div className='flex flex-col gap-1.5'>
        <p className='text-xl uppercase'>{event_name}</p>

        <div className='flex items-center gap-1.5'>
          <MapPin size={9} color='var(--foreground)' opacity={70} />
          <p className='font-sf-pro-display text-sm opacity-70'>{event_location}</p>
        </div>

        <div className='flex items-center gap-1.5'>
          <CalendarDays size={9} color='var(--foreground)' opacity={70} />
          <p className='font-sf-pro-display text-sm opacity-70'>
            {event_date} at {start_time}
          </p>
        </div>
      </div>
    </Link>
  )
}

const category_list: ICustomSelectProps = {
  width: 368,
  defaultValue: 'sports',
  placeholder: 'Select Category',
  items: [
    { value: 'concerts-and-festivals', label: 'Concerts & Festivals' },
    { value: 'arts-and-performance', label: 'Arts & Performance' },
    { value: 'children', label: 'Children' },
    { value: 'sports', label: 'Sports' },
    { value: 'career-and-business', label: 'Career & Business' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'culture-and-religion', label: 'Culture & Religion' },
  ],
}

const date_list: ICustomSelectProps = {
  defaultValue: 'jan',
  placeholder: 'Select Date',
  items: [
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'February' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'jun', label: 'June' },
    { value: 'jul', label: 'July' },
    { value: 'aug', label: 'August' },
    { value: 'sep', label: 'September' },
    { value: 'oct', label: 'October' },
    { value: 'nov', label: 'November' },
    { value: 'dec', label: 'December' },
  ],
}

interface IEventCardProps {
  id: number
  image: string
  event_name: string
  event_location: string
  event_date: string
  start_time: string
}
