import { ShoppingCart } from 'lucide-react'
import Cart from '../../cart'
import { cn } from '@/lib/utils'
import type { EventDetailData } from '@/types'

export default function CartTrigger({
  event,

  className,
}: ICartTriggerProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      <div className='flex h-fit gap-[11px] py-4 px-2 rounded-[6px] bg-deep-red'>
        <ShoppingCart size={24} color='#ffffff' />
        <p className='h-6 rounded-full bg-white px-3 text-sm font-semibold font-sf-pro-display text-black flex items-center justify-center'>
          50 naira
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
