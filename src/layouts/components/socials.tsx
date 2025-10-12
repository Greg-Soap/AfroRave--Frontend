import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function Socials({
  className,
  data = socials,
  isCreator = false,
}: {
  className?: string
  data?: ISocials[]
  isCreator?: boolean
}) {
  return (
    <div className={cn('w-full flex items-center gap-2.5', className)}>
      {data.map((item) => (
        <Link key={item.alt} to={item.href} className='cursor-pointer hover:opacity-80'>
          <img
            src={item.icon}
            alt={item.alt}
            className={cn('w-[18px] h-auto', {
              'w-[32px] h-[32px]': isCreator,
            })}
          />
        </Link>
      ))}
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
