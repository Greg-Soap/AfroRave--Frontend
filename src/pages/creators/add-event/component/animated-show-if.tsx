import { useEffect, useRef, useState } from 'react'

export function AnimatedShowIf({
    condition,
    children,
}: { condition: boolean; children: React.ReactNode }) {
    const [shouldRender, setShouldRender] = useState(condition)
    const [isVisible, setIsVisible] = useState(condition)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (condition) {
            // Show: first mount, then fade in
            setShouldRender(true)
            // Small delay to ensure element is mounted before starting animation
            timeoutRef.current = setTimeout(() => setIsVisible(true), 20)
        } else {
            // Hide: first fade out, then unmount
            setIsVisible(false)
            timeoutRef.current = setTimeout(() => setShouldRender(false), 300)
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [condition])

    if (!shouldRender) return null

    return (
        <div
            className='w-full transition-all duration-300 ease-in-out'
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            }}>
            {children}
        </div>
    )
}
