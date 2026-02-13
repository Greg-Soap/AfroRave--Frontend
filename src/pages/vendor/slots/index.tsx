import { CalendarIcon } from '@/components/icons/calendar'
import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'
import { Link } from 'react-router-dom'
import { getRoutePath } from '@/config/get-route-path'
import { VendorSlotCard } from './components/vendor-slot-card'
import { VendorSlotCardSkeleton } from './components/vendor-slot-card-skeleton' // Import Skeleton
import { useEffect, useState } from 'react' // Import Hooks
import { Bookmark } from 'lucide-react'
import { useWishlist } from '@/contexts/wishlist-context'
import { MOCK_VENDOR_EVENTS } from '@/data/mock-vendor-events'

export default function VendorSlotPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { isBookmarked, toggleBookmark } = useWishlist()

  const events = MOCK_VENDOR_EVENTS

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading
    return () => clearTimeout(timer)
  }, [])

  const handleMore = () => {
    console.log('More options')
  }

  return (
    <section className='w-full h-full flex flex-col justify-start items-start bg-[#F5F5F7] min-h-screen'>
      {/* Header Area with Filter Button */}
      <div className='w-full h-[70px] flex items-center justify-between px-6 md:px-10 bg-white border-b border-gray-100'>
        <AddFilterBUtton />

        <Link to="/vendor/wishlist" className="flex items-center gap-2 text-black font-sf-pro-display font-medium text-sm hover:opacity-80 transition-opacity">
          WISHLIST
          <Bookmark className="w-4 h-4 text-[#D32F2F]" />
        </Link>
      </div>

      <div className="w-full px-6 md:px-10 py-8">
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop, 4 col wide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {isLoading ? (
            // Render 8 skeletons while loading
            Array.from({ length: 8 }).map((_, i) => (
              <VendorSlotCardSkeleton key={i} />
            ))
          ) : events.length === 0 ? (
            <div className='col-span-full w-full h-full flex flex-col items-center justify-center py-20'>
              <div className='w-fit flex items-center gap-2 stroke-medium-gray text-medium-gray'>
                <CalendarIcon stroke='inherit' className='size-6 md:size-8' />
                <p className='text-lg md:text-2xl font-bold font-sf-pro-display uppercase'>no scheduled events</p>
              </div>
            </div>
          ) : (
            events.map((event) => (
              <Link key={event.id} to={getRoutePath('vendor_slot_details', { eventId: event.id })}>
                <VendorSlotCard
                  image={event.image || '/placeholder.png'}
                  name={event.name}
                  date={event.date}
                  securedSlots={event.secured_slots}
                  totalSlots={event.total_slots}
                  isEnded={event.isEnded}
                  isBookmarked={isBookmarked(event.id)}
                  onBookmark={(e?: React.MouseEvent) => {
                    e?.preventDefault()
                    e?.stopPropagation()
                    toggleBookmark(event.id)
                  }}
                  onMore={(e?: React.MouseEvent) => {
                    e?.preventDefault()
                    e?.stopPropagation()
                    handleMore()
                  }}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
