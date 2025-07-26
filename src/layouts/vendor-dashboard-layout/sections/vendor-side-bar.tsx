import { CalendarIcon } from '@/components/icons/calendar'
import { SlotIcon } from '@/components/icons/slots'
import { VendorIcon } from '@/components/icons/vendor'
import { BaseSideBar } from '@/components/reusable/base-sidebar'
import { getRoutePath } from '@/config/get-route-path'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function VendorSidebar() {
  const location = useLocation()

  return (
    <BaseSideBar className='pt-24 sticky top-0' collapsibleOnMobile={true}>
      {vendor_sidebar_links.map((item) => {
        const isActiveLink = location.pathname === item.href

        return (
          <Link
            key={item.text}
            to={item.href}
            className={cn(
              'w-full flex gap-2 items-center px-6 h-[64px] text-xs font-sf-pro-text uppercase transition-colors duration-300',
              {
                'border-l-[3px] bg-deep-red/16 border-l-deep-red text-black stroke-deep-red':
                  isActiveLink,
                'text-black/60 hover:bg-deep-red/10 stroke-black': !isActiveLink,
              },
            )}>
            {item.icon}
            {item.text}
          </Link>
        )
      })}
    </BaseSideBar>
  )
}

const vendor_sidebar_links: IVendorSidebarLinks[] = [
  {
    icon: <VendorIcon />,
    text: 'PROFILE',
    href: getRoutePath('vendor_profile'),
  },
  {
    icon: <CalendarIcon />,
    text: 'DISCOVER',
    href: getRoutePath('vendor_discover'),
  },
  {
    icon: <SlotIcon />,
    text: 'MY SLOTS',
    href: getRoutePath('vendor_slots'),
  },
]

export interface IVendorSidebarLinks {
  icon: React.ReactNode
  text: string
  href: string
}
