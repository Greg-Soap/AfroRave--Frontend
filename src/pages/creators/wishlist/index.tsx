import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import HeroSection from '../home/sections/hero'

export default function CreatorsWishlistPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.5} secondColor='#a2a2a2'>
      <img
        src='/assets/landing-page/blog.png'
        alt='Abstract'
        className='fixed inset-0 w-full h-full object-cover z-0 opacity-60'
      />
      <div className='relative z-50 '>
        <HeroSection
          wideDescription
          noButton
          description='Afro Revive brings together organizers, vendors, and fans on one unified platform. Organizers can efficiently create and manage events, vendors can showcase their offerings and secure slots, while fans benefit from seamless ticketing with the flexibility to resell, transfer, or upgrade. A truly comprehensive solution for every event experience'
          wishlistButton
        />
      </div>
    </VideoBackgroundWrapper>
  )
}
