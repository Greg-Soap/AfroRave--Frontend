import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import ContactUsForm from './section/contact-us-form'

export default function ContactUsPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
      <ContactUsForm />
    </VideoBackgroundWrapper>
  )
}
