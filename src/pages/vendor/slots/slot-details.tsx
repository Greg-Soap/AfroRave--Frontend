import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, Download, MoreVertical, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'
import { SlotDescriptionModal } from './slot-description-modal'
import { VendorSectionMap } from './section-map'
import VendorDashboardHeader from '@/layouts/vendor-dashboard-layout/sections/header'
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
    const [selectedSlot, setSelectedSlot] = useState<typeof MOCK_SLOTS[0] | null>(null)
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
    const [searchQuery, setSearchQuery] = useState('')
    const eventName = "Blackmarket Flea" // Placeholder

    const filteredSlots = MOCK_SLOTS.filter(slot =>
        slot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        slot.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <section className="w-full min-h-screen flex flex-col bg-[#F5F5F7]">
            {/* Main Header */}
            <VendorDashboardHeader />

            {/* Sub Header */}
            <div className="w-full h-[70px] flex items-center justify-between px-4 md:px-10 bg-white border-b border-gray-100/50 sticky top-0 z-20">
                <div className="flex items-center gap-2 max-w-[70%]">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-3 hover:bg-gray-50 rounded-full h-9 w-9 shrink-0">
                        <ChevronLeft className="h-5 w-5 text-black stroke-[1.5px]" />
                    </Button>
                    <h1 className="text-lg font-bold font-sf-pro-display text-black truncate">
                        {eventName}
                    </h1>
                </div>

                {/* Download Link (Hidden on mobile if needed, or compact) */}
                <button className="flex items-center gap-2 text-[#8E8E93] hover:text-black transition-colors group shrink-0">
                    <Download className="h-4 w-4 stroke-[1.5px]" />
                    <span className="hidden md:inline text-xs font-sf-pro-text font-medium group-hover:underline">Download Section Map</span>
                </button>
            </div>

            <div className="p-4 md:px-10 md:py-8 flex flex-col gap-6 flex-1 h-full">
                {/* Content Card with Search & Filter Bar */}
                <div className="w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1 h-full">

                    {/* Search & Filter Bar (Inside Card) */}
                    <div className="w-full flex flex-col md:flex-row items-center gap-4 p-4 md:p-5 border-b border-gray-100">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8E8E93]" />
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 bg-transparent border-none h-10 rounded-none font-sf-pro-text text-[15px] placeholder:text-[#8E8E93] focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {/* View Toggle */}
                            <div className="flex bg-[#F5F6F8] rounded-lg p-1 h-12 items-center w-[120px] shrink-0">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        "flex-1 h-10 px-3 text-[13px] font-sf-pro-text font-medium rounded-md transition-all flex items-center justify-center",
                                        viewMode === 'list' ? "bg-white text-black shadow-sm" : "bg-transparent text-[#8E8E93] hover:text-black"
                                    )}
                                >
                                    List
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={cn(
                                        "flex-1 h-10 px-3 text-[13px] font-sf-pro-text font-medium rounded-md transition-all flex items-center justify-center",
                                        viewMode === 'map' ? "bg-white text-black shadow-sm" : "bg-transparent text-[#8E8E93] hover:text-black"
                                    )}
                                >
                                    Map
                                </button>
                            </div>

                            {/* Filter Button */}
                            <AddFilterBUtton className="font-sf-pro-text shrink-0" />
                        </div>
                    </div>

                    {/* Content List/Map */}
                    {viewMode === 'list' ? (
                        <div className="flex-1 overflow-y-auto">
                            {filteredSlots.length > 0 ? (
                                filteredSlots.map((slot) => (
                                    <div
                                        key={slot.id}
                                        onClick={() => setSelectedSlot(slot)}
                                        className="flex items-center justify-between p-4 md:p-5 border-b border-gray-50 last:border-none cursor-pointer hover:bg-gray-50/50 transition-colors group gap-3"
                                    >
                                        {/* Name & Type */}
                                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                                            <p className="font-sf-pro-display font-medium text-[15px] text-[#1C1C1E] truncate">{slot.name}</p>
                                            <div className="flex items-center gap-1 font-sf-pro-text text-[11px] text-[#8E8E93] truncate">
                                                <span className="truncate">{slot.type}</span>
                                                <span className="md:hidden text-[#007AFF] font-medium shrink-0">• {slot.quantity} Slots</span>
                                            </div>
                                        </div>

                                        {/* Quantity (Hidden on very small screens, shown on md+) */}
                                        <div className="hidden md:flex justify-center w-1/6 shrink-0">
                                            <span className="font-sf-pro-display font-medium text-[15px] text-[#007AFF]">{slot.quantity}</span>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center justify-end gap-2 shrink-0">
                                            <StatusBadge status={slot.status} />

                                            {/* Kebab Menu */}
                                            <div className="w-[32px] md:w-[40px] flex justify-end" onClick={(e) => e.stopPropagation()}>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-full opacity-50 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical className="h-4 w-4 text-[#1C1C1E]" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[180px] bg-[#1C1C1E]/90 backdrop-blur-md border-none text-white shadow-xl rounded-lg p-1">
                                                        <DropdownMenuItem className="text-[13px] font-sf-pro-text text-white focus:bg-white/10 focus:text-white cursor-pointer h-9 px-3 rounded-md">
                                                            Revoke Request
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-white/20 my-1" />
                                                        <DropdownMenuItem className="text-[13px] font-sf-pro-text text-white focus:bg-white/10 focus:text-white cursor-pointer h-9 px-3 rounded-md">
                                                            View Section Maps
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-12 text-center h-full text-gray-400">
                                    <Search className="h-8 w-8 mb-2 opacity-50" />
                                    <p className="font-sf-pro-text text-sm">No slots found</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1 relative bg-gray-50">
                            {/* Map placeholder or actual component */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <VendorSectionMap />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedSlot && (
                <SlotDescriptionModal
                    isOpen={!!selectedSlot}
                    onClose={() => setSelectedSlot(null)}
                    slotName={selectedSlot.name}
                    price={selectedSlot.price}
                    eventName={eventName}
                />
            )}
        </section>
    )
}

function StatusBadge({ status, className }: { status: string, className?: string }) {
    const getStatusColor = (s: string) => {
        switch (s.toLowerCase()) {
            case 'pending payment': return 'text-[#FF9500]' // Orange
            case 'requested': return 'text-[#007AFF]' // Blue
            case 'secured': return 'text-[#34C759]' // Green
            case 'rejected': return 'text-[#FF3B30]' // Red
            default: return 'text-[#8E8E93]'
        }
    }

    return (
        <span className={cn("text-[13px] font-sf-pro-display font-medium whitespace-nowrap", getStatusColor(status), className)}>
            {status}
        </span>
    )
}
