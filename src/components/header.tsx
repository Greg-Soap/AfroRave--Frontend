import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { NavLogo } from './nav-logo'
import BaseDropdown from './reusable/base-dropdown'
import BaseSheet from './reusable/base-sheet'
import { useEffect, useState } from 'react'
import MobileMenu from './mobile-menu'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className='w-full fixed top-0 flex justify-center z-50 '>
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? 'h-full bg-black/25 backdrop-blur-sm' : 'h-0'
        }`}
      />

      <nav className='relative max-w-[var(--max-width)] px-4 md:px-7 w-full flex items-center justify-between py-4'>
        <NavLogo />

        <div className='flex items-center gap-5'>
          <Search size={26} color='var(--foreground)' className='max-sm:hidden cursor-pointer' />

          <BaseDropdown
            trigger={
              <Button className='h-9 w-[86px] bg-white text-black font-input-mono hover:bg-white/90'>
                Log In
              </Button>
            }
            items={[
              { to: '?login=true&auth=guest', label: 'Guest' },
              { to: '?login=true&auth=creator', label: 'Creator' },
              { to: '?login=true&auth=vendor', label: 'Vendor' },
            ]}
          />

          <BaseSheet
            side='right'
            size='sm'
            title='Menu'
            circleCancel
            trigger={
              <button
                type='button'
                aria-label='Open menu'
                className='p-2 hover:bg-white/10 rounded-lg transition-colors'>
                <img src='/assets/landing-page/menu.svg' alt='' className='w-6 h-6' />
              </button>
            }
            contentClassName='bg-[#0F0F0F] text-white px-3'>
            <MobileMenu />
          </BaseSheet>
        </div>
      </nav>
    </header>
  )
}
