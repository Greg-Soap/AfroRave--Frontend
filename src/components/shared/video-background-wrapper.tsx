import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface VideoBackgroundWrapperProps {
  children: ReactNode
  className?: string
  videoSrc?: string
  backgroundImage?: string
  overlayOpacity?: number
  secondColor?: string
}

export function VideoBackgroundWrapper({
  children,
  className,
  backgroundImage,
  overlayOpacity = 0.85,
  secondColor = '#6B6B6B',
}: VideoBackgroundWrapperProps) {

  return (
    <div className={cn('relative w-full min-h-screen overflow-hidden', className)}>
      {/* Solid Background Color */}
      <div
        className='absolute inset-0 w-full h-full'
        style={{
          backgroundColor: secondColor,
          zIndex: 1
        }}
      />

      {/* Background Image - shows on top of solid color if provided */}
      {backgroundImage && (
        <div
          className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            zIndex: 2
          }}
        />
      )}

      {/* Dark Overlay */}
      <div
        className='absolute inset-0 w-full h-full'
        style={{
          backgroundColor: 'black',
          opacity: overlayOpacity,
          zIndex: 3
        }}
      />

      {/* Content */}
      <div className='relative z-20 w-full h-full'>{children}</div>
    </div>
  )
}
