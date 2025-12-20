import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import HeroSection from '../home/sections/hero'
import { VendorRegistrationFlow } from '@/components/vendor/vendor-registration-flow'

import { OptimizedBackground } from '@/components/shared/optimized-background'

export default function CreatorsWishlistPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.1} secondColor='#a2a2a2'>
      <VendorRegistrationFlow />
      <OptimizedBackground
        src='/assets/landing-page/coming-soon-page.png'
        alt='Background'
        placeholderColor='#1a1a1a'
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
  )
}
