// import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
// import LeadershipSection from './sections/leadership'
// import StatementSection from './sections/statements'
// import WorKWithUsSection from './sections/work-with-us'

// export default function AboutUsPage() {
//   return (
//     <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
//       <StatementSection />

//       <LeadershipSection />

//       <WorKWithUsSection />
//     </VideoBackgroundWrapper>
//   )
// }




// Hope added animation.
import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import LeadershipSection from './sections/leadership'
import StatementSection from './sections/statements'
import WorKWithUsSection from './sections/work-with-us'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Footer from '@/layouts/creators-landing-page-layout/sections/footer'

export default function AboutUsPage() {
  return (
    <VideoBackgroundWrapper
      videoSrc='/assets/creators-background.mp4'
      backgroundImage='/assets/landing-page/BG-3.webp'
      overlayOpacity={0.15}
      secondColor='#1a1a1a'
    >
      <StatementSection />
      <LeadershipSectionWrapper />
      <WorKWithUsSectionWrapper />
      <Footer />
    </VideoBackgroundWrapper>
  )
}

function LeadershipSectionWrapper() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: '-100px 0px -100px 0px' // Optional: Adjust trigger zone for earlier/later detection
  })

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ y: isInView ? 0 : '50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <LeadershipSection />
    </motion.div>
  )
}

function WorKWithUsSectionWrapper() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: '-100px 0px -100px 0px' // Optional: Matches Leadership for consistent timing
  })

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ y: isInView ? 0 : '50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <WorKWithUsSection />
    </motion.div>
  )
}