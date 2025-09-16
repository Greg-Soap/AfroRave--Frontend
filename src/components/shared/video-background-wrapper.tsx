import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface VideoBackgroundWrapperProps {
  children: ReactNode
  className?: string
  videoSrc?: string
  overlayOpacity?: number
  secondColor?: string
}

export function VideoBackgroundWrapper({
  children,
  className,
  videoSrc = '/assets/creators-background.mp4',
  overlayOpacity = 0.7,
  secondColor = '#a2a2a2',
}: VideoBackgroundWrapperProps) {
  return (
    <div className={cn('relative w-full min-h-screen overflow-hidden', className)}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover z-0'>
        <source src={videoSrc} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Single color overlay for better content readability */}
      <div
        className='absolute inset-0 z-10'
        style={{
          backgroundColor: secondColor,
          opacity: overlayOpacity,
        }}
      />

      {/* Content */}
      <div className='relative z-20 w-full h-full'>{children}</div>
    </div>
  )
}
