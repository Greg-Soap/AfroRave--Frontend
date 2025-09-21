import { ShoppingCart, LoaderCircle } from 'lucide-react'
import Cart from '../../cart'
import { cn } from '@/lib/utils'
import type { EventDetailData } from '@/types'
import { useGetAllCart } from '@/hooks/use-cart'
import type { CartData } from '@/types/cart'

export default function CartTrigger({ event, className }: ICartTriggerProps) {
  const { data, isLoading } = useGetAllCart()

  function getTotalTickets(cartItems: CartData[] = []) {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
  }

  return (
    <div className={cn('flex gap-4', className)}>
      <div className='flex h-fit gap-[11px] py-4 px-2 rounded-[6px] bg-deep-red'>
        <ShoppingCart size={24} color='#ffffff' />

        <p className='h-6 rounded-full bg-white px-3 text-sm font-semibold font-sf-pro-display text-black flex items-center justify-center'>
          {isLoading ? (
            <LoaderCircle color='#000000' size={14} className='animate-spin' />
          ) : (
            getTotalTickets(data?.data)
          )}
        </p>
      </div>
      <div className='w-full'>
        <Cart event={event} />
      </div>
    </div>
  )
}

interface ICartTriggerProps {
  event: EventDetailData
  className?: string
}
