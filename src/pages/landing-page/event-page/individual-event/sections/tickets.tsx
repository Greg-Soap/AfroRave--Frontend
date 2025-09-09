import { BlockName } from '../../_components/block-name'
import { cn } from '@/lib/utils'
import { formatNaira } from '@/lib/format-price'
import { type LucideIcon, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetEventTickets } from '@/hooks/use-event-mutations'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateCart, useGetAllCart } from '@/hooks/use-cart'

export default function TicketSection({ eventId, layout }: ITicketProps) {
  const { data: ticketResponse, isPending: isLoading } = useGetEventTickets(eventId)

  const tickets = ticketResponse?.data

  return (
    <div
      className={cn('!w-full flex flex-col gap-7', {
        'px-5 lg:px-[120px]': layout === 'default',
        'pl-5 lg:pl-[120px]': layout !== 'default',
      })}>
      <div className='flex items-center gap-5'>
        <BlockName name='tickets' />

        <p className='font-sf-pro-display text-xl font-extrabold text-white/60'>SALE</p>
      </div>

      {isLoading ? (
        <TicketCardSkeleton layout={layout} />
      ) : (
        <>
          <div
            className={cn('w-full', {
              'flex gap-7 overflow-x-scroll scrollbar-none':
                layout === 'with-flyer' || layout === 'standard-carousel',
              'grid sm:grid-cols-2 gap-x-5 gap-y-7': layout === 'default',
            })}>
            {tickets?.map((item) => (
              <TicketCard
                key={item.ticketName}
                name={item.ticketName}
                price={item.price}
                ticketId={item.ticketId}
                quantity={0}
                layout={layout}
                onQuantityChange={(newQuantity) => console.log(newQuantity)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function TicketCard({ name, price, quantity, onQuantityChange, layout, ticketId }: ITicketCard) {
  const createCartMutation = useCreateCart()
  const carts = useGetAllCart().data?.data

  console.log(carts)

  return (
    <div
      className={cn(
        'flex items-center justify-between h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display',
        {
          'min-w-[480px] last:mr-5': layout === 'with-flyer' || layout === 'standard-carousel',
          'w-full': layout === 'default',
        },
      )}>
      <div className='flex flex-col gap-1 font-sf-pro-display text-base font-normal'>
        <p>{name}</p>
        <p>{formatNaira(price)}</p>
      </div>

      <div className='flex items-center gap-2 px-3 rounded-full h-12 bg-light-green'>
        {quantity > 0 && (
          <>
            <TicketButton action={() => onQuantityChange(quantity - 1)} Icon={Minus} />

            <span className='font-sf-pro-rounded font-bold text-sm'>{quantity}</span>
          </>
        )}

        <TicketButton
          action={() => createCartMutation.mutate({ ticketId: ticketId, quantity: 1 })}
          Icon={Plus}
        />
      </div>
    </div>
  )
}

function TicketButton({ action, Icon }: ITicketButton) {
  return (
    <Button variant='ghost' className='p-1 w-fit h-fit hover:bg-black/10' onClick={action}>
      <Icon color='var(--foreground)' size={16} />
    </Button>
  )
}

function TicketCardSkeleton({ layout }: { layout: ITicketProps['layout'] }) {
  return (
    <Skeleton
      className={cn(
        'flex items-center justify-between h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display',
        {
          'min-w-[480px] last:mr-5': layout === 'with-flyer' || layout === 'standard-carousel',
          'w-full': layout === 'default',
        },
      )}
    />
  )
}

interface ITicketProps {
  layout: 'default' | 'standard-carousel' | 'with-flyer'
  eventId: string
}

interface ITicketButton {
  action: () => void
  Icon: LucideIcon
}

interface ITicketCard {
  name: string
  price: number
  quantity: number
  ticketId: string
  onQuantityChange: (quantity: number) => void
  layout: ITicketProps['layout']
}
