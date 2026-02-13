import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import ContactUsForm from './section/contact-us-form'
import Footer from '@/layouts/creators-landing-page-layout/sections/footer'

export default function ContactUsPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
      <ContactUsForm />
      <Footer />
    </VideoBackgroundWrapper>
  )
}
