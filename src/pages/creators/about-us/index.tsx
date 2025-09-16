import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import LeadershipSection from './sections/leadership'
import StatementSection from './sections/statements'
import WorKWithUsSection from './sections/work-with-us'

export default function AboutUsPage() {
  return (
    <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
      <StatementSection />

      <LeadershipSection />

      <WorKWithUsSection />
    </VideoBackgroundWrapper>
  )
}
