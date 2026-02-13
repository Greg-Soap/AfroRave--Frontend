// import NewsletterSignup from '@/components/newsletter-signup'
// import { Button } from '@/components/ui/button'
// import { OnlyShowIf } from '@/lib/environment'
// import { cn } from '@/lib/utils'

// export default function HeroSection({
//   description = ' We equip organizers with the tools to create, manage, and sell out their events, And vendors? They discover new opportunities, connect with organizers, and grow their businesses.',
//   wideDescription = false,
//   noButton = false,
//   wishlistButton = false,
// }: {
//   description?: string
//   wideDescription?: boolean
//   noButton?: boolean
//   wishlistButton?: boolean
// }) {
//   return (
//     <section className=' w-full min-h-screen flex flex-col items-center justify-center py-[100px] z-50'>
//       <div
//         className={cn(
//           'w-full flex flex-col items-center gap-8 md:gap-5 text-white font-sf-pro px-5 md:px-[60px]',
//           {
//             'max-w-[700px]': !wideDescription,
//             'max-w-[900px]': wideDescription,
//           },
//         )}>
//         <p className='max-w-[514px] text-center text-white text-[40px] font-black uppercase'>
//           All-in-One Hub
//           <br /> for Fans and Creators
//         </p>
//         <p className='text-center uppercase'>{description}</p>
//         <OnlyShowIf condition={!noButton}>
//           <Button className='max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px] uppercase'>
//             Get Started
//           </Button>
//         </OnlyShowIf>
//         <OnlyShowIf condition={wishlistButton}>
//           <NewsletterSignup />
//         </OnlyShowIf>
//       </div>
//     </section>
//   )
// }

import NewsletterSignup from '@/components/newsletter-signup'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { OnlyShowIf } from '@/lib/environment'
import { cn } from '@/lib/utils'

export default function HeroSection({
  description = 'WE EQUIP ORGANIZERS WITH THE TOOLS TO CREATE, MANAGE, AND SELL OUT THEIR EVENTS, AND VENDORS? THEY DISCOVER NEW OPPORTUNITIES, CONNECT WITH ORGANIZERS, AND GROW THEIR BUSINESSES.',
  wideDescription = false,
  noButton = false,
  wishlistButton = false,
}: {
  description?: string
  wideDescription?: boolean
  noButton?: boolean
  wishlistButton?: boolean
}) {
  const { openAuthModal } = useAuth()

  return (
    <section className='w-full min-h-screen flex flex-col items-center justify-center py-10 sm:py-16 md:py-[100px] z-50'>
      <div
        className={cn(
          'w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-5 text-white font-sf-pro px-4 sm:px-5 md:px-[60px]',
          {
            'max-w-[700px]': !wideDescription,
            'max-w-[900px]': wideDescription,
          },
        )}>
        <p className='w-full max-w-[514px] text-center text-white text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-black uppercase leading-tight'>
          ALL-IN-ONE HUB
          <br /> FOR FANS AND CREATORS
        </p>
        <p className='text-center uppercase text-xs sm:text-sm md:text-base leading-relaxed px-2 max-w-[800px]'>
          {description}
        </p>
        <OnlyShowIf condition={!noButton}>
          <Button
            onClick={() => openAuthModal('signup')}
            className='w-full sm:max-w-[120px] h-10 sm:h-auto rounded-[20px] font-sf-pro-text text-sm font-semibold px-4 sm:px-[17px] py-[11px] uppercase max-w-xs mx-auto'>
            Get Started
          </Button>
        </OnlyShowIf>
        <OnlyShowIf condition={wishlistButton}>
          <NewsletterSignup />
        </OnlyShowIf>
      </div>
    </section>
  )
}
