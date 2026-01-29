import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

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
  overlayOpacity = 0.7,
  secondColor = '#a2a2a2',
}: VideoBackgroundWrapperProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    console.log('🎥 VideoBackgroundWrapper mounted')
    console.log('📹 Video source:', videoSrc)
    console.log('🖼️ Background image:', backgroundImage || 'none')
    console.log('🎨 Overlay color:', secondColor, 'Opacity:', overlayOpacity)

    const video = videoRef.current
    if (video) {
      video.addEventListener('loadstart', () => console.log('▶️ Video loading started'))
      video.addEventListener('loadeddata', () => console.log('✅ Video data loaded'))
      video.addEventListener('canplay', () => console.log('🎬 Video can play'))
      video.addEventListener('playing', () => console.log('🎥 Video is playing'))
      video.addEventListener('error', (e) => console.error('❌ Video error:', e))
    }
  }, [videoSrc, backgroundImage, secondColor, overlayOpacity])

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
        style={{ zIndex: 2, opacity: 0.25 }}>
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
