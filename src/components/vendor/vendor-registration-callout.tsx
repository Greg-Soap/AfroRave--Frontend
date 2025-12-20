import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

interface VendorRegistrationCalloutProps {
    onOpen: () => void
    delay?: number
}

export function VendorRegistrationCallout({ onOpen, delay = 1500 }: VendorRegistrationCalloutProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        console.log('🔵 Callout mounted with delay:', delay)

        // Check if callout was previously dismissed in this session
        const dismissed = sessionStorage.getItem('vendorCalloutDismissed')
        console.log('📦 Session storage dismissed:', dismissed)

        if (dismissed === 'true') {
            setIsDismissed(true)
            console.log('❌ Callout dismissed, not showing')
            return
        }

        console.log('⏰ Setting timer for', delay, 'ms')
        // Show callout after specified delay
        const timer = setTimeout(() => {
            console.log('✅ Timer fired, showing callout')
            setIsVisible(true)
        }, delay)

        return () => {
            console.log('🧹 Cleaning up timer')
            clearTimeout(timer)
        }
    }, [delay])

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsVisible(false)
        setIsDismissed(true)
        sessionStorage.setItem('vendorCalloutDismissed', 'true')
    }

    const handleClick = () => {
        setIsVisible(false)
        onOpen()
    }

    if (isDismissed) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed top-20 right-4 md:right-8 z-[9999] cursor-pointer"
                    onClick={handleClick}
                >
                    <div className="bg-white rounded-lg shadow-lg p-4 pr-10 relative w-[300px] md:w-[400px]">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                        <p className="text-sm md:text-base font-bold text-black font-sf-pro-display">
                            ARE YOU A VENDOR?
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
