import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { formatNaira } from '@/lib/format-price'
import type { IEvents } from '@/data/events'
import { useState, useEffect } from 'react'

interface CartTicket {
  name: string
  price: number
  quantity: number
}

interface CartContainerProps {
  event: IEvents
  onTotalPriceChange: (total: number) => void
  initialTickets?: CartTicket[]
}

export default function CartContainer({
  event,
  onTotalPriceChange,
  initialTickets,
}: CartContainerProps) {
  const [tickets, setTickets] = useState<CartTicket[]>(
    initialTickets || event.tickets.map((ticket) => ({ ...ticket, quantity: 0 })),
  )

  const totalPrice = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
  const totalFees = tickets.reduce((sum, ticket) => sum + 1350 * ticket.quantity, 0)
  const grandTotal = totalPrice + totalFees

  useEffect(() => {
    onTotalPriceChange(grandTotal)
  }, [grandTotal, onTotalPriceChange])

  const updateTicketQuantity = (index: number, newQuantity: number) => {
    setTickets((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity: Math.max(0, newQuantity) }
      return updated
    })
  }

  return (
    <section className='container flex items-center justify-center gap-[192px] z-10 min-h-[calc(100vh-210px)]'>
      <img
        src={event.image}
        alt={event.event_name}
        width={217}
        height={282}
        className='rounded-[5px] w-[217px] h-[282px]'
      />

      <div className='max-w-[703px] w-1/2 flex flex-col gap-[67px] px-5 py-[71px]'>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-5xl uppercase text-center leading-normal font-phosphate'>
            {event.event_name}
          </p>
          <p className='font-extralight text-2xl font-sf-pro-display text-center'>
            {event.event_location}
          </p>
        </div>

        <ul className='flex flex-col gap-[72px]'>
          {tickets.map((item, index) => (
            <CartTicketCard
              key={item.name}
              {...item}
              onQuantityChange={(newQuantity) => updateTicketQuantity(index, newQuantity)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function CartTicketCard({
  name,
  price,
  quantity,
  onQuantityChange,
}: {
  name: string
  price: number
  quantity: number
  onQuantityChange: (quantity: number) => void
}) {
  return (
    <li className='list-disc flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <p className='text-2xl font-sf-pro-display'>{name}</p>
        <div className='flex flex-col gap-1 font-input-mono opacity-70'>
          <p>{formatNaira(price)}</p>
          <p className='text-[13px]'>{formatNaira(1350)} fee/ticket</p>
        </div>
      </div>

      <TicketQuantityControl
        count={quantity}
        onIncrement={() => onQuantityChange(quantity + 1)}
        onDecrement={() => onQuantityChange(quantity - 1)}
      />
    </li>
  )
}

function TicketQuantityControl({
  count,
  onIncrement,
  onDecrement,
}: {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <div className='flex items-center gap-3.5'>
      <Button
        variant='ghost'
        className='hover:bg-white/10'
        onClick={onDecrement}
        disabled={count <= 0}>
        <Minus color='var(--foreground)' size={15} />
      </Button>

      <span className='font-input-mono text-xl'>{count}</span>

      <Button variant='ghost' className='hover:bg-white/10' onClick={onIncrement}>
        <Plus color='var(--foreground)' size={15} />
      </Button>
    </div>
  )
}
