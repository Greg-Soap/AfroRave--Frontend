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
import Footer from '@/layouts/creators-landing-page-layout/sections/footer'

export default function CreatorsHomePage() {
  return (
    <VideoBackgroundWrapper
      videoSrc='/assets/creators-background.mp4'
      backgroundImage='/assets/landing-page/BG-3.webp'
      overlayOpacity={0.15}
      secondColor='#1a1a1a'
      videoOpacity={0.1}
      videoBlendMode='color-dodge'
    >
      <HeroSection />
      <div className='flex flex-col gap-20 md:gap-[200px] pb-16 md:pb-[120px]'>
        <RolesSectionWrapper />
        <CTASectionWrapper />
      </div>
      <Footer />
    </VideoBackgroundWrapper>
  )
}

function RolesSectionWrapper() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -50px 0px',
  })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
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