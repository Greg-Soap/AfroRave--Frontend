import { Button } from '@/components/ui/button'
import NewsletterSignup from '@/components/newsletter-signup'
import { OnlyShowIf } from '@/lib/environment'
import { cn } from '@/lib/utils'

export default function HeroSection({
  description = ' We equip organizers with the tools to create, manage, and sell out their events, And vendors? They discover new opportunities, connect with organizers, and grow their businesses.',
  wideDescription = false,
  noButton = false,
  wishlistButton = false,
}: {
  description?: string
  wideDescription?: boolean
  noButton?: boolean
  wishlistButton?: boolean
}) {
  return (
    <section className=' w-full min-h-screen flex flex-col items-center justify-center py-[100px] z-50'>
      <div
        className={cn('w-full flex flex-col items-center gap-5 text-white font-sf-pro px-[60px]', {
          'max-w-[700px]': !wideDescription,
          'max-w-[900px]': wideDescription,
        })}>
        <p className='max-w-[514px] text-center text-white text-[40px] font-black uppercase'>
          All-in-One Hub
          <br /> for Fans and Creators
        </p>
        <p className='text-center uppercase'>{description}</p>
        <OnlyShowIf condition={!noButton}>
          <Button className='max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px] uppercase'>
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
