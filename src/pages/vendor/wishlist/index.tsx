import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DashboardCards } from '@/components/shared/dashboard-cards'
import { Bookmark } from 'lucide-react'
import { getRoutePath } from '@/config/get-route-path'
import { Link } from 'react-router-dom'

// Mock Data for verification (since backend might not have this yet)
const MOCK_SAVED_EVENTS = [
    {
        eventId: '1',
        image: '/assets/landing-page/s1.png', // Placeholder
        name: 'Punk fest, unleash your inner rebel',
        startDate: new Date().toISOString(),
        availableSlots: 4,
    },
    {
        eventId: '2',
        image: '/assets/landing-page/s2.png',
        name: 'Summer Vibes Festival',
        startDate: new Date(Date.now() + 86400000).toISOString(),
        availableSlots: 2,
    }
]

export default function VendorWishlistPage() {
    const navigate = useNavigate()
    const events = MOCK_SAVED_EVENTS // Replace with real data when available

    return (
        <section className="w-full h-full flex flex-col bg-[#F2F2F7] md:bg-white min-h-screen">
            {/* Mobile Header */}
            <div className="w-full h-14 flex items-center gap-4 px-4 bg-white border-b md:hidden">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-3">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-bold font-sf-pro-display">RESULTS</h1>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex w-full h-16 items-center px-8 bg-white mb-6">
                <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent text-black">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="text-lg">Back</span>
                </Button>
            </div>

            <div className="w-full px-4 md:px-8 lg:px-16 py-6 md:py-8">
                <div className="hidden md:block mb-6">
                    <h2 className="text-2xl font-bold font-sf-pro-display uppercase">Saved Events</h2>
                </div>

                {events && events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {events.map((event) => (
                            <DiscoverCard
                                key={event.eventId}
                                eventId={event.eventId}
                                image={event.image || '/placeholder.png'}
                                name={event.name}
                                startDate={event.startDate}
                                availableSlots={event.availableSlots}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                        <p>No saved events.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

function DiscoverCard({ eventId, image, name, startDate, availableSlots }: { eventId: string, image: string, name: string, startDate: string, availableSlots: number }) {
    return (
        <Link to={getRoutePath('vendor_event_details', { eventId })}>
            <DashboardCards
                image={image}
                name={name}
                startDate={startDate}
                cardButtons={[
                    { Icon: Bookmark, alt: 'Bookmark' }, // TODO: Fill state
                    { src: '/assets/dashboard/creator/ellipses.png', alt: 'Ellipses' },
                ]}
                cardInfo={[
                    <p key="available_slots" className="font-sf-pro-rounded text-xs text-mid-dark-gray">
                        Available Slots: <span className="text-[#34C759] font-medium">{availableSlots}</span>
                    </p>,
                ]}
                className="w-full"
            />
        </Link>
    )
}
