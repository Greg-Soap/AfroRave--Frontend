// import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
// import { getRoutePath } from '@/config/get-route-path'
// import LoginButton from '@/layouts/components/login-button'
import { useScroll } from '@/lib/useScroll'
// import { cn } from '@/lib/utils'
// import { useAfroStore } from '@/stores'
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

export default function Header() {
  const { hasScrolled } = useScroll()
  // const { user, isAuthenticated, isCreator } = useAfroStore()

  return (
    <header className='w-full fixed top-0 flex justify-center z-50 h-20 bg-transparent '>
      <div
        className={`absolute inset-0 transition-all duration-300 ${hasScrolled ? 'h-full bg-black/25 backdrop-blur-sm' : 'h-0'
          }`}
      />

      <nav className='relative px-4 md:px-8 w-full flex flex-col gap-y-3 items-center py-4'>
        <div className='flex w-full items-center justify-between'>
          <div>
            <img
              src='/assets/landing-page/AR.png'
              alt='AR'
              width={80}
              height={40}
              className='self-center'
            />
          </div>

          {/* <NavigationLinks /> */}

          <div className='flex items-center gap-5'>
            <CountdownTimer />
            {/* {isAuthenticated && isCreator && <CreatorMenuButton user={user} variant='dark' />} */}

            {/* {!isAuthenticated && (
              <>
                <LoginButton className='bg-transparent uppercase text-white h-[35px] w-[75px] hover:bg-black/20 shadow-none text-sm font-light font-input-mono' />
              </>
            )} */}
          </div>
        </div>
        {/* <NavigationLinks type='mobile' /> */}
      </nav>
    </header>
  )
}
// Add back after launch
// function NavigationLinks({
//   type = 'desktop',
// }: {
//   type?: 'desktop' | 'mobile'
// }) {
//   return (
//     <div
//       className={cn('items-center', {
//         'hidden md:flex gap-16': type === 'desktop',
//         'w-full flex justify-between md:hidden': type === 'mobile',
//       })}>
//       {links.map((item) => (
//         <NavLink
//           key={item.name}
//           to={item.href}
//           className={({ isActive }) =>
//             cn(
//               'font-input-mono font-light text-xs md:text-sm uppercase px-3 py-1 border-b text-white',
//               {
//                 'border-deep-red': isActive,
//                 'border-transparent': !isActive,
//               },
//             )
//           }>
//           {item.name}
//         </NavLink>
//       ))}
//     </div>
//   )
// }

// const links: ILinks[] = [
//   { href: getRoutePath('creators_home'), name: 'Home' },
//   { href: getRoutePath('creators_about'), name: 'About Us' },
//   { href: getRoutePath('creators_contact'), name: 'Contact Us' },
//   { href: getRoutePath('creators_blog'), name: 'Blog' },
// ]

// interface ILinks {
//   href: string
//   name: string
// }

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
      className='flex items-center gap-2 text-white text-center'
      style={{
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '100%',
        letterSpacing: '0%',
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
