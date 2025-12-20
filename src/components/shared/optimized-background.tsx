import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

interface OptimizedBackgroundProps {
    src: string
    alt?: string
    className?: string
    placeholderColor?: string
}

export function OptimizedBackground({
    src,
    alt = 'Background',
    className = '',
    placeholderColor = '#1a1a1a'
}: OptimizedBackgroundProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState<string | null>(null)

    useEffect(() => {
        // Preload the image
        const img = new Image()
        img.src = src

        img.onload = () => {
            setImageSrc(src)
            setIsLoaded(true)
        }

        // Cleanup
        return () => {
            img.onload = null
        }
    }, [src])

    return (
        <div className={`fixed inset-0 ${className}`}>
            {/* Instant placeholder with gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg, ${placeholderColor} 0%, #2d2d2d 100%)`,
                }}
            />

            {/* Actual image with fade-in */}
            {imageSrc && (
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1.0 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    loading="lazy"
                />
            )}

            {/* Loading indicator (optional) */}
            {!isLoaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
            )}
        </div>
    )
}
