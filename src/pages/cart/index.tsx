import { formatNaira } from '@/lib/format-price'
import { ShoppingCart } from 'lucide-react'
import TicketPurchaseContainer from './ticket-purchase-ctn'
import CustomSheet from '@/components/reusable/base-sheet'
import { NavLogo } from '@/components/nav-logo'
import type { IEvents } from '@/data/events'
import { Button } from '@/components/ui/button'

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
      navChildren={<NavLogo />}
      footerContent={
        <footer className='w-fit flex flex-col items-center gap-2 px-5 py-3 rounded-t-[20px] sticky bottom-0 left-[calc(100%-450px)] bg-accent'>
          <div className='w-full flex items-center justify-between font-sf-pro-display'>
            <span className='font-light text-2xl'>{formatNaira(73350)}</span>
            <Button className='bg-white text-black hover:bg-white/90'>Continue</Button>
          </div>

          <p className='font-input-mono text-sm opacity-70'>Please checkout within 10:00 minutes</p>
        </footer>
      }>
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
