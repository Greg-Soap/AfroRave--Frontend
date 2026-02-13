import { ChevronLeft, Bookmark } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { VendorSlotCard } from '../slots/components/vendor-slot-card'
import { getRoutePath } from '@/config/get-route-path'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/contexts/wishlist-context'
import { MOCK_VENDOR_EVENTS } from '@/data/mock-vendor-events'


export default function VendorWishlistPage() {
    const navigate = useNavigate()
    const { bookmarkedIds, toggleBookmark } = useWishlist()

    // Filter events to show only those in the wishlist
    const wishlistItems = MOCK_VENDOR_EVENTS.filter(event => bookmarkedIds.has(event.id))

    const handleMore = () => {
        console.log('More options')
    }

    return (
        <section className="w-full min-h-screen flex flex-col bg-[#F5F5F7]">
            {/* Header */}
            <div className="w-full h-[70px] flex items-center px-6 md:px-10 bg-white border-b border-gray-100 sticky top-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity group"
                >
                    <ChevronLeft className="w-5 h-5 text-black group-hover:-translate-x-1 transition-transform" />
                    <span className="text-black font-sf-pro-display font-medium text-sm flex items-center gap-2">
                        WISHLIST
                        {/* Filled Red Bookmark Icon as per screenshot */}
                        <Bookmark className="w-4 h-4 text-[#D32F2F] fill-[#D32F2F]" />
                    </span>
                </button>
            </div>

            <div className="w-full px-6 md:px-10 py-8">
                {/* Responsive Grid */}
                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((event) => (
                            <Link key={event.id} to={getRoutePath('vendor_slot_details', { eventId: event.id })}>
                                <VendorSlotCard
                                    image={event.image || '/placeholder.png'}
                                    name={event.name}
                                    date={event.date}
                                    securedSlots={event.secured_slots}
                                    totalSlots={event.total_slots}
                                    isEnded={event.isEnded}
                                    isBookmarked={true} // Always bookmarked in wishlist view
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
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Bookmark className="w-12 h-12 mb-4 text-[#E5E5EA]" />
                        <p className="font-sf-pro-display text-lg">Your wishlist is empty.</p>
                        <Button
                            variant="link"
                            className="mt-2 text-[#D32F2F]"
                            onClick={() => navigate('/vendor/slots')}
                        >
                            Browse Slots
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}
