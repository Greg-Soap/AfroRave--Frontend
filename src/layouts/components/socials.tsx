import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Socials({
  className,
  data = socials,
  isCreator = false,
  showLanguage = false,
}: {
  className?: string
  data?: ISocials[]
  isCreator?: boolean
  showLanguage?: boolean
}) {
  return (
    <div className={cn('w-full flex items-center justify-between', className)}>
      <div className='flex items-center gap-3'>
        {data.map((item) => (
          <Link key={item.alt} to={item.href} className='cursor-pointer hover:opacity-80'>
            <img
              src={item.icon}
              alt={item.alt}
              className={cn('w-7 h-7 object-contain', {
                'w-8 h-8': isCreator,
              })}
            />
          </Link>
        ))}
      </div>

      {showLanguage && (
        <div className='flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer'>
          <Globe size={15} strokeWidth={1.5} />
          <span className='text-xs font-sf-pro-text tracking-wide'>English</span>
        </div>
      )}
    </div>
  )
}

const socials: ISocials[] = [
  { href: '/', icon: '/assets/landing-page/insta.png', alt: 'Instagram' },
  { href: '/', icon: '/assets/landing-page/X.png', alt: 'X' },
  { href: '/', icon: '/assets/landing-page/yt.png', alt: 'Youtube' },
]

export interface ISocials {
  href: string
  icon: string
  alt: string
}
