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
    <section className='w-full h-[990px] flex flex-col items-center justify-center px-[60px] py-[10px] z-50'>
      <div
        className={cn(
          'w-full flex flex-col items-center gap-[20px] text-white text-center',
          {
            'max-w-[700px]': !wideDescription,
            'max-w-[960px]': wideDescription,
          },
        )}>
        {/* Title — 2 lines, large bold */}
        <h1 className='font-sf-pro-text font-black text-[40px] uppercase leading-none tracking-[0] text-white'>
          ALL-IN-ONE HUB<br />FOR FANS AND CREATORS
        </h1>

        {/* Subtitle */}
        <p className='font-sf-pro-text text-[16px] uppercase leading-none tracking-[0] text-white' style={{ fontWeight: 300 }}>
          {description}
        </p>

        <OnlyShowIf condition={!noButton}>
          <Button
            onClick={() => openAuthModal('signup')}
            className='w-[120px] h-[40px] rounded-[20px] bg-[#1E1E1E] text-white uppercase gap-[8px] border-0 hover:bg-[#2a2a2a] transition-colors'
            style={{ boxShadow: '0px 2px 10px 2px rgba(0,0,0,0.10)' }}
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
