import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { useRef } from 'react'

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
  videoSrc = '/assets/creators-background.mp4',
  backgroundImage,
}: VideoBackgroundWrapperProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className={cn('relative w-full min-h-screen overflow-hidden', className)}>
      {/* Background Image - shows beneath video as fallback */}
      {backgroundImage && (
        <div
          className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            zIndex: 1
          }}
        />
      )}

      {/* Video Background - plays on top with transparency to show image beneath */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover'
        style={{ zIndex: 2, opacity: 0.3 }}>
        <source src={videoSrc} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* ALL OVERLAYS REMOVED FOR TESTING */}

      {/* Content */}
      <div className='relative z-20 w-full h-full'>{children}</div>
    </div>
  )
}
