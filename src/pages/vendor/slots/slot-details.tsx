import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Download, MoreVertical, Search, Settings2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

import { SlotDescriptionModal } from './slot-description-modal'
import { VendorSectionMap } from './section-map'
import { useState } from 'react'

// Mock Data
const MOCK_SLOTS = [
    { id: '1', name: 'Outdoor Stall B', type: 'Food And Drinks', quantity: 2, status: 'Pending Payment', price: '₦175,000 Per Slot' },
    { id: '2', name: 'Outdoor Stall B', type: 'Food And Drinks', quantity: 1, status: 'Requested', price: '₦175,000 Per Slot' },
    { id: '3', name: 'Outdoor Stall A', type: 'Food And Drinks', quantity: 2, status: 'Secured', price: '₦150,000 Per Slot' },
    { id: '4', name: 'Outdoor Stall A', type: 'Food And Drinks', quantity: 2, status: 'Rejected', price: '₦150,000 Per Slot' },
]

export default function VendorSlotDetailsPage() {
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [selectedSlot, setSelectedSlot] = useState<typeof MOCK_SLOTS[0] | null>(null)
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
    const eventName = "Blackmarket Flea" // Placeholder

    return (
        <section className="w-full h-full flex flex-col bg-white min-h-screen">
            {/* Header */}
            <div className="w-full h-14 flex items-center justify-between px-4 border-b md:h-16 md:px-8">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-3 hover:bg-transparent">
                        <ChevronLeft className="h-6 w-6 text-black" />
                    </Button>
                    <h1 className="text-lg font-bold font-sf-pro-display text-black truncate max-w-[200px] md:max-w-none">
                        {eventName}
                    </h1>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-transparent">
                    <Download className="h-5 w-5 text-black" />
                </Button>
            </div>

            <div className={`p-4 pl-12 md:px-8 md:py-6 flex flex-col gap-4 ${viewMode === 'map' ? 'h-full' : ''}`}>
                {/* Search & Filter */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search"
                            className="pl-9 bg-[#F2F2F7] border-none h-10 rounded-[8px] font-sf-pro-display"
                        />
                    </div>
                    {/* View Toggle */}
                    <div className="flex bg-[#F2F2F7] rounded-[8px] p-1 h-10 items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "h-8 px-3 text-xs font-medium rounded-[6px] transition-all",
                                viewMode === 'list' ? "bg-white text-black shadow-sm" : "bg-transparent text-gray-400 hover:text-black"
                            )}
                        >
                            List
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('map')}
                            className={cn(
                                "h-8 px-3 text-xs font-medium rounded-[6px] transition-all",
                                viewMode === 'map' ? "bg-white text-black shadow-sm" : "bg-transparent text-gray-400 hover:text-black"
                            )}
                        >
                            Map
                        </Button>
                    </div>

                    <Button variant="ghost" size="icon" className="bg-[#F2F2F7] rounded-[8px] h-10 w-10 hover:bg-gray-200">
                        <Settings2 className="h-4 w-4 text-black rotate-90" />
                    </Button>
                </div>

                {/* Content */}
                {viewMode === 'list' ? (
                    <div className="flex flex-col border-t border-gray-100">
                        {MOCK_SLOTS.map((slot, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedSlot(slot)}
                                className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-medium text-sm text-black font-sf-pro-display">{slot.name}</p>
                                    <p className="text-[10px] text-gray-500 font-sf-pro-display">{slot.type}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-blue-500 font-medium text-sm">{slot.quantity}</span>
                                    <StatusBadge status={slot.status} />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                        <MoreVertical className="h-4 w-4 text-black" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex-1 min-h-[400px]">
                        <VendorSectionMap />
                    </div>
                )}
            </div>

            {selectedSlot && (
                <SlotDescriptionModal
                    isOpen={!!selectedSlot}
                    onClose={() => setSelectedSlot(null)}
                    slotName={selectedSlot.name}
                    price={selectedSlot.price}
                />
            )}
        </section>
    )
}

function StatusBadge({ status }: { status: string }) {
    const getStatusColor = (s: string) => {
        switch (s.toLowerCase()) {
            case 'pending payment': return 'text-orange-400'
            case 'requested': return 'text-blue-500'
            case 'secured': return 'text-[#34C759]' // Green
            case 'rejected': return 'text-red-500' // Red
            default: return 'text-gray-500'
        }
    }

    return (
        <span className={cn("text-[10px] sm:text-xs font-medium font-sf-pro-display", getStatusColor(status))}>
            {status}
        </span>
    )
}
