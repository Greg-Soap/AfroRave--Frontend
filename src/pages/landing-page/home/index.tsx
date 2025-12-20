// import Hero from './hero'
// import OwnTheStage from './own-the-stage'
// import Socials from './socials'
// import { SEO } from '../../../components/seo'
// export default function LandingPage() {
//   return (
//     <>
//       <SEO
//         title='Afro Revive - African Concert Tickets & Events'
//         description='Buy tickets for the hottest African concerts and events. Secure your spot for live performances by top African artists and experience authentic African entertainment.'
//       />
//       <Hero />
//       <OwnTheStage />
//       <Socials />
//     </>
//   )
// }


//Hope! animation included to the section.
import Hero from './hero'
import OwnTheStage from './own-the-stage'
import Socials from './socials'
import { SEO } from '../../../components/seo'
import { VendorRegistrationFlow } from '@/components/vendor/vendor-registration-flow'

export default function LandingPage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <SEO
        title='Afro Revive - African Concert Tickets & Events'
        description='Buy tickets for the hottest African concerts and events. Secure your spot for live performances by top African artists and experience authentic African entertainment.'
      />
      <Hero />
      <OwnTheStage />
      <Socials />
    </div>
  )
}
// console.log('🚀 LandingPage file loaded')

// function OwnTheStageSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { 
//     once: false, 
//     margin: '-100px 0px -100px 0px' // Optional: Matches Socials for consistent trigger zone
//   })

//   return (
//     <motion.div
//       ref={ref}
//       initial={false} // Skip initial animation on mount
//       animate={{ y: isInView ? 0 : '50%' }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//     >
//       <OwnTheStage />
//     </motion.div>
//   )
// }

// function SocialsSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { 
//     once: false, 
//     margin: '-100px 0px -100px 0px' // Optional: Fine-tune trigger zone (top/bottom margins for earlier/later detection)
//   })

//   return (
//     <motion.div
//       ref={ref}
//       initial={false} // Skip initial animation on mount
//       animate={{ x: isInView ? 0 : '50%' }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//       style={{ overflow: 'hidden' }}
//     >
      
//     </motion.div>
//   )
// }