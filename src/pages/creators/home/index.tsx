// import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
// import CTASection from './sections/cta'
// import HeroSection from './sections/hero'
// import RolesSection from './sections/roles'

// export default function CreatorsHomePage() {
//   return (
//     <VideoBackgroundWrapper overlayOpacity={0.6} secondColor='#a2a2a2'>
//       <HeroSection />

//       <RolesSection />

//       <CTASection />
//     </VideoBackgroundWrapper>
//   )
// }








// Hope: Added the animation
import { VideoBackgroundWrapper } from '@/components/shared/video-background-wrapper'
import CTASection from './sections/cta'
import HeroSection from './sections/hero'
import RolesSection from './sections/roles'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CreatorsHomePage() {
  return (
    <VideoBackgroundWrapper
      overlayOpacity={0.6}
      secondColor='#a2a2a2'
      backgroundImage='/assets/landing-page/BG-3-new.png?v=1'
    >
      <HeroSection />
      <RolesSectionWrapper />
      <CTASectionWrapper />
    </VideoBackgroundWrapper>
  )
}

function RolesSectionWrapper() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -100px 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ y: isInView ? 0 : '50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <RolesSection />
    </motion.div>
  )
}

function CTASectionWrapper() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -100px 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ y: isInView ? 0 : '50%' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <CTASection />
    </motion.div>
  )
}