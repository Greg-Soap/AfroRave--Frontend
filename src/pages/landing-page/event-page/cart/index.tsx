import BaseModal from '@/components/reusable/base-modal'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { NavLogo } from '@/layouts/root-layout/header/nav-logo'
import { formatNaira } from '@/lib/format-price'
import type { EventDetailData } from '@/types'
import { X } from 'lucide-react'
import { useState } from 'react'
import CheckoutPage from '../../checkout'
import CartContainer from './cart-container'

interface CartProps {
  event: EventDetailData
}

export default function Cart({ event }: CartProps) {
  const [totalPrice, setTotalPrice] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      <Button
        className='w-full h-14 flex items-center justify-between bg-deep-red px-3 rounded-[8px] gap-[50px] md:gap-[107px] font-sf-pro-display hover:bg-deep-red/80'
        onClick={() => setIsOpen(true)}>
        <span className='text-sm'>Checkout</span>
        <span className='text-2xl'>{formatNaira(totalPrice)}</span>
      </Button>

      <BaseModal
        size='full'
        className='bg-transparent'
        floatingCancel
        onClose={() => setIsOpen(false)}
        open={isOpen}
        hasFooter
        footerContent={
          <FooterContent
            totalPrice={totalPrice}
            action={() => {
              setIsOpen(false)
              setCheckoutOpen(true)
            }}
          />
        }>
        <div className='fixed top-0 left-0 w-full pointer-events-none'>
          <NavLogo />
        </div>
        <div className='flex flex-col h-fit w-full justify-center items-center mt-[100px]'>
          <CartContainer event={event} onTotalPriceChange={setTotalPrice} />
        </div>
      </BaseModal>

      <BaseModal
        size='full'
        className='bg-transparent'
        floatingCancel
        removeCancel
        onClose={() => setCheckoutOpen(false)}
        open={checkoutOpen}>
        <div className='w-full flex justify-between items-center px-8 !bg-transparent'>
          <NavLogo />

          <DialogClose className='bg-transparent !p-1 shadow-none !z-[1000]'>
            <X size={16} color='#000000' strokeWidth={2} />
          </DialogClose>
        </div>
        <CheckoutPage
          event_name={event.eventName}
          event_location={event.venue}
          tickets={undefined}
        />
      </BaseModal>
    </>
  )
}

function FooterContent({
  totalPrice,
  action,
}: {
  totalPrice: number
  action: () => void
}) {
  return (
    <footer className='w-[595px] flex flex-col items-center gap-2 pl-[81px] pr-[51px] py-[30px] rounded-t-[20px] self-end ml-auto right-[73px] bg-secondary'>
      <div className='w-full flex items-center justify-between font-sf-pro-display'>
        <span className='font-light text-2xl'>{formatNaira(totalPrice)}</span>
        <Button onClick={action} className='bg-white text-black hover:bg-white/90'>
          Continue
        </Button>
      </div>
    </footer>
  )
}
