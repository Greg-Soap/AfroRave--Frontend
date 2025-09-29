import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
import { getRoutePath } from '@/config/get-route-path'
import LoginButton from '@/layouts/components/login-button'
import { useScroll } from '@/lib/useScroll'
import { cn } from '@/lib/utils'
import { useAfroStore } from '@/stores'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const { hasScrolled } = useScroll()
  const { user, isAuthenticated, isCreator } = useAfroStore()

  return (
    <header className='w-full fixed top-0 flex justify-center z-50 h-20 bg-transparent'>
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? 'h-[120px] lg:h-full bg-black/25 backdrop-blur-sm' : 'h-0'
        }`}
      />

      <nav className='relative px-4 md:px-8 w-full flex flex-col gap-y-3 items-center py-4'>
        <div className='flex w-full items-center justify-between'>
          <Link to={getRoutePath('creators_home')}>
            <img
              src='/assets/landing-page/AR.png'
              alt='AR'
              width={80}
              height={40}
              className='self-center'
            />
          </Link>

          <NavigationLinks />

          <div className='flex items-center gap-5'>
            {isAuthenticated && isCreator && <CreatorMenuButton user={user} variant='dark' />}

            {!isAuthenticated && (
              <>
                <LoginButton className='bg-transparent uppercase text-white h-[35px] w-[75px] hover:bg-black/20 shadow-none text-sm font-light font-input-mono' />
              </>
            )}
          </div>
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
        'hidden lg:flex gap-16': type === 'desktop',
        'w-full flex justify-between lg:hidden': type === 'mobile',
      })}>
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            cn(
              'font-input-mono font-light text-xs md:text-sm uppercase px-3 py-1 border-b text-white',
              {
                'border-deep-red': isActive,
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
  { href: getRoutePath('creators_blog'), name: 'Blog' },
  { href: getRoutePath('creators_wishlist'), name: 'Wishlist' },
]

interface ILinks {
  href: string
  name: string
}
