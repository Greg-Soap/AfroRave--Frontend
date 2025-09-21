import { Input } from '@/components/ui/input'
import { Badge, X } from 'lucide-react'
import { formatNaira } from '@/lib/format-price'
import { useGetAllCart } from '@/hooks/use-cart'
import type { CartData } from '@/types/cart'

export default function CartSummary({
  name,
  location,
}: {
  name: string
  location: string
}) {
  const cart = useGetAllCart().data?.data

  function getCartTotals(cartItems: CartData[] = []) {
    return cartItems.reduce(
      (acc, item) => {
        acc.totalQuantity += item.quantity || 0
        acc.totalPrice += (item.price || 0) * (item.quantity || 0)
        return acc
      },
      { totalQuantity: 0, totalPrice: 0 },
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

        <div className='max-w-[225px] w-full h-10 flex items-center gap-[5px] pl-2 rounded-[5px] border border-white'>
          <Badge color='#ffffff' fill='#ffffff' stroke='#ffffff' size={13} />
          <Input
            placeholder='ENTER PROMO CODE'
            className='border-none pl-none rounded-none uppercase text-xs font-input-mono text-white font-light placeholder:text-white'
          />
        </div>

        <div className='w-full flex items-center justify-between'>
          <p className='font-sf-pro-display text-xl text-white leading-[100%]'>TOTAL:</p>

          <p className='text-white font-sf-pro-text leading-[100%]'>
            {formatNaira(getCartTotals(cart).totalPrice)}
          </p>
        </div>
      </div>
    </div>
  )
}

function CartTicket({ name, price, quantity }: InitialTickets) {
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex flex-col gap-1 text-white'>
        <p className='font-sf-pro-display uppercase leading-[100%]'>{name}</p>
        <div className='flex flex-col gap-0.5'>
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
