import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const menuLinks = [
  { href: '/', name: 'Discover' },
  { href: '/', name: 'Sale' },
  { href: '/', name: 'Blog' },
  { href: '/', name: 'Creators' },
  { href: '/', name: 'Support' },
  { href: '/', name: 'FAQ' },
]

const socials = [
  { href: '/', icon: '/assets/landing-page/insta.png', alt: 'Instagram' },
  { href: '/', icon: '/assets/landing-page/X.png', alt: 'X' },
  { href: '/', icon: '/assets/landing-page/tiktok.png', alt: 'TikTok' },
  { href: '/', icon: '/assets/landing-page/yt.png', alt: 'Youtube' },
]

export default function MobileMenu() {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col gap-4 py-6 px-8'>
        <Button className='w-full h-12 bg-white text-black hover:bg-white/90'>Log In</Button>
        <Button
          variant='secondary'
          className='w-full h-12  border-white text-white hover:bg-white/10'>
          Sign Up
        </Button>
      </div>

      <Separator className='bg-white/20 mt-16 mb-12' />

      <div className='flex flex-col gap-4 py-6'>
        {menuLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className='text-white hover:text-white/80 transition-colors font-input-mono text-xl font-light hover:underline'>
            {link.name}
          </Link>
        ))}
      </div>

      <div className='mt-auto py-6'>
        <Separator className='bg-white/20 mb-6' />
        <div className='flex items-center gap-4 justify-end'>
          {socials.map((social) => (
            <Link key={social.alt} to={social.href} className='cursor-pointer hover:opacity-80'>
              <img src={social.icon} alt={social.alt} className='w-8 h-auto' />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
