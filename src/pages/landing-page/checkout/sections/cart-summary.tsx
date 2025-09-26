import { Input } from '@/components/ui/input'
import { Badge, X } from 'lucide-react'
import { formatNaira } from '@/lib/format-price'
import { useGetAllCart } from '@/hooks/use-cart'
import { getCartTotals } from '@/lib/utils'
import { useValidatePromocode, useCheckoutCart, useClearCart } from '@/hooks/use-cart'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function CartSummary({
  name,
  location,
  isFanAccount = false,
}: {
  name: string
  location: string
  isFanAccount?: boolean
}) {
  const [message, setMessage] = useState<string | null>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const cart = useGetAllCart().data?.data

  const validatePromocodeMutation = useValidatePromocode()
  const checkoutMutation = useCheckoutCart()
  const clearCartMutation = useClearCart()

  function handleValidatePromocode(promocode: string) {
    validatePromocodeMutation.mutate(
      {
        data: {
          promoCode: promocode,
          eventIds: cart?.map((item) => item.eventId) || [],
          subtotal: getCartTotals(cart).totalPrice,
          totalTickets: getCartTotals(cart).totalQuantity,
          ticketIds: cart?.map((item) => item.ticketId) || [],
        },
      },
      {
        onSuccess: (data) => {
          setMessage(data.data.message)
          setIsValid(data.data.isValid)
        },
        onError: (error: any) => {
          setMessage(error.response?.data?.message || 'Something went wrong')
          setIsValid(false)
        },
      },
    )
  }

  function handleCheckout() {
    checkoutMutation.mutate(
      {
        data: {
          paymentMethod: '',
          promoCode: '',
          promoCodeId: '',
          transactionReference: '',
          paymentReference: '',
        },
      },
      {
        onSuccess: () => {
          clearCartMutation.mutate()
        },
      },
    )
  }

  return (
    <div className='max-w-[752px] w-full flex flex-col items-center gap-[67px]'>
      <div className='flex flex-col items-center text-white'>
        <p className='text-[32px] font-bold font-sf-compact leading-[100%] tracking-[-0.25px] capitalize text-center'>
          {name}
        </p>
        <p className='font-sf-pro-display leading-[100%]'>{location}</p>
      </div>

      <div className='w-full flex flex-col gap-7'>
        {cart?.map((item) => (
          <CartTicket
            key={item.cartId}
            name={item.ticketName}
            price={item.price}
            quantity={item.quantity}
          />
        ))}

        <div className='flex flex-col gap-2'>
          <div
            className={cn(
              'max-w-[225px] w-full h-10 flex items-center gap-[5px] pl-2 rounded-[5px] border border-white',
              { 'border-[#FF9500]': !isValid, 'border-white': isValid },
            )}>
            <Badge color='#ffffff' fill='#ffffff' stroke='#ffffff' size={13} />
            <Input
              placeholder='ENTER PROMO CODE'
              className='border-none pl-none rounded-none uppercase text-xs font-input-mono text-white font-light placeholder:text-white'
              onChange={(e) => handleValidatePromocode(e.target.value)}
            />
          </div>

          {message && (
            <p className='text-sm font-sf-pro-display leading-[100%] text-[#FF9500]'>{message}</p>
          )}
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='font-sf-pro-display text-xl text-white leading-[100%]'>TOTAL:</p>

          <p className='text-white font-sf-pro-text leading-[100%]'>
            {formatNaira(getCartTotals(cart).totalPrice)}
          </p>
        </div>

        {isFanAccount && (
          <Button
            onClick={handleCheckout}
            className='w-[140px] h-8 rounded-[6px] bg-deep-red uppercase text-sm font-sf-pro-display leading-[100%] self-center'>
            checkout
          </Button>
        )}
      </div>
    </div>
  )
}

function CartTicket({ name, price, quantity }: InitialTickets) {
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex flex-col gap-1 text-white'>
        <p className='font-sf-pro-display uppercase leading-[100%]'>{name}</p>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-sf-pro-text leading-[100%]'>{formatNaira(price)}</p>
          <p className='text-xs font-sf-pro-display leading-[100%] text-[#ACACAC]'>
            +{formatNaira(1500)} fee
          </p>
        </div>
      </div>

      <div className='h-[60px] w-14 flex items-center justify-end gap-2'>
        <X color='#ffffff' size={9} />
        <p className='text-xl font-sf-pro-text leading-[100px]'>{quantity}</p>
      </div>
    </div>
  )
}

interface InitialTickets {
  name: string
  price: number
  quantity: number
}
