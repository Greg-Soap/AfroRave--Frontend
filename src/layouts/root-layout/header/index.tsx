import { account_links } from '@/components/constants'
import { CreatorMenuButton } from '@/components/reusable/creator-menu-button'
import { UserMenuButton } from '@/components/reusable/user-menu-button'
import LoginButton from '@/layouts/components/login-button'
import NavSheet from '@/layouts/components/nav-sheet'
import { useScroll } from '@/lib/useScroll'
import { cn } from '@/lib/utils'
import { useAfroStore } from '@/stores'
import { Search } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NavLogo } from './nav-logo'

export default function Header() {
  const { hasScrolled } = useScroll()
  const { user, isAuthenticated, isCreator, isFan, isVendor } = useAfroStore()

  return (
    <header className='w-full fixed top-0 flex justify-center z-50 h-[120px]'>
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? 'h-full bg-black/25 backdrop-blur-sm' : 'h-0'
        }`}
      />

      <nav className='relative px-4 md:px-8 w-full flex items-center justify-between py-4'>
        <NavLogo />

        <div className='flex items-center gap-5'>
          <Search
            size={20}
            color='var(--foreground)'
            className='max-sm:hidden cursor-pointer min-w-[26px] '
          />

          {isAuthenticated && isFan && (
            <>
              <NavigationLinks />
              <UserMenuButton user={user} />
            </>
          )}

          {isAuthenticated && (isCreator || isVendor) && (
            <>
              <CreatorMenuButton user={user} variant='dark' />
            </>
          )}

          {!isAuthenticated && (
            <>
              <LoginButton />
              <NavSheet />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

function NavigationLinks() {
  return (
    <div className='hidden md:flex items-center gap-14'>
      {account_links.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            cn('flex items-center gap-2', {
              'opacity-100': isActive,
              'opacity-60': !isActive,
            })
          }>
          <img src={item.icon} alt={item.name} className='size-[19px]' />
          <span className='text-base font-input-mono'>{item.name}</span>
        </NavLink>
      ))}
    </div>
  )
}
