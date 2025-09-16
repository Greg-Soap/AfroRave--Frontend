import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import CTASection from './sections/cta'
import HeroSection from './sections/hero'
import RolesSection from './sections/roles'

export default function CreatorsHomePage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
      <HeroSection />

      <RolesSection />

      <CTASection />
    </VideoBackgroundWrapper>
  )
}
