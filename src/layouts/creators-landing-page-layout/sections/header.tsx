import { getRoutePath } from '@/config/get-route-path'
import { useScroll } from '@/lib/useScroll'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const { hasScrolled } = useScroll()
  const { openAuthModal } = useAuth()
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  return (
    <header className='w-full fixed top-0 flex justify-center z-50 h-32 md:h-28 bg-transparent '>
      <div
        className={`absolute inset-0 transition-all duration-300 ${hasScrolled ? 'h-full bg-black/25 backdrop-blur-sm' : 'h-0'
          }`}
      />

      <nav className='relative px-4 md:px-8 lg:px-16 w-full max-w-[1400px] flex flex-col gap-y-4 items-center py-4 md:py-6'>
        <div className='flex w-full items-center justify-between'>
          <div>
            <img
              src='/assets/landing-page/AR.png'
              alt='AR'
              className='self-center w-16 h-8 md:w-20 md:h-10'
            />
          </div>

          <NavigationLinks />

          <div className='flex items-center gap-5'>
            {/* Login Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className='flex items-center gap-2 bg-transparent uppercase text-white h-[35px] px-4 hover:bg-black/20 shadow-none text-sm font-light font-input-mono transition-colors'
              >
                LOG IN
              </button>

              {showLoginDropdown && (
                <div className='absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden min-w-[150px] border border-white/10'>
                  <button
                    onClick={() => {
                      setShowLoginDropdown(false)
                      openAuthModal('login', 'creator')
                    }}
                    className='w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors uppercase text-sm font-input-mono border-b border-white/10'
                  >
                    ORGANIZER
                  </button>
                  <button
                    onClick={() => {
                      setShowLoginDropdown(false)
                      openAuthModal('login', 'vendor')
                    }}
                    className='w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors uppercase text-sm font-input-mono'
                  >
                    VENDOR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Countdown Timer - Centered below navigation */}
        <div className='w-full flex justify-center mt-2'>
          <CountdownTimer />
        </div>

        <NavigationLinks type='mobile' />
      </nav>
    </header>
  )
}

function NavigationLinks({
  type = 'desktop',
}: {
  type?: 'desktop' | 'mobile'
}) {
  return (
    <div
      className={cn('items-center', {
        'hidden md:flex gap-12 lg:gap-16': type === 'desktop',
        'w-full flex justify-between md:hidden': type === 'mobile',
      })}>
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            cn(
              'font-input-mono font-light text-xs md:text-base lg:text-lg uppercase px-3 py-1 border-b-2 text-white transition-all hover:border-[#E31E24]',
              {
                'border-[#E31E24]': isActive,
                'border-transparent': !isActive,
              },
            )
          }>
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}

const links: ILinks[] = [
  { href: getRoutePath('creators_home'), name: 'Home' },
  { href: getRoutePath('creators_about'), name: 'About Us' },
  { href: getRoutePath('creators_contact'), name: 'Contact Us' },
  // { href: getRoutePath('creators_blog'), name: 'Blog' },
]

interface ILinks {
  href: string
  name: string
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Target date: January 30, 2026 at 00:00:00 Nigerian Time (WAT, UTC+1)
    // Convert to UTC by subtracting 1 hour
    const targetDate = new Date('2026-01-30T00:00:00+01:00').getTime()

    function updateCountdown() {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='flex items-center gap-2 md:gap-3 text-white text-center font-bold text-xs md:text-base lg:text-lg'
      style={{
        fontFamily: 'Inter',
        lineHeight: '100%',
      }}>
      <span>{timeLeft.days}</span>
      <span>:</span>
      <span>{String(timeLeft.hours).padStart(2, '0')}</span>
      <span>:</span>
      <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span>:</span>
      <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  )
}
