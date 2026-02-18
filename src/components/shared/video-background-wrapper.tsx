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
  videoSrc,
  backgroundImage,
  overlayOpacity = 0.5,
  secondColor = '#1a1a1a',
}: VideoBackgroundWrapperProps) {

  return (
    <div className={cn('relative w-full min-h-screen overflow-hidden', className)}>
      {/* Solid Background Color — base layer */}
      <div
        className='absolute inset-0 w-full h-full'
        style={{ backgroundColor: secondColor, zIndex: 1 }}
      />

      {/* Background Image — always visible, full opacity */}
      {backgroundImage && (
        <div
          className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})`, zIndex: 2 }}
        />
      )}

      {/* Video — plays on top of background image at reduced opacity to blend */}
      {videoSrc && (
        <video
          className='absolute inset-0 w-full h-full object-cover'
          style={{ zIndex: 3, opacity: 0.25 }}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Dark Overlay */}
      <div
        className='absolute inset-0 w-full h-full'
        style={{ backgroundColor: 'black', opacity: overlayOpacity, zIndex: 4 }}
      />

      {/* Content */}
      <div className='relative w-full h-full' style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  )
}
