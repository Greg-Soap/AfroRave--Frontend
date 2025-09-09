import { date_list } from '@/components/constants'
import { BaseSelect, type ICustomSelectProps } from '@/components/reusable/base-select'
import { Suspense, useState } from 'react'
import { useGetTrendingEvents, useGetAllEvents } from '@/hooks/use-event-mutations'
import { CategoryBlock } from '@/components/shared/category-block'
import { CategoryBlockSkeleton } from '@/components/shared/category-block'

export default function EventCategoryBlocks() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')

  const trendingEvents = useGetTrendingEvents().data?.data
  const allEvents = useGetAllEvents().data?.data

  if (!trendingEvents || !allEvents) {
    return
  }

  return (
    <section className='w-full flex flex-col gap-10 md:gap-20 mt-[120px] md:mt-36 pb-16 px-3 md:px-8 lg:px-0 min-h-[calc(100vh-300px)]'>
      <div className='lg:pl-[60px]'>
        <Suspense fallback={<CategoryBlockSkeleton />}>
          <CategoryBlock
            name='Trending'
            data={(trendingEvents ?? []).map((event) => ({
              eventId: event.eventId,
              eventName: event.eventName,
              image: event.desktopMedia.flyer,
              venue: event.venue,
              startDate: event.startDate,
              startTime: event.startTime,
            }))}
            showLocation={false}
            layout='middle'
          />
        </Suspense>
      </div>

      <div className='flex flex-col gap-[60px] lg:pl-[60px] xl:pl-[120px]'>
        <div className='flex items-center gap-3 md:gap-6 overflow-x-auto min-h-[40px]'>
          <BaseSelect
            type='others'
            placeholder={category_list.placeholder}
            width={category_list.width}
            items={category_list.items}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value)
              console.log('Category changed:', value)
            }}
          />

          <BaseSelect
            type='others'
            placeholder={date_list.placeholder}
            items={date_list.items}
            value={selectedDate}
            onChange={(value) => {
              setSelectedDate(value)
              console.log('Date changed:', value)
            }}
          />
        </div>

        <Suspense fallback={<CategoryBlockSkeleton />}>
          <CategoryBlock
            data={(allEvents ?? []).map((event) => ({
              eventId: event.eventId,
              eventName: event.eventName,
              venue: event.venue,
              startDate: event.startDate,
              startTime: '',
            }))}
            showLocation={true}
            display='grid'
          />
        </Suspense>
      </div>
    </section>
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
