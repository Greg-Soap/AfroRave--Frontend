import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { formatNaira } from '@/lib/format-price'
import type { IEvents } from '@/data/events'

export default function TicketPurchaseContainer({ event }: { event: IEvents }) {
  return (
    <section className='container flex items-center justify-center gap-[100px]'>
      <img
        src={event.image}
        alt={event.event_name}
        width={217}
        height={282}
        className='rounded-[5px] w-[217px] h-[282px]'
      />

      <div className='max-w-[703px] w-1/2 flex flex-col gap-5'>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-5xl uppercase text-center'>{event.event_name}</p>
          <p className='font-[200] text-2xl font-sf-pro-display text-center'>
            {event.event_location}
          </p>
        </div>

        <ul className='flex flex-col gap-3'>
          {event.tickets.map((item) => (
            <CartTicketCard key={item.name} {...item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function CartTicketCard({ name, price }: { name: string; price: number }) {
  return (
    <li className='list-disc flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <p className='text-2xl font-sf-pro-display'>{name}</p>
        <div className='flex flex-col font-input-mono opacity-70'>
          <p>{formatNaira(price)}</p>
          <p className='text-[13px]'>{formatNaira(1350)} fee/ticket</p>
        </div>
      </div>

      <TicketQuantityControl count={1} />
    </li>
  )
}

function TicketQuantityControl({ count }: { count: number }) {
  return (
    <div className='flex items-center gap-3.5'>
      <Button variant='ghost' className='hover:bg-white/10'>
        <Minus color='var(--foreground)' size={15} />
      </Button>

      <span className='font-input-mono text-xl'>{count}</span>

      <Button variant='ghost' className='hover:bg-white/10'>
        <Plus color='var(--foreground)' size={15} />
      </Button>
    </div>
  )
}
