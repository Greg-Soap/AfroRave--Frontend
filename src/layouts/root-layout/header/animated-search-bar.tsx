import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface AnimatedSearchBarProps {
    isOpen: boolean
    onClose: () => void
}

export function AnimatedSearchBar({ isOpen, onClose }: AnimatedSearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [filterType, setFilterType] = useState<string>('category')

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300) // Wait for animation
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Transparent Backdrop to handle outside clicks */}
                    <div
                        className="fixed inset-0 z-[60]"
                        onClick={onClose}
                    />

                    {/* Search Bar Container - Floating Island */}
                    <motion.div
                        initial={{ y: -150, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -150, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-[85px] max-md:top-4 left-0 right-0 mx-auto w-[80%] max-md:w-[95%] max-w-4xl h-[60px] bg-[#1A1A1A] z-[70] rounded-2xl md:rounded-2xl max-md:rounded-[30px] flex items-center px-4 md:px-6 shadow-2xl border border-white/5"
                    >
                        {/* Search Icon - Hidden on mobile */}
                        <Search className="w-5 h-5 text-[#888888] shrink-0 mr-3 md:mr-4 hidden md:block" />

                        {/* Input Field */}
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-[#888888] text-sm md:text-base h-full font-normal min-w-0 pl-1"
                        />

                        {/* Divider - Hidden on mobile */}
                        <div className="w-[1px] h-6 bg-[#333333] mx-2 md:mx-4 hidden md:block" />

                        {/* Filter Dropdown */}
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-auto min-w-[80px] md:min-w-[130px] border-none bg-transparent hover:bg-transparent shadow-none focus:ring-0 gap-2 md:gap-3 px-0 text-white h-auto p-0 flex items-center justify-between group">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4 text-white hidden md:block" />
                                    <span className="text-gray-400 text-xs md:hidden mr-1 whitespace-nowrap">by</span>
                                    <SelectValue placeholder="Category" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#444444] border-none text-white rounded-lg shadow-xl min-w-[150px]">
                                <SelectItem value="category" className="focus:bg-white/10 hover:bg-white/10 cursor-pointer py-3">Category</SelectItem>
                                <div className="h-[1px] bg-white/10 mx-2" />
                                <SelectItem value="price" className="focus:bg-white/10 hover:bg-white/10 cursor-pointer py-3">Price</SelectItem>
                                <div className="h-[1px] bg-white/10 mx-2" />
                                <SelectItem value="date" className="focus:bg-white/10 hover:bg-white/10 cursor-pointer py-3">Date</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Close Button - Visible primarily on mobile */}
                        <button
                            onClick={onClose}
                            className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors md:hidden"
                        >
                            <X className="w-5 h-5 text-[#888888]" />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
