import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { formatNaira } from '@/lib/format-price'
import { useState } from 'react'
import type { EventDetailData } from '@/types'
import { RenderEventImage } from '@/components/shared/render-event-flyer'
import { useUpdateCartQuantity, useGetAllCart } from '@/hooks/use-cart'

export default function CartContainer({ event }: CartContainerProps) {
  const cart = useGetAllCart().data?.data

  return (
    <section className='container flex items-center justify-center gap-[192px] z-10 min-h-[calc(100vh-210px)]'>
      <RenderEventImage
        image={event.eventDetails.desktopMedia?.flyer}
        event_name={event.eventName}
      />

      <div className='max-w-[703px] w-1/2 flex flex-col gap-[67px] px-5 py-[71px]'>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-5xl uppercase text-center leading-normal font-phosphate'>
            {event.eventName}
          </p>
          <p className='font-extralight text-2xl font-sf-pro-display text-center'>{event.venue}</p>
        </div>

        <ul className='flex flex-col gap-[72px]'>
          {cart?.map((item) => (
            <CartTicketCard
              key={item.cartId}
              id={String(item.cartId)}
              name={item.ticketName}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function CartTicketCard({ id, name, price, quantity }: ICartTicketCard) {
  return (
    <li className='list-disc flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <p className='text-2xl font-sf-pro-display'>{name}</p>
        <div className='flex flex-col gap-1 font-input-mono opacity-70'>
          <p>{formatNaira(price)}</p>
          <p className='text-[13px]'>{formatNaira(1350)} fee/ticket</p>
        </div>
      </div>

      <TicketQuantityControl cartId={id} quantity={quantity} />
    </li>
  )
}

function TicketQuantityControl({ quantity, cartId }: { quantity: number; cartId: string }) {
  const [ticketCount, setTicketCount] = useState<number>(quantity)

  const updateQuantityMutation = useUpdateCartQuantity()

  function updateCart(quantity: number) {
    updateQuantityMutation.mutate(
      { data: quantity, cartId: cartId },
      {
        onSuccess: () => {
          setTicketCount(quantity)
        },
      },
    )
  }

  return (
    <div className='flex items-center gap-3.5'>
      <Button
        variant='ghost'
        className='hover:bg-white/10'
        onClick={() => updateCart(ticketCount - 1)}
        disabled={ticketCount <= 0}>
        <Minus color='var(--foreground)' size={15} />
      </Button>

      <span className='font-input-mono text-xl'>{ticketCount}</span>

      <Button
        variant='ghost'
        className='hover:bg-white/10'
        onClick={() => updateCart(ticketCount + 1)}>
        <Plus color='var(--foreground)' size={15} />
      </Button>
    </div>
  )
}

interface CartContainerProps {
  event: EventDetailData
}

interface ICartTicketCard {
  id: string
  name: string
  price: number
  quantity: number
}
