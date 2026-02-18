import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import ContactUsForm from './section/contact-us-form'
import Footer from '@/layouts/creators-landing-page-layout/sections/footer'

export default function ContactUsPage() {
  return (
    <VideoBackgroundWrapper
      videoSrc='/assets/creators-background.mp4'
      backgroundImage='/assets/landing-page/BG-3.webp'
      overlayOpacity={0.15}
      secondColor='#1a1a1a'
    >
      <ContactUsForm />
      <Footer />
    </VideoBackgroundWrapper>
  )
}
