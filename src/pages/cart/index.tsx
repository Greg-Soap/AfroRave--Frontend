import { formatNaira } from '@/lib/format-price'
import { ShoppingCart } from 'lucide-react'
import TicketPurchaseContainer from './ticket-purchase-ctn'
import CustomSheet from '@/components/reusable/base-sheet'
import { NavLogo } from '@/components/nav-logo'
import type { IEvents } from '@/data/events'

export default function Cart({ event }: { event: IEvents }) {
  return (
    <CustomSheet
      hasNav
      size='full'
      side='bottom'
      title='Your Shopping Cart'
      description='Review and manage your ticket purchases before checkout'
      contentClassName='pt-[150px]'
      triggerClassName='flex items-center gap-5 w-full md:w-[378px] h-fit py-4 px-6 bg-[#5BAE0D] hover:bg-[#5BAE0D]/80 rounded-sm'
      trigger={<SheetTrigger />}
      navChildren={<NavLogo />}>
      <TicketPurchaseContainer event={event} />

      <div className='flex h-10 w-full bg-transparent' />
    </CustomSheet>
  )
}

export function SheetTrigger() {
  return (
    <>
      <ShoppingCart size={57} color='var(--foreground)' className='size-8' />
      <span className='text-xl font-sf-pro-display'>{formatNaira(73350)}</span>
    </>
  )
}
