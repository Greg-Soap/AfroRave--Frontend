import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import HeroSection from '../home/sections/hero'
import { VendorRegistrationFlow } from '@/components/vendor/vendor-registration-flow'

export default function CreatorsWishlistPage() {
  return (
    <>
      <VendorRegistrationFlow />
      <VideoBackgroundWrapper
        videoSrc='/assets/creators-background.mp4'
        backgroundImage='/assets/landing-page/BG-3.webp'
        overlayOpacity={0.15}
        secondColor='#1a1a1a'
        videoOpacity={0.5}
        videoBlendMode='color-dodge'
      >
        <img
          src='/assets/landing-page/waitlist-background.png'
          alt='Background'
          className='fixed inset-0 w-full h-full object-cover z-0 opacity-60'
        />
        <div className='relative z-50 '>
          <HeroSection
            wideDescription
            noButton
            description='Afro Revive brings together organizers, vendors, and fans in one unified platform. Organizers can efficiently create and manage events, vendors can showcase their offerings and secure slots, while fans benefit from seamless ticketing with the flexibility to resell, transfer, or upgrade. A truly comprehensive solution for every event experience'
            wishlistButton
          />
        </div>
      </VideoBackgroundWrapper>
    </>
  )
}
