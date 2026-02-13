import { cn } from '@/lib/utils'

export function VendorSlotCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('w-full bg-white shadow-sm overflow-hidden flex flex-col rounded-0 animate-pulse', className)}>

            {/* Image Placeholder */}
            <div className="relative w-full aspect-[16/10] bg-gray-200" />

            {/* Info Section - Secured Slots */}
            <div className="py-4 px-4 bg-white flex items-center justify-center border-b border-gray-100/50">
                <div className="h-3 w-32 bg-gray-200 rounded-md" />
            </div>

            {/* Footer Actions */}
            <div className="h-10 flex items-center border-t border-gray-100/50">
                <div className="flex-1 h-full flex items-center justify-center border-r border-gray-100/50">
                    <div className="h-4 w-4 bg-gray-200 rounded-sm" />
                </div>
                <div className="flex-1 h-full flex items-center justify-center">
                    <div className="h-4 w-4 bg-gray-200 rounded-sm" />
                </div>
            </div>
        </div>
    )
}
