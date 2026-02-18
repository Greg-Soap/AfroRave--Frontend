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
    <section className='w-full min-h-screen flex flex-col items-center justify-center z-50'>
      <div
        className={cn(
          'w-full flex flex-col items-center gap-7 text-white font-sf-pro px-6 md:px-12 text-center',
          {
            'max-w-[640px]': !wideDescription,
            'max-w-[960px]': wideDescription,
          },
        )}>
        {/* Title — 2 lines, large bold */}
        <h1 className='text-[36px] sm:text-[44px] md:text-[52px] font-black uppercase leading-tight tracking-wide'>
          ALL-IN-ONE HUB<br />FOR FANS AND CREATORS
        </h1>

        {/* Subtitle */}
        <p className='text-[13px] sm:text-[14px] font-normal uppercase leading-relaxed max-w-[580px] text-white/85'>
          {description}
        </p>

        <OnlyShowIf condition={!noButton}>
          <Button
            onClick={() => openAuthModal('signup')}
            className='h-11 rounded-full font-sf-pro-text text-[13px] font-semibold px-8 uppercase bg-[#111] text-white hover:bg-white/10 border border-white/25 transition-colors'
          >
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
