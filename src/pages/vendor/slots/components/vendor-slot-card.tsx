import { cn } from '@/lib/utils'
import { Bookmark, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface VendorSlotCardProps {
    image: string
    name: string
    date: string
    securedSlots: number
    totalSlots: number
    isEnded?: boolean
    className?: string
    onBookmark?: (e?: React.MouseEvent) => void
    onMore?: (e?: React.MouseEvent) => void
    isBookmarked?: boolean
}

export function VendorSlotCard({
    image,
    name,
    date,
    securedSlots,
    totalSlots,
    isEnded = false,
    className,
    onBookmark,
    onMore,
    isBookmarked = false,
}: VendorSlotCardProps) {
    return (
        <div className={cn('w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col group', className)}>

            {/* Image Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className={cn("w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                        isEnded ? 'grayscale' : ''
                    )}
                />

                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Status Badge */}
                {isEnded && (
                    <Badge className="absolute top-0 left-0 rounded-none bg-[#D32F2F] hover:bg-[#D32F2F] text-white text-[10px] font-bold uppercase py-1 px-3 border-none">
                        ENDED
                    </Badge>
                )}

                {/* Text Content overlaying image at bottom left */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-0.5 z-10">
                    <h3 className="text-white font-sf-pro-display font-bold text-base md:text-lg leading-tight truncate pr-2">
                        {name}
                    </h3>
                    <p className="text-white/80 font-sf-pro-display text-[10px] md:text-xs font-medium">
                        {date}
                    </p>
                </div>

                {/* Link Icon (top right) - matching shared card style */}
                <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <img
                        src='/assets/dashboard/creator/link.png'
                        alt='Link'
                        className='w-3 h-3 invert brightness-0 filter md:w-3.5 md:h-3.5'
                    />
                </div>
            </div>

            {/* Info Section - Secured Slots */}
            <div className="py-4 px-4 bg-white flex items-center justify-center border-b border-gray-100/50">
                <p className="text-xs font-sf-pro-display text-[#8E8E93]">
                    Secured Slots: <span className="text-[#34C759] font-semibold">{securedSlots}/{totalSlots}</span>
                </p>
            </div>

            {/* Footer Actions */}
            <div className="h-10 flex items-center border-t border-gray-100/50">
                <button
                    onClick={onBookmark}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-100/50"
                >
                    <Bookmark
                        className={cn(
                            "w-4 h-4 text-[#1C1C1E] stroke-[1.5px] transition-colors",
                            isBookmarked && "text-[#D32F2F] fill-[#D32F2F]"
                        )}
                    />
                </button>
                <button
                    onClick={onMore}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                    <MoreHorizontal className="w-5 h-5 text-[#1C1C1E] stroke-[1.5px]" />
                </button>
            </div>
        </div>
    )
}
